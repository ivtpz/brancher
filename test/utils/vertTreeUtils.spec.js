import { flatten, convertToImmutable, convertFromBinary, addIds, findPathByNodeId } from '../../app/utils/vertTreeUtils';
import { List, Map, fromJS } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable)


  const nestedTree = [
    {value: 'Root', 
    children: [
      {value: 'child1', children: []}, 
      {value: 'child2', 
      children: [
        {value: 'gchild1', 
        children: []},
        {value: 'gchild2',
        children: [
          {value: 'ggchild1', children: []}
        ]}
      ]}
    ]}
  ];
  class Node {
    constructor(value) {
      this.value = value;
      this.children = [];
    }
    add(value, path = []) {
      let parent = this;
      while (path.length) {
        parent = parent.children[path.shift()];
      }
      parent.children.push(new Node(value));
    } 
  }
  let classedTree = new Node('Root');
  classedTree.add('child1');
  classedTree.add('child2');
  classedTree.add('gchild1', [0]);
  classedTree.add('gchild2', [0]);
  classedTree.add('gchild3', [1]);
  classedTree.add('ggchild1', [0, 0]);
  classedTree.add('ggchild2', [1, 0]);
  const classedTreeArray = [classedTree];

  class BinaryNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
    add(value) {
      if (value < this.value) {
        if (this.left) {
          this.left.add(value);
        } else {
          this.left = new BinaryNode(value);
        }
      } else {
        if (this.right) {
          this.right.add(value)
        } else {
          this.right = new BinaryNode(value);
        }
      }
    }
  }
  const binaryTree = new BinaryNode(6);
  binaryTree.add(1)
  binaryTree.add(12)
  binaryTree.add(4)
  binaryTree.add(10)
  binaryTree.add(15)
  binaryTree.add(20)


describe('Vertical Tree Utilities', () => {

  describe('flatten Utility', () => {

    it('should flatten a tree with 1 child', () => {
      let flatTree= flatten(fromJS([{value: 'Root', children: [{value: 'child1', children: []}]}]))
      expect(flatTree.toJS()[0][0][0][0]).to.equal('Root')
      expect(flatTree.toJS()[1][0][0][0]).to.equal('child1')
    })

    it('should flatten a tree with multiple children', () => {
      let flatTree = flatten(fromJS([{value: 'Root', children: [{value: 'child1', children: []}, {value: 'child2', children: []}]}]));
      expect(flatTree.toJS()[1][0][1][0]).to.equal('child2')
    })

    it('should flatten a tree with multiple levels', () => {
      let flatTree = flatten(fromJS(nestedTree));
      expect(flatTree.toJS()[3][2][0][0]).to.equal('ggchild1')
    })

  })

  describe('Convert To Immutable Utility', () => {

    it('should return an immutable list from a single-level json tree', () => {
      expect(convertToImmutable([{value: 'Root', children: []}]))
      .to.equal(List([Map({value: 'Root', children: List([])})]))
    })

    it('should return an immutable list from a neseted json object in an array', () => {
      expect(convertToImmutable(nestedTree))
      .to.equal(List([
        Map({
          value: 'Root',
          children: List([
            Map({
              value: 'child1',
              children: List([])
            }),
            Map({
              value: 'child2',
              children: List([
                Map({
                  value: 'gchild1',
                  children: List([])
                }),
                Map({
                  value: 'gchild2',
                  children: List([
                    Map({
                      value: 'ggchild1',
                      children: List([])
                    })
                  ])
                })
              ])
            })
          ])
        })
      ]))
    })

    it('should create immutable list from tree made from a constructor', () => {
      expect(convertToImmutable(classedTreeArray))
      .to.equal(List([
        Map({
          value: 'Root',
          children: List([
            Map({
              value: 'child1',
              children: List([
                Map({
                  value: 'gchild1',
                  children: List([
                    Map({
                      value: 'ggchild1',
                      children: List([])
                    })
                  ])
                }),
                Map({
                  value: 'gchild2',
                  children: List([])
                })
              ])
            }),
            Map({
              value: 'child2',
              children: List([
                Map({
                  value: 'gchild3',
                  children: List([
                    Map({
                      value: 'ggchild2',
                      children: List([])
                    })
                  ])
                })
              ])
            })
          ])
        })
      ]))
    })

  })

  describe('Convert From Binary utility', function() {
    const convertedTree = convertFromBinary(binaryTree)
    it ('Should return an object', function() {
      expect(typeof convertedTree).to.equal('object')
    })
    it('Should have the same children as the binary tree', function() {
      expect(convertedTree.children[0].value).to.equal(1)
      expect(convertedTree.children[1].value).to.equal(12)
      expect(convertedTree.children[0].children[1].value).to.equal(4)
      expect(convertedTree.children[0].children[0].value).to.equal(undefined)
      expect(convertedTree.children[1].children[0].value).to.equal(10)
      expect(convertedTree.children[1].children[1].value).to.equal(15)
      expect(convertedTree.children[1].children[1].children[1].value).to.equal(20)
    })
  })

  describe('Add Ids Utility', function() {
    const idTree = addIds(classedTree);
    it('Should add a random ID property to each node', function() {
      expect(idTree).to.have.property('_id')
      expect(idTree._id).to.be.a.Number
      idTree.children.forEach(child => {
        expect(child).to.have.property('_id')
        expect(child.children[0]).to.have.property('_id')
      })
    })
    it('Should maintain the structure of the original tree', function() {
      let currOriginal = classedTree;
      let currIdCopy = idTree;
      while(currOriginal.children.length) {
        expect(currIdCopy.value).to.equal(currOriginal.value)
        expect(currIdCopy.children.length).to.equal(currOriginal.children.length)
        currOriginal = currOriginal.children[0];
        currIdCopy = currIdCopy.children[0];
      }
    })
  })

  describe('Find immutable path by node ID', function() {
    let idTree = addIds(classedTree);
    let immutableTree = convertToImmutable([idTree]);
    it('Should return the path for a top level node', function() {
      expect(findPathByNodeId(idTree._id, immutableTree)).to.eql([0])
    })
    it('Should return the path for a nested node', function() {
      expect(findPathByNodeId(idTree.children[0]._id, immutableTree)).to.eql([0, 'children', 0])
    })
    it('Should return the path for a deeply nested node', function() {
      let ggChildId = idTree.children[1].children[0].children[0]._id;
      expect(findPathByNodeId(ggChildId, immutableTree)).to.eql([0, 'children', 1, 'children', 0, 'children', 0])
    })
  })

})
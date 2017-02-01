import React, { Component } from 'react';
import { Link } from 'react-router';
import jsplumb from 'jsplumb';
import Tree from './Tree';
import Header from '../containers/Header';
import { flatten, augment, pause, highlight, mapConnections } from '../utils/vertTreeUtils';
import * as structures from '../utils/TreeStructures';
import * as styles from '../styles/Home.scss';

export default class ExampleTree extends Component {
  constructor(props) {
    super(props);
    this.jsplumb = null;
    this.augmentDataStructure();
  }

  componentDidMount() {
    this.jsplumb = jsplumb.getInstance();
    this.drawConnections();
    window.addEventListener('resize', (e) => {
      e.preventDefault();
      this.jsplumb.repaintEverything();
    });
  }

  componentDidUpdate() {
    this.jsplumb.detachEveryConnection();
    this.jsplumb.deleteEveryEndpoint();
    this.drawConnections();
  }

  componentWillUnmount() {
    this.jsplumb.reset();
  }

  augmentDataStructure() {
    const { treeData, callAsync, updateStructure, highlightNode } = this.props;
    const AVLTree = structures.AVLCreator(
      pause.bind(null, callAsync.bind(null, updateStructure)),
      highlight.bind(null, callAsync.bind(null, highlightNode))
    );
    this.augmentedState = augment(treeData.present.toJS()[0], AVLTree);
  }

  drawConnections() {
    const treeArray = flatten(this.props.treeData.present).toJS();
    const connections = mapConnections(treeArray);
    for (let parent in connections) {
      if (connections.hasOwnProperty(parent)) {
        connections[parent].forEach(child => {
          this.jsplumb.connect({
            source: parent,
            target: child,
            anchor: ['Perimeter', { shape: 'Circle', anchorCount: 180 }],
            endpoint: ['Dot', { radius: 1 }],
            connector: ['Straight'],
            paintStyle: { stroke: 'gray', strokeWidth: 2 }
          });
        });
      }
    }
  }

  execute(method, ...args) {
    this.augmentedState[method](...args);
  }

  render() {
    const { treeData, delay } = this.props;
    const treeArray = flatten(treeData.present).toJS();
    return (
      <div>
        <Header
          dataType='verticalTreeData'
          headerType='example'
          execute={this.execute.bind(this)}
        />
        <div className={styles.treeContainer}>
          {treeArray.map((treeLevel, index) => {
            return (
              <div key={index} className={styles.levelContainer}>
                {
                  treeLevel.map(
                    (section, ind) =>
                      <Tree
                        key={ind}
                        levelID={index}
                        sectionID={ind}
                        numSections={treeLevel.length}
                        value={section}
                        delay={delay}
                      />
                  )
                }
              </div>
            );
          })}
        </div>
        <Link to="/">Main Menu</Link>
      </div>
    );
  }
}
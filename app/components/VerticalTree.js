import React, { Component } from 'react';
import AceEditor from 'react-ace';
import jsplumb from 'jsplumb';
import brace from 'brace'; // eslint-disable-line no-unused-vars
import 'brace/mode/javascript';
import 'brace/theme/twilight';
import * as styles from './Home.scss';
import Tree from './Tree';
import PopOver from './PopOver';
import { flatten, pause, mapConnections, highlight, augment } from '../utils/vertTreeUtils';
import UndoRedoCreator from '../containers/UndoRedo';
import AnimationSpeedSelector from '../components/AnimationSpeedSelector';
import Help from '../components/Help';

const UndoRedo = UndoRedoCreator('verticalTreeData');

export default class VerticalTree extends Component {
  constructor(props) {
    super(props);
    this.code = this.props.userCode;
    this.connections = {};
  }

  componentDidMount() {
    this.drawConnections();
    this.props.setTutorialLength(21);
  }

  componentDidUpdate() {
    jsplumb.detachEveryConnection();
    jsplumb.deleteEveryEndpoint();
    this.drawConnections();
  }

  onChange(newVal) {
    this.code = newVal;
  }

  drawConnections() {
    const treeArray = flatten(this.props.treeData.present).toJS();
    this.connections = mapConnections(treeArray);
    for (let parent in this.connections) {
      if (this.connections.hasOwnProperty(parent)) {
        this.connections[parent].forEach(child => {
          jsplumb.connect({
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

  changeDelay(change) {
    const { delay, setDelay } = this.props;
    const newDelay = Math.max(0, delay + change);
    setDelay(newDelay);
  }


  runCode() {
    const {
      updateStructure,
      treeData,
      callAsync,
      endAsync,
      delay,
      updateCode,
      highlightNode,
      unHighlightNode
    } = this.props;
    const asyncUpdateStructure = callAsync.bind(
      null,
      updateStructure,
      delay,
      endAsync
    );
    const timedHighlight = callAsync.bind(
      null,
      highlightNode.bind(null, delay, unHighlightNode),
      delay,
      endAsync
    );
    const treeJSON = treeData.present.toJS()[0];
    const applyChangeToStore = pause.bind(this, asyncUpdateStructure);
    const applyHighlight = highlight.bind(this, timedHighlight);
    updateCode(this.code);
    const newTree = eval(`(${this.code})`)(
      treeJSON,
      applyChangeToStore,
      applyHighlight,
      augment
    );
    if (typeof newTree === 'object' && newTree.constructor.name === 'Node') {
      applyChangeToStore(newTree);
    }
  }

  popOverCreator(order, xPos, yPos, text) {
    const {
      viewNext,
      viewPrevious,
      tutorialActive,
      currentlyDisplayedTutorial,
      tutorialLength
    } = this.props;
    return (
      <PopOver
        next={viewNext}
        previous={viewPrevious}
        active={tutorialActive && currentlyDisplayedTutorial === order}
        total={tutorialLength}
        xPos={xPos}
        yPos={yPos}
        first={order === 1}
        last={order === tutorialLength}
      >
        <div>{text}</div>
      </PopOver>
    );
  }

  render() {
    const {
      treeData,
      userCode,
      delay,
      openTutorial,
      closeTutorial,
      tutorialActive
    } = this.props;
    const treeArray = flatten(treeData.present).toJS();
    return (
      <div>
        <div className={tutorialActive ? styles.backdrop : styles.hidden} onClick={closeTutorial} />
        <div className={styles.header}>
          <UndoRedo />
          <AnimationSpeedSelector changeDelay={this.changeDelay.bind(this)} />
          <div className={styles.leftButtons} >
            <button onClick={this.runCode.bind(this)}>Run</button>
            <Help activate={openTutorial} />
          </div>
        </div>
        <div className={styles.homeContainer}>
          <div className={styles.treeContainer}>
            {this.popOverCreator(1, '26%', '120px', 'You can view a visual representation of your tree here by clicking the "Run" button')}
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
          <div className={styles.editor}>
            {this.popOverCreator(2, '60%', '105px', 'The tree you see in the visualizer gets passed into this function as the argument "tree".')}
            {this.popOverCreator(3, '75%', '105px', 'You also have access to the functions "pause", "highlight", and "augment".')}
            {this.popOverCreator(4, '70%', '150px', 'You can define properties for your tree object by adding them to the "Node" class.')}
            {this.popOverCreator(5, '70%', '178px', 'The "Node" class must have a "value" property, and either a "children" or a "left" and a "right" property.')}
            {this.popOverCreator(6, '70%', '198px', 'Use "left" and "right" if you want to create a binary tree, and "children" if you want each node to have an arbitrary number of children.')}
            {this.popOverCreator(7, '70%', '165px', '"Children" must be an array, if you use "left" and "right", they should be Node objects or null.')}
            {this.popOverCreator(8, '72%', '395px', 'Once you have defined your "Node" class, use "augment" to extend the passed in tree object with the functionality of the "Node" class.')}
            {this.popOverCreator(9, '72%', '395px', 'The "augment" function takes in an object and a class, and returns a new object. Each node in the new object will be of the "Node" class.')}
            {this.popOverCreator(10, '72%', '395px', 'Now you can call the methods defined on "Node" on the passed in tree object.')}
            {this.popOverCreator(11, '72%', '280px', 'When traverse gets called, it passes each node to highlight in order.')}
            {this.popOverCreator(12, '72%', '280px', 'Highlight will cause whatever node it is passed to turn red temporarily.')}
            {this.popOverCreator(13, '72%', '280px', 'This allows you to see the order that a function traverses through your tree.')}
            {this.popOverCreator(14, '70%', '445px', 'The pause function takes in a tree, and puts it onto the visualizer temporarily.')}
            {this.popOverCreator(15, '70%', '445px', 'By calling pause and passing it "newTree" we can see the tree in-between adding nodes.')}
            {this.popOverCreator(16, '48%', '70px', 'You can control the speed of animation for highlighting and viewing tree states here.')}
            {this.popOverCreator(17, '48%', '70px', 'Warning: calling highlight on a large tree (30+ nodes) can run slowly.')}
            {this.popOverCreator(18, '10%', '80px', 'You can also move backwards and forwards through your visualizations here, up to 20 steps')}
            {this.popOverCreator(19, '68%', '515px', 'Finally, you should return a tree from this function. Whatever you return will end up in the visualizer.')}
            {this.popOverCreator(20, '68%', '300px', 'Edit the code to create your own tree...')}
            {this.popOverCreator(21, '83%', '70px', '...then click "Run" to see it in action.')}
            <AceEditor
              mode='javascript'
              theme='twilight'
              width='100%'
              fontSize={16}
              tabSize={2}
              wrapEnabled
              value={userCode}
              onChange={
                this.onChange.bind(this)
              }
              name='TREE_EDITOR'
              editorProps={{ $blockScrolling: true }}
              onLoad={
                editor => {
                  editor.focus();
                  this.editor = editor.getSession();
                  this.editor.setUseWrapMode(true);
                }
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

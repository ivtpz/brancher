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

const UndoRedo = UndoRedoCreator('verticalTreeData');

export default class VerticalTree extends Component {
  constructor(props) {
    super(props);
    this.code = this.props.userCode;
    this.connections = {};
  }

  componentDidMount() {
    this.drawConnections();
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

  render() {
    const { treeData, userCode, delay } = this.props;
    const treeArray = flatten(treeData.present).toJS();
    return (
      <div>
        <div className={styles.header}>
          <UndoRedo />
          <AnimationSpeedSelector changeDelay={this.changeDelay.bind(this)} />
          <button onClick={this.runCode.bind(this)}>Run</button>
        </div>
        <div className={styles.homeContainer}>
          <div className={styles.treeContainer}>
            <PopOver
              next={(i) => i}
              position={0}
              total={2}
              xPos={'30%'}
              yPos={'80px'}
              active
            >
              <div>You can view a visual representation of your tree here</div>
            </PopOver>
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

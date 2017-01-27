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
import tutorialWindows from '../tutorial/treeTutorial';

const UndoRedo = UndoRedoCreator('verticalTreeData');

export default class VerticalTree extends Component {
  constructor(props) {
    super(props);
    this.code = this.props.userCode;
  }

  componentDidMount() {
    this.drawConnections();
    this.props.setTutorialLength(tutorialWindows.length + 1);
    window.addEventListener('resize', (e) => {
      e.preventDefault();
      jsplumb.repaintEverything();
    });
  }

  componentDidUpdate() {
    jsplumb.detachEveryConnection();
    jsplumb.deleteEveryEndpoint();
    this.drawConnections();
  }

  onChange(newVal) {
    this.code = newVal;
  }

  getDelay() {
    let delay = this.props.delay;
    if (delay <= 100) {
      return 'Lightning';
    } else if (delay <= 300) {
      return 'Fast';
    } else if (delay <= 500) {
      return 'Normal';
    } else if (delay <= 700) {
      return 'Slow';
    } else if (delay <= 900) {
      return 'Turtle';
    } else {
      return 'Molasses';
    }
  }

  drawConnections() {
    const treeArray = flatten(this.props.treeData.present).toJS();
    const connections = mapConnections(treeArray);
    for (let parent in connections) {
      if (connections.hasOwnProperty(parent)) {
        connections[parent].forEach(child => {
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
    const speedText = this.getDelay();
    return (
      <div>
        <div className={tutorialActive ? styles.backdrop : styles.hidden} onClick={closeTutorial} />
        <div className={styles.header}>
          <UndoRedo />
          <div className={styles.animationSpeedContainer}>
            <AnimationSpeedSelector changeDelay={this.changeDelay.bind(this)} />
            <div className={styles[speedText.toLowerCase()]}>
              {speedText}
            </div>
          </div>
          <div className={styles.leftButtons} >
            <button
              className={styles.runButton}
              onClick={this.runCode.bind(this)}
            >
            Run
            </button>
            <Help activate={openTutorial} />
          </div>
        </div>
        <div className={styles.homeContainer}>
          {tutorialWindows.map(helpBox => {
            let { order, xPos, yPos, text } = helpBox;
            return this.popOverCreator(order, xPos, yPos, text);
          })}
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
          <div className={styles.editor}>
            <AceEditor
              mode='javascript'
              theme='twilight'
              width='100%'
              fontSize={16}
              tabSize={2}
              wrapEnabled
              value={userCode}
              onChange={this.onChange.bind(this)}
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

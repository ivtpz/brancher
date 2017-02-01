import React, { Component } from 'react';
import { Link } from 'react-router';
import AceEditor from 'react-ace';
import jsplumb from 'jsplumb';
import brace from 'brace'; // eslint-disable-line no-unused-vars
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow_night_eighties';
import 'brace/theme/tomorrow_night_blue';
import 'brace/theme/kuroir';
import 'brace/theme/katzenmilch';
import 'brace/theme/chrome';
import * as styles from '../styles/Home.scss';
import Tree from './Tree';
import PopOver from '../containers/PopOver';
import { flatten, pause, mapConnections, highlight, augment } from '../utils/vertTreeUtils';
import tutorialWindows from '../tutorial/treeTutorial';
import Header from '../containers/Header';

export default class VerticalTree extends Component {
  constructor(props) {
    super(props);
    this.jsplumb = null;
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

  onChange(newVal) {
    this.props.updateCode(newVal);
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

  runCode() {
    const {
      updateStructure,
      treeData,
      callAsync,
      highlightNode,
      userCode
    } = this.props;
    const asyncUpdateStructure = callAsync.bind(null, updateStructure);
    const timedHighlight = callAsync.bind(null, highlightNode);
    const treeJSON = treeData.present.toJS()[0];
    const applyChangeToStore = pause.bind(this, asyncUpdateStructure);
    const applyHighlight = highlight.bind(this, timedHighlight);
    const newTree = eval(`(${userCode})`)(
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
    const {
      treeData,
      userCode,
      delay,
      theme,
      swapCode,
      isBinaryTree
    } = this.props;
    const treeArray = flatten(treeData.present).toJS();
    return (
      <div>
        <Header
          dataType='verticalTreeData'
          runCode={this.runCode.bind(this)}
          headerType='code'
        />
        <div className={styles.homeContainer}>
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
              theme={theme}
              width='100%'
              height='100%'
              fontSize={16}
              tabSize={2}
              wrapEnabled
              value={userCode}
              onChange={this.onChange.bind(this)}
              name='TREE_EDITOR'
              editorProps={{ $blockScrolling: true }}
              enableBasicAutocompletion
              enableLiveAutocompletion
              onLoad={
                editor => {
                  editor.focus();
                  const session = editor.getSession();
                  session.setUseWrapMode(true);
                }
              }
            />
            <Link to="/">Main Menu</Link>
            <button
              className={styles.helpButton}
              onClick={swapCode}
            >
              {isBinaryTree ? 'Switch to Tree' : 'Switch to Binary'}
            </button>
          </div>
          {tutorialWindows.map(helpBox => {
            let { order, xPos, yPos, text } = helpBox;
            return (
              <PopOver
                key={order}
                order={order}
                text={text}
                xPos={xPos}
                yPos={yPos}
                totalLength={tutorialWindows.length}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

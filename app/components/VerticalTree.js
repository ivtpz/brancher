import React, { Component } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace'; // eslint-disable-line no-unused-vars
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow_night_eighties';
import 'brace/theme/tomorrow_night_blue';
import 'brace/theme/kuroir';
import 'brace/theme/katzenmilch';
import 'brace/theme/chrome';
import * as styles from './Home.scss';
import PopOver from '../containers/PopOver';
import Visualizer from './Visualizer';
import { flatten, pause, highlight, augment } from '../utils/vertTreeUtils';
import tutorialWindows from '../tutorial/treeTutorial';
import Header from '../containers/Header';

export default class VerticalTree extends Component {

  onChange(newVal) {
    this.props.updateCode(newVal);
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
      resetTree,
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
          <Visualizer
            treeArray={treeArray}
            delay={delay}
          />
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
            <button
              className={styles.helpButton}
              onClick={() => {
                resetTree();
                swapCode();
              }}
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

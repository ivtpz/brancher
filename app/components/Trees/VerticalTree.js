import React, { Component } from 'react';
import * as styles from '../Home.scss';
import CodeEditor from '../CodeEditor';
import PopOver from '../../containers/PopOver';
import Visualizer from './Visualizer';
import { flatten, pause, highlight } from '../../utils/vertTreeUtils';
import tutorialWindows from '../../tutorial/treeTutorial';
import Header from '../../containers/Header';

const MyWorker = require('../../workers/userCode.worker.js'); // eslint-disable-line

export default class VerticalTree extends Component {

  componentWillMount() {
    const {
      updateStructure,
      callAsync,
      highlightNode,
      setUserError
    } = this.props;

    const asyncUpdateStructure = callAsync.bind(null, updateStructure);
    const timedHighlight = callAsync.bind(null, highlightNode);
    const applyChangeToStore = pause.bind(this, asyncUpdateStructure);
    const applyHighlight = highlight.bind(this, timedHighlight);

    this.worker = new MyWorker();

    this.worker.onmessage = (m) => {
      const { message } = m.data;
      switch (m.data.type) {
        case 'pause':
          applyChangeToStore(message);
          break;
        case 'highlight':
          applyHighlight(message);
          break;
        case 'error':
          setUserError({
            row: message.errorRow,
            column: message.errorCol,
            text: message.text,
            type: 'error'
          });
          break;
        case 'worker_error':
          console.log(message);
          break;
        default:
          console.log(`unrecognized web worker message: ${message}`);
      }
    };
  }

  componentWillUnmount() {
    this.worker.terminate();
  }

  onChange = newVal => this.props.updateCode(newVal);

  runCode = () => {
    this.worker.postMessage(this.props.userCode);
  };

  render() {
    const {
      treeData,
      userCode,
      delay,
      theme,
      swapCode,
      resetTree,
      isBinaryTree,
      aceErrors
    } = this.props;
    const treeArray = flatten(treeData.present).toJS();
    return (
      <div>
        <Header
          dataType='verticalTreeData'
          runCode={this.runCode}
          headerType='code'
        />
        <div className={styles.homeContainer}>
          <Visualizer
            treeArray={treeArray}
            delay={delay}
          />
          <div className={styles.editor}>
            <CodeEditor
              changeFn={this.onChange}
              theme={theme}
              userCode={userCode}
              annotations={aceErrors}
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

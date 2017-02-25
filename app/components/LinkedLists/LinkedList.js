import React, { Component } from 'react';
import * as styles from './List.scss';
import Header from '../../containers/Header';
import LinkedListVisualizer from './LinkedListVisualizer';
import CodeEditor from '../CodeEditor';
import { pause, highlight } from '../../utils/linkedListUtils';

const MyWorker = require('../../workers/userCode.worker.js'); // eslint-disable-line

export default class LinkedList extends Component {

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

  onChange = (value) => this.props.updateLinkedListCode(value)

  runCode = () => {
    this.worker.postMessage(this.props.userCode);
  };

  render() {
    const {
      theme,
      linkedListList,
      userCode,
      delay,
      width,
      height,
      updateWidth,
      updateHeight,
      aceErrors
    } = this.props;
    return (
      <div>
        <Header
          dataType='linkedListData'
          runCode={this.runCode}
          headerType='code'
        />
        <div className={styles.homeContainer}>
          <LinkedListVisualizer
            linkedListList={linkedListList.present}
            delay={delay}
            windowWidth={width}
            windowHeight={height}
            updateHeight={updateHeight}
            updateWidth={updateWidth}
          />
          <div className={styles.editor}>
            <CodeEditor
              changeFn={this.onChange}
              theme={theme}
              userCode={userCode}
              annotations={aceErrors}
            />
          </div>
        </div>
      </div>
    );
  }
}

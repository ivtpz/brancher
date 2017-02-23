import React, { Component } from 'react';
import * as styles from './Home.scss';
import Header from '../containers/Header';
import LinkedListVisualizer from './LinkedListVisualizer';
import CodeEditor from './CodeEditor';
import { pause, highlight } from '../utils/linkedListUtils';

export default class LinkedList extends Component {

  onChange = value => this.props.updateCode(value)

  runCode = () => {
    const {
      updateStructure,
      callAsync,
      highlightNode,
      userCode
    } = this.props;
    const asyncUpdateStructure = callAsync.bind(null, updateStructure);
    const timedHighlight = callAsync.bind(null, highlightNode);
    const applyChangeToStore = pause.bind(this, asyncUpdateStructure);
    const applyHighlight = highlight.bind(this, timedHighlight);
    const newList = eval(`(${userCode})`)(
      applyChangeToStore,
      applyHighlight
    );
    if (typeof newList === 'object' && (newList.constructor.name === 'List' || newList.constructor.name === 'Node')) {
      applyChangeToStore(newList);
    }
  };

  render() {
    const {
      theme,
      linkedListList,
      userCode,
      delay
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
          />
          <div className={styles.editor}>
            <CodeEditor
              changeFn={this.onChange}
              theme={theme}
              userCode={userCode}
            />
          </div>
        </div>
      </div>
    );
  }
}

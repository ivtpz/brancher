import React, { Component } from 'react';
import Header from '../../containers/Header';
import Visualizer from './Visualizer';
import { flatten, augment, pause, highlight } from '../../utils/vertTreeUtils';
import * as structures from '../../utils/TreeStructures';

export default class ExampleTree extends Component {
  constructor(props) {
    super(props);
    this.augmentDataStructure();
  }

  augmentDataStructure() {
    const { treeData, dataStructure, callAsync, updateStructure, highlightNode } = this.props;
    const exampleTree = structures[dataStructure](
      pause.bind(null, callAsync.bind(null, updateStructure)),
      highlight.bind(null, callAsync.bind(null, highlightNode))
    );
    this.augmentedState = augment(treeData.present.toJS()[0], exampleTree);
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
        <Visualizer
          treeArray={treeArray}
          delay={delay}
        />
      </div>
    );
  }
}

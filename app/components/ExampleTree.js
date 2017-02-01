import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from '../containers/Header';
import Visualizer from './Visualizer';
import { flatten, augment, pause, highlight, mapConnections } from '../utils/vertTreeUtils';
import * as structures from '../utils/TreeStructures';
import * as styles from '../styles/Home.scss';

export default class ExampleTree extends Component {
  constructor(props) {
    super(props);
    this.augmentDataStructure();
  }

  augmentDataStructure() {
    const { treeData, callAsync, updateStructure, highlightNode } = this.props;
    const AVLTree = structures.AVLCreator(
      pause.bind(null, callAsync.bind(null, updateStructure)),
      highlight.bind(null, callAsync.bind(null, highlightNode))
    );
    this.augmentedState = augment(treeData.present.toJS()[0], AVLTree);
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
        <Link to="/">Main Menu</Link>
      </div>
    );
  }
}
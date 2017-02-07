/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import jsplumb from 'jsplumb';
import Tree from './Tree';
import { mapConnections } from '../utils/vertTreeUtils';
import * as styles from './Home.scss';

export default class Visualizer extends Component {
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

  drawConnections() {
    const { treeArray } = this.props;
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

  render() {
    const { treeArray, delay } = this.props;
    return (
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
    );
  }

}
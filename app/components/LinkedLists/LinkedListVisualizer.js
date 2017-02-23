/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import jsplumb from 'jsplumb';
import * as styles from './List.scss';

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
    const { linkedListList } = this.props;
    let prevId;
    let connections = {};
    let jsList = linkedListList.toJS();
    if (jsList && jsList.length) {
      connections = jsList.reduce((links, node, i) => {
        if (node !== undefined && node !== null) {
          let id = `${i}${node.value}`;
          links[id] = []; // eslint-disable-line no-param-reassign
          if (prevId) {
            links[prevId].push(id);
          }
          prevId = id;
        }
        return links;
      }, {});
    }
    for (let parent in connections) {
      if (connections.hasOwnProperty(parent)) {
        connections[parent].forEach(child => {
          this.jsplumb.connect({
            source: parent,
            target: child,
            anchor: [[0, 0.9, -1, 0], [1, 0.9, 0, 0], [1, 0, 1, 0]],
            endpoint: ['Dot', { radius: 1 }],
            overlays: [
              ['Arrow', { location: 1, width: 10, length: 10, id: 'arrow' }]
            ],
            connector: ['StateMachine', { curviness: -10 }],
            paintStyle: { stroke: 'gray', strokeWidth: 2 }
          });
        });
      }
    }
  }

  render() {
    const { linkedListList } = this.props;
    return (
      <div className={styles.listContainer}>
        {linkedListList && linkedListList.map((node, i) =>
          <div
            key={`${i}${node.get('value')}`}
            id={`${i}${node.get('value')}`}
            className={node.get('highlighted') ? styles.highlightedListNode : styles.listNode}
          >
            {node.get('value')}
          </div>
          )}
      </div>
    );
  }

}

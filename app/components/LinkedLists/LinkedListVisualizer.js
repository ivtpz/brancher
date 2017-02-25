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
    window.addEventListener('resize', this.respondToResize);

  }

  componentDidUpdate() {
    this.jsplumb.detachEveryConnection();
    this.jsplumb.deleteEveryEndpoint();
    this.drawConnections();
  }

  componentWillUnmount() {
    this.jsplumb.reset();
    window.removeEventListener('resize', this.respondToResize)
  }

  respondToResize = (e) => {
    this.props.updateWidth(window.innerWidth);
    this.props.updateHeight(window.innerHeight);
    e.preventDefault();
    this.jsplumb.repaintEverything();
  };

  drawConnections = () => {
    const { linkedListList } = this.props;
    let prevId;
    let connections = {};
    let jsList = linkedListList.toJS();
    if (jsList && jsList.length) {
      connections = jsList.reduce((links, node, i) => {
        if (node !== undefined && node !== null) {
          let id = `${i}${node.value}`;
          links[id + 'next'] = []; // eslint-disable-line no-param-reassign
          if (prevId) {
            links[prevId].push(id);
          }
          prevId = id + 'next';
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
            anchors: ['Center', [[0.5, 0, 0, 0], [0.5, 1, 0, 0]]],
            endpoint: ['Dot', { radius: 2 }],
            overlays: [
              ['Arrow', { location: 0.99, width: 12, length: 12, id: 'arrow' }]
            ],
            connector: ['StateMachine', { curviness: -15, proximityLimit: 40 }],
            paintStyle: { stroke: 'gray', strokeWidth: 2 }
          });
        });
      }
    }
  };

  render() {
    const { linkedListList, windowWidth, windowHeight } = this.props;
    return (
      <div className={styles.listContainer}>
        {linkedListList && linkedListList.map((node, i) =>
          <div
            style={{
              paddingLeft: `${(i % Math.floor(windowHeight / 105))*10}px`
            }}
            className={styles.nodeContainer}
            key={`${i}${node.get('value')}`}
          >
            <div
              id={`${i}${node.get('value')}`}
              className={node.get('highlighted') ? styles.highlightedListNode : styles.listNode}
            >
              {node.get('value')}
            </div>
            <div
              id={`${i}${node.get('value')}next`}
              className={node.get('highlighted') ? styles.highlightedNextNode : styles.nextNode}
            />
          </div>
          )}
      </div>
    );
  }

}

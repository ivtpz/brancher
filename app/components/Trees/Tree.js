import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import * as styles from '../Home.scss';
import Node from './Node';

class Tree extends Component {

  render() {
    const { value, levelID, numSections, sectionID, delay } = this.props;
    return (
      <div className={styles.childrenContainer} style={{ width: `${100 / numSections}%` }}>
        {value.map((node, index) => {
          return (
            <TransitionGroup key={node ? node._id : index}>
              <Node
                key={node ? node._id : index}
                id={`${levelID}-${sectionID}-${index}`}
                styleClass={node ?
                  (node[1] ? styles.highlightedNode : styles.vertNode)
                  : styles.empty}
                node={node}
                delay={delay}
              />
            </TransitionGroup>
          );
        })}
      </div>
    );
  }
}

export default Tree;

import React from 'react';
import * as styles from './Home.scss';

const Tree = ({ value, levelID, numSections, sectionID }) => {
  return (
    <div className={styles.childrenContainer} style={{ width: `${100 / numSections}%` }}>
      {value.map((node, index) => {
        return (
          <div
            key={index}
            id={`${levelID}-${sectionID}-${index}`}
            className={node ? (node[1] ? styles.highlightedNode : styles.vertNode) : styles.empty}
          >
            {node}
          </div>
        );
      })}
    </div>
  );
};

export default Tree;

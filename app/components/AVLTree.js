import React, { Component } from 'react';
import { Link } from 'react-router';
import Tree from './Tree';
import Header from '../containers/Header';
import { flatten } from '../utils/vertTreeUtils';
import * as styles from '../styles/Home.scss';

export default class AVLTree extends Component {

  render() {
    const { treeData, delay } = this.props;
    const treeArray = flatten(treeData.present).toJS();
    return (
      <div>
        <Header
          dataType='verticalTreeData'
          headerType='example'
        />
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
        <Link to="/">Main Menu</Link>
      </div>
    );
  }
}
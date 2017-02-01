import React, { Component } from 'react';
import { Link } from 'react-router';
import * as styles from '../styles/Menu.scss';

export default class Menu extends Component {
  render() {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.menuContainer}>
          <div className={styles.menuCircle}>
            <div className={styles.title}>Brancher</div>
             <Link to='/usertree'><div className={styles.menuLink}>Write Code</div></Link>
             <Link to='/treeExamples'><div className={styles.menuLink}>See Examples</div></Link>
          </div>
        </div>
      </div>
    );
  }
}
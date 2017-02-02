import React, { Component } from 'react';
import { Link } from 'react-router';
import * as styles from '../styles/Menu.scss';

export default class ExampleStructureOptions extends Component {
  render() {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.menuContainer}>
          <div className={styles.optionsCircle}>
            <Link to='/AVLTree'><div className={styles.menuLink}>AVL Tree</div></Link>
            <Link to='/'><div className={styles.menuLink}>Main Menu</div></Link>
          </div>
        </div>
      </div>
    );
  }
}
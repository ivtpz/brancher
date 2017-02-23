import React from 'react';
import { Link } from 'react-router';
import * as styles from './Menu.scss';

export default () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.menuCircle}>
          <div className={styles.title}>Brancher</div>
          <Link to='/codeOptions'><div className={styles.menuLink}>Write Code</div></Link>
          <Link to='/treeExamples'><div className={styles.menuLink}>See Examples</div></Link>
        </div>
      </div>
    </div>
  );
};

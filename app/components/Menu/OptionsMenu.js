import React from 'react';
import { Link } from 'react-router';
import * as styles from './Menu.scss';

export default ({ links }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.optionsCircle}>
          {links.map(link => (
            <Link to={link.path}><div className={styles.menuLink}>{link.text}</div></Link>
          ))}
          <Link to='/'><div className={styles.menuLink}>Main Menu</div></Link>
        </div>
      </div>
    </div>
  );
};

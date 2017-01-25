import React from 'react';
import * as styles from './PopOver.scss';

const PopOver = ({ next, active, order, xPos, yPos, children }) => {
  if (!active) {
    return null;
  }
  return (
    <div className={styles.modal} style={{ top: yPos, left: xPos }}>
      {children}
      <div className={styles.footer}>
        <button onClick={next.bind(null, order + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PopOver;
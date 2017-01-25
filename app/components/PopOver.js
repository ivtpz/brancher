import React from 'react';
import * as styles from './PopOver.scss';

const PopOver = ({ next, active, first, last, previous, xPos, yPos, children }) => {
  if (!active) {
    return null;
  }
  const text = last ? 'End' : 'Next';
  return (
    <div className={styles.modal} style={{ top: yPos, left: xPos }}>
      {children}
      <div className={styles.footer}>
        {first ?
          <div /> :
          <button onClick={previous}>Prev</button>
        }
        <button onClick={next}>{text}</button>
      </div>
    </div>
  );
};

export default PopOver;
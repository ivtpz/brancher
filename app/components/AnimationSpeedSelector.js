import React from 'react';
import * as styles from '../styles/Home.scss';

const delayToText = (delay) => {
  if (delay <= 100) {
    return 'Lightning';
  } else if (delay <= 300) {
    return 'Fast';
  } else if (delay <= 500) {
    return 'Normal';
  } else if (delay <= 700) {
    return 'Slow';
  } else if (delay <= 900) {
    return 'Turtle';
  } else {
    return 'Molasses';
  }
};

const AnimationSpeedSelector = ({ changeDelay, delay }) => {
  return (
    <div className={styles.animationSpeedContainer}>
      <div>
        <span className={styles.button_info}>Animation Speed</span>
        <button onClick={changeDelay.bind(this, -100)}>+</button>
        <button onClick={changeDelay.bind(this, 100)}>-</button>
      </div>
      <div className={styles[delayToText(delay).toLowerCase()]}>
        {delayToText(delay)}
      </div>
    </div>
  );
};

export default AnimationSpeedSelector;

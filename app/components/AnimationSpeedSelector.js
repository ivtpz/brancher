import React from 'react';
import * as styles from './Home.scss';

const AnimationSpeedSelector = ({ changeDelay }) => {
  return (
    <div>
      <span className={styles.button_info}>Animation Speed</span>
      <button onClick={changeDelay.bind(this, -100)}>+</button>
      <button onClick={changeDelay.bind(this, 100)}>-</button>
    </div>
  );
};

export default AnimationSpeedSelector;

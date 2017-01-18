import React from 'react';

const AnimationSpeedSelector = ({ changeDelay }) => {
  return (
    <div>
      Animation Speed
      <button onClick={changeDelay.bind(this, -100)}>+</button>
      <button onClick={changeDelay.bind(this, 100)}>-</button>
    </div>
  );
};

export default AnimationSpeedSelector;

import React from 'react';
import * as styles from './PopOver.scss';

const PopOver = ({
  order,
  text,
  xPos,
  yPos,
  totalLength,
  tutorialActive,
  currentlyDisplayedTutorial,
  viewNext,
  viewPrevious,
  closeTutorial
}) => {
  const first = order === 1;
  const last = order === totalLength;
  const active = tutorialActive && currentlyDisplayedTutorial === order;
  const buttonText = last ? 'End' : 'Next';
  const nextAction = last ? closeTutorial : viewNext;
  if (!active) {
    return null;
  }
  return (
    <div className={styles.modal} style={{ top: yPos, left: xPos }}>
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.footer}>
        {first ? (<div />) : (<button onClick={viewPrevious}>Prev</button>)}
        <button onClick={nextAction}>{buttonText}</button>
      </div>
    </div>
  );
};

export default PopOver;
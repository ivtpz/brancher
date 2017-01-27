import React from 'react';
import * as styles from './Home.scss';

const Help = ({ activate }) => {
  return (
    <button className={styles.helpButton} onClick={activate}>Help</button>
  );
};

export default Help;
import React, { Component } from 'react';
import AnimationSpeedSelector from './AnimationSpeedSelector';
import UndoRedoCreator from '../containers/UndoRedo';
import * as styles from './Home.scss';

export default class Header extends Component {

  componentDidMount() {
    const highlightInterval = setInterval(() => {
      this.props.toggleHelpHighlight();
    }, 500);
    setTimeout(() => clearInterval(highlightInterval), 3000);
  }

  changeDelay(change) {
    const { delay, setDelay } = this.props;
    const newDelay = Math.max(0, delay + change);
    setDelay(newDelay);
  }

  render() {
    const {
      dataType,
      runCode,
      delay,
      openTutorial,
      highlightHelp,
      tutorialActive,
      closeTutorial
    } = this.props;
    const UndoRedo = UndoRedoCreator(dataType);
    const backdropClass = tutorialActive ? styles.backdrop : styles.hidden;
    const helpClass = highlightHelp ? styles.highlighted : styles.helpButton;
    return (
      <div className={styles.header}>
        <div className={backdropClass} onClick={closeTutorial} />
        <UndoRedo />
        <AnimationSpeedSelector delay={delay} changeDelay={this.changeDelay.bind(this)} />
        <div className={styles.leftButtons} >
          <button className={styles.runButton} onClick={runCode}>Run</button>
          <button className={helpClass} onClick={openTutorial}>Help</button>
        </div>
      </div>
    );
  }
}
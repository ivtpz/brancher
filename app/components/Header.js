import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimationSpeedSelector from './AnimationSpeedSelector';
import UndoRedoCreator from '../containers/UndoRedo';
import UserAction from './UserAction';
import * as styles from './Home.scss';
var Logo = require('../assets/48x48.png');

export default class Header extends Component {

  componentDidMount() {
    if (this.props.headerType === 'code') {
      const highlightInterval = setInterval(() => {
        this.props.toggleHelpHighlight();
      }, 500);
      setTimeout(() => clearInterval(highlightInterval), 3000);
    }
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
      delayed,
      openTutorial,
      highlightHelp,
      tutorialActive,
      closeTutorial,
      darkenTheme,
      lightenTheme,
      themeIndex,
      themeOptions,
      headerType,
      execute
    } = this.props;
    const UndoRedo = UndoRedoCreator(dataType);
    const backdropClass = tutorialActive ? styles.backdrop : styles.hidden;
    const helpClass = highlightHelp ? styles.highlighted : styles.helpButton;
    return (
      <div className={styles.header}>
        <div className={backdropClass} onClick={closeTutorial} />
        <div className={styles.rightButtons}>
          <Link to='/'><img src={Logo} /></Link>
          <UndoRedo />
        </div>
        <AnimationSpeedSelector delay={delay} changeDelay={this.changeDelay.bind(this)} />
        {headerType === 'code' ?
          (<div>
            <span className={styles.button_info}>Editor Theme</span>
            <button
              className={styles.darkerButton}
              onClick={darkenTheme}
              disabled={!themeIndex}
            >Darker</button>
            <button
              className={styles.lighterButton}
              onClick={lightenTheme}
              disabled={themeIndex >= themeOptions - 1}
            >Lighter</button>
          </div>) : <UserAction buttonAction={execute} asyncActive={delayed} />
        }
        {headerType === 'code' ?
          <div className={styles.rightButtons} >
            <button className={styles.runButton} disabled={delayed} onClick={runCode}>Run</button>
            <button className={helpClass} onClick={openTutorial}>Help</button>
          </div> : null
        }
      </div>
    );
  }
}
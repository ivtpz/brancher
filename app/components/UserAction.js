import React, { Component } from 'react';
import * as styles from '../styles/Home.scss';

export default class UserAction extends Component {
  render() {
    return (
      <div className={styles.userInput}>
        <input /><button>Add</button>
        <input /><button>Remove</button>
        <input /><button>Find</button>
      </div>
    );
  }
}
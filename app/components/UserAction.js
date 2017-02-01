import React, { Component } from 'react';
import * as styles from '../styles/Home.scss';

export default class UserAction extends Component {

  handleAdd() {
    this.props.buttonAction('add', parseInt(this.addInput.value, 10));
  }

  handleRemove() {
    this.props.buttonAction('remove', parseInt(this.removeInput.value, 10));
  }

  render() {
    return (
      <div className={styles.userInput}>
        <input
          ref={(input) => {
            this.addInput = input;
          }}
        />
        <button onClick={this.handleAdd.bind(this)}>Add</button>
        <input
          ref={(input) => {
            this.removeInput = input;
          }}
        />
        <button onClick={this.handleRemove.bind(this)}>Remove</button>
        <input /><button>Find</button>
      </div>
    );
  }
}
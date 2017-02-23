import React, { Component } from 'react';
import * as styles from './Header.scss';

export default class UserAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: '',
      remove: '',
      find: ''
    };
    this.components = {};
  }

  handleSubmit(prop) {
    this.props.buttonAction(prop, parseInt(this.state[prop], 10));
    let newState = this.state;
    newState[prop] = '';
    this.setState(newState);
    this.components[prop].focus();
  }

  updateField(prop, e) {
    let newState = this.state;
    newState[prop] = e.target.value;
    this.setState(newState);
  }

  render() {
    const { asyncActive } = this.props;
    return (
      <div className={styles.userInput}>
        <input
          onChange={this.updateField.bind(this, 'add')}
          value={this.state.add}
          ref={(c) => { this.components.add = c; }}
        />
        <button
          disabled={asyncActive}
          onClick={this.handleSubmit.bind(this, 'add')}
        >Add</button>
        <input
          onChange={this.updateField.bind(this, 'remove')}
          value={this.state.remove}
          ref={(c) => { this.components.remove = c; }}
        />
        <button
          disabled={asyncActive}
          onClick={this.handleSubmit.bind(this, 'remove')}
        >Remove</button>
        <input
          onChange={this.updateField.bind(this, 'find')}
          value={this.state.find}
          ref={(c) => { this.components.find = c; }}
        />
        <button
          disabled={asyncActive}
          onClick={this.handleSubmit.bind(this, 'find')}
        >Find</button>
      </div>
    );
  }
}

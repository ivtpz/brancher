import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { TweenMax } from 'gsap';

class Node extends Component {
  componentWillAppear(callback) {
    const el = findDOMNode(this);
    let delay = this.props.delay / 1000 / 1.2;
    TweenMax.fromTo(el, delay, { y: -20, opacity: 0 }, { y: 0, opacity: 1, onComplete: callback });
  }


  render() {
    const { id, styleClass, node } = this.props;
    return (
      <div id={id} className={styleClass}>
        {node}
      </div>
    );
  }
}

export default Node;
import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import Radium, { StyleRoot } from 'radium';
import ItemTypes from './ItemTypes';
import styles from '../styles';

const choiceTarget = {
  drop() {
    return { name: 'Selector' };
  }
};

class Selector extends Component {
  constructor() {
    super();

    this.state = {
      intervalID: 0,
      animation: {}
    };
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      intervalID: setInterval(this.triggerAnimation, 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  clearAnimation = () => this.setState({ ...this.state, animation: {} });

  setAnimation = () =>
    this.setState({ ...this.state, animation: styles.animations.pulse });

  triggerAnimation = () => {
    this.clearAnimation();
    setTimeout(() => this.setAnimation(), 1000);
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div
        style={{
          ...styles.selector,
          ...styles.text,
          backgroundColor
        }}
      >
        <StyleRoot>
          <div style={{ ...this.state.animation }}>
            {isActive ? 'Release to drop' : 'Drag a choice here'}
          </div>
        </StyleRoot>
      </div>
    );
  }
}

export default _.flow(
  DropTarget(ItemTypes.CHOICE, choiceTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(Radium(Selector));

import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import Radium from 'radium';
import ItemTypes from './ItemTypes';
import jazzHand from '../images/jazz-hand.png';
import clenchedFist from '../images/clenched-fist.png';
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
      intervalID: setInterval(this.triggerAnimation, 250)
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
    setTimeout(this.setAnimation, 250);
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;

    const isActive = canDrop && isOver;
    const animation = canDrop ? this.state.animation : {};

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
          ...animation,
          backgroundColor
        }}
      >
        <div>
          {isActive ? 'Release to drop' : 'Drag a choice here'}
          <img
            src={isActive ? jazzHand : clenchedFist}
            style={styles.selector.gestures}
          />
        </div>
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

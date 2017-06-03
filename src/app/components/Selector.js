import React from 'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import ItemTypes from './ItemTypes';
import styles from '../styles';

const choiceTarget = {
  drop() {
    return { name: 'Selector' };
  }
};

const Selector = ({ canDrop, isOver, connectDropTarget }) => {
  const isActive = canDrop && isOver;

  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return connectDropTarget(
    <div style={{ ...styles.selector, ...styles.text, backgroundColor }}>
      {isActive ? 'Release to drop' : 'Drag a choice here'}
    </div>
  );
};

export default _.flow(
  DropTarget(ItemTypes.CHOICE, choiceTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(Selector);

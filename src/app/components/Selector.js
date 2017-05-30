import React from 'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import ItemTypes from './ItemTypes';

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  borderRadius: '1rem'
};

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
    <div style={{ ...style, backgroundColor }}>
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

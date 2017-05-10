import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import _ from 'lodash';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      window.alert(`You dropped ${item.name} into ${dropResult.name}!`);
    }
  }
};

const Box = ({ name, isDragging, connectDragSource }) =>
  connectDragSource(
    <div style={{ ...style, opacity: isDragging ? 0.4 : 1 }}>
      {name}
    </div>
  );

export default _.flow(
  DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Box);

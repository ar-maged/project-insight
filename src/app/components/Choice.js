import React from 'react';
import { DragSource } from 'react-dnd';
import _ from 'lodash';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import ItemTypes from './ItemTypes';

const style = {
  width: '10rem',
  marginRight: '1.5rem',
  marginLeft: '1.5rem',
  cursor: 'move'
};

const titleStyle = {
  fontFamily: 'Special Elite'
};

const choiceSource = {
  beginDrag(props) {
    return {
      title: props.title
    };
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    const { index, selectChoice } = props;

    if (dropResult) {
      selectChoice({ choiceIndex: index });
    }
  }
};

const Choice = ({ title, color, votes, isDragging, connectDragSource }) =>
  connectDragSource(
    <div>
      <Card style={{ ...style, opacity: isDragging ? 0.4 : 1 }}>
        <CardMedia
          overlay={<CardTitle title={votes} titleStyle={titleStyle} />}
        >
          <img src={color} role="presentation" />
        </CardMedia>
        <CardTitle title={title} titleStyle={titleStyle} />
      </Card>
    </div>
  );

export default _.flow(
  DragSource(ItemTypes.CHOICE, choiceSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Choice);

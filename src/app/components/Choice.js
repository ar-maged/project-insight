import React from 'react';
import { DragSource } from 'react-dnd';
import _ from 'lodash';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import ItemTypes from './ItemTypes';
import styles from '../styles';

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
      <Card style={{ ...styles.choice, opacity: isDragging ? 0.4 : 1 }}>
        <CardMedia
          overlay={<CardTitle title={votes} titleStyle={styles.text} />}
        >
          <img src={color} role="presentation" />
        </CardMedia>
        <CardTitle title={title} titleStyle={styles.text} />
      </Card>
    </div>
  );

export default _.flow(
  DragSource(ItemTypes.CHOICE, choiceSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Choice);

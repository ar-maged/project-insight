import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import _ from 'lodash';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import Radium from 'radium';
import { MouseHoveringDetection } from 'react-detect-mouse-over';
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
    const { index, selectChoice, clearAnimated, setAnimated } = props;

    if (dropResult) {
      selectChoice({ choiceIndex: index });
      setAnimated();
      setTimeout(clearAnimated, 1000);
    }
  }
};

class Choice extends Component {
  componentWillReceiveProps(nextProps) {
    const { isHoveringOver } = nextProps;
  }

  render() {
    const {
      title,
      color,
      votes,
      animated,
      isDragging,
      connectDragSource
    } = this.props;

    const animation = animated ? styles.animations.bounceIn : {};

    return connectDragSource(
      <div style={animation}>
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
  }
}

const SuperChoice = _.flow(
  DragSource(ItemTypes.CHOICE, choiceSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(MouseHoveringDetection(Radium(Choice)));

class UltimateChoice extends Component {
  constructor() {
    super();

    this.state = {
      animated: false
    };
  }

  clearAnimated = () => this.setState({ animated: false });

  setAnimated = () => this.setState({ animated: true });

  render() {
    return (
      <SuperChoice
        {...this.props}
        animated={this.state.animated}
        setAnimated={this.setAnimated}
        clearAnimated={this.clearAnimated}
      />
    );
  }
}

export default UltimateChoice;

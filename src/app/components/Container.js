import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Selector from './Selector';
import Choices from './Choices';
import styles from '../styles';

const Container = ({ title, choices, selectChoice }) =>
  <DragDropContextProvider backend={HTML5Backend}>
    <div style={styles.container.outer}>
      <p style={styles.text}>{title}</p>
      <div style={styles.container.inner}>
        <Selector />
        <Choices choices={choices} selectChoice={selectChoice} />
      </div>
    </div>
  </DragDropContextProvider>;

export default Container;

import React from 'react';
import Choice from './Choice';
import styles from '../styles';

const Choices = ({ choices, selectChoice }) => (
  <div style={styles.choices}>
    {choices.map((choice, index) => (
      <Choice
        key={index}
        index={index}
        title={choice.title}
        color={choice.color}
        votes={choice.votes}
        selectChoice={selectChoice}
      />
    ))}
  </div>
);

export default Choices;

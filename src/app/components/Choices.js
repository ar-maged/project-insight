import React from 'react';
import Choice from './Choice';

const Choices = ({ choices, selectChoice }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
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

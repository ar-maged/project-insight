import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Selector from './Selector';
import Choice from './Choice';

const Container = ({ question, selectChoice }) => (
  <DragDropContextProvider backend={HTML5Backend}>
    <div>
      <div>
        <p>{question.title}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Selector />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {question.choices.map((choice, index) => (
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
      </div>
    </div>
  </DragDropContextProvider>
);

export default Container;

import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Selector from './Selector';
import Choice from './Choice';

const Container = ({ currentQuestion }) => (
  <DragDropContextProvider backend={HTML5Backend}>
    <div>
      <div>
        <p>{currentQuestion.title}</p>
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Selector />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {currentQuestion.choices.map((choice, index) => (
          <Choice key={index} title={choice.title} />
        ))}
      </div>
    </div>
  </DragDropContextProvider>
);

export default Container;

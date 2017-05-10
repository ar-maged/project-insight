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
      <div>
        <Selector />
      </div>
      <div>
        {question.choices.map((choice, index) => (
          <Choice
            key={index}
            index={index}
            title={choice.title}
            selectChoice={selectChoice}
          />
        ))}
      </div>
    </div>
  </DragDropContextProvider>
);

export default Container;

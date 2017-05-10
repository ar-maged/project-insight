import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Selector from './Selector';
import Choice from './Choice';

const Container = ({ question, endMessage, selectChoice }) => (
  <DragDropContextProvider backend={HTML5Backend}>
    <div>
      {question
        ? <div>
            <div>
              <p>{question.title}</p>
            </div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
              <Selector />
            </div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
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
        : <p>{endMessage}</p>}
    </div>
  </DragDropContextProvider>
);

export default Container;

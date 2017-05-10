import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Selector from './Selector';
import Choice from './Choice';

const Container = () => (
  <DragDropContextProvider backend={HTML5Backend}>
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Selector />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Choice name="Choice A" />
        <Choice name="Choice B" />
        <Choice name="Choice C" />
      </div>
    </div>
  </DragDropContextProvider>
);

export default Container;

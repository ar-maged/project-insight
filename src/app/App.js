import React, { Component } from 'react';
import './App.css';

import DustbinSingleTarget from './DustbinSingleTarget';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return <DustbinSingleTarget />;
  }
}

export default App;

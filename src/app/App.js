import React, { Component } from 'react';
import { Container } from './ChoiceSelection';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Container
        currentQuestion={{
          _id: '58d56a11e619fe7424bdd82c',
          title: 'Are you a lecturer?',
          choices: [{ title: 'Yes' }, { title: 'No' }]
        }}
      />
    );
  }
}

export default App;

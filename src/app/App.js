import React, { Component } from 'react';
import { Container } from './ChoiceSelection';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: {
        _id: '58d56a11e619fe7424bdd82c',
        title: 'Are you a lecturer?',
        choices: [
          {
            index: 0,
            title: 'Yes'
          },
          {
            index: 1,
            title: 'No'
          }
        ]
      },
      currentChoice: {
        questionId: null,
        choiceIndex: null
      }
    };
  }

  selectChoice = ({ choiceIndex }) => {
    this.setState({
      ...this.state,
      currentChoice: {
        questionId: this.state.currentQuestion._id,
        choiceIndex: choiceIndex
      }
    });
  };

  render() {
    return (
      <Container
        question={this.state.currentQuestion}
        selectChoice={this.selectChoice}
      />
    );
  }
}

export default App;

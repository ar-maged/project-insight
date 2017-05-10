import React, { Component } from 'react';
import { Container } from './components';
import { dummyQuestions } from './mockdata';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      choices: [],
      currentQuestionIndex: 0
    };
  }

  componentWillMount() {
    this.setState({
      questions: dummyQuestions
    });
  }

  selectChoice = ({ choiceIndex }) => {
    const { questions, choices, currentQuestionIndex } = this.state;

    this.setState({
      ...this.state,

      choices: choices.concat({
        questionId: questions[currentQuestionIndex]._id,
        choiceIndex: choiceIndex
      }),

      currentQuestionIndex: currentQuestionIndex + 1
    });
  };

  render() {
    const { questions, currentQuestionIndex } = this.state;
    const { selectChoice } = this;

    return (
      <Container
        question={questions[currentQuestionIndex]}
        endMessage="Thank you!"
        selectChoice={selectChoice}
      />
    );
  }
}

export default App;

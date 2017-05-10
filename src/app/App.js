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
    const questionsOver = currentQuestionIndex === questions.length;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Project Insight</h2>
        </div>
        <div className="App-body">
          {!questionsOver
            ? <Container
                question={questions[currentQuestionIndex]}
                selectChoice={selectChoice}
              />
            : <p>Thank you!</p>}
        </div>
      </div>
    );
  }
}

export default App;

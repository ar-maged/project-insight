import React, { Component } from 'react';
import { Container } from './components';
import { dummyQuestions } from './mockdata';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      choice: {},
      currentQuestionIndex: 0,
      done: false
    };
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      questions: dummyQuestions
    });
  }

  selectChoice = ({ choiceIndex }) => {
    const { questions, currentQuestionIndex } = this.state;

    this.setState({
      ...this.state,
      choice: {
        questionId: questions[currentQuestionIndex]._id,
        choiceIndex: choiceIndex
      },
      done: true
    });
  };

  render() {
    const { questions, currentQuestionIndex, done } = this.state;
    const { selectChoice } = this;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Project Insight</h2>
        </div>
        <div className="App-body">
          {!done
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

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import { Container } from './components';
import { questions } from './data';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      currentQuestionIndex: 0
    };

    injectTapEventPlugin();
  }

  componentWillMount() {
    const updatedQuestions = questions.map(question => ({
      ...question,
      choices: question.choices.map((choiceTitle, index) => ({
        index,
        title: choiceTitle,
        votes: 0
      }))
    }));

    this.setState({
      ...this.state,
      questions: updatedQuestions
    });
  }

  selectChoice = ({ choiceIndex }) => {
    const { questions, currentQuestionIndex } = this.state;

    const choices = questions[currentQuestionIndex].choices;
    const choice = choices[choiceIndex];

    const updatedChoice = {
      ...choice,
      votes: choice.votes + 1
    };

    const updatedChoices = choices.map((choice, index) => {
      if (index === choiceIndex) {
        return updatedChoice;
      }
      return choice;
    });

    const updatedQuestions = questions.map((question, index) => {
      if (index === currentQuestionIndex) {
        return {
          ...question,
          choices: updatedChoices
        };
      }
      return question;
    });

    this.setState({
      ...this.state,
      questions: updatedQuestions
    });
  };

  render() {
    const { questions, currentQuestionIndex } = this.state;
    const { selectChoice } = this;

    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Project Insight"
            titleStyle={{ fontFamily: 'Special Elite' }}
            showMenuIconButton={false}
          />
          <div className="App-body">
            <Container
              question={questions[currentQuestionIndex]}
              selectChoice={selectChoice}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

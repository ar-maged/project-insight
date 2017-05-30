import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
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

    injectTapEventPlugin();
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
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Project Insight"
            titleStyle={{ fontFamily: 'Special Elite' }}
            showMenuIconButton={false}
          />
          <div className="App-body">
            {!done
              ? <Container
                  question={questions[currentQuestionIndex]}
                  selectChoice={selectChoice}
                />
              : <p>Thank you!</p>}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

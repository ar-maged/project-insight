import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import Radium, { StyleRoot } from 'radium';
import Datastore from 'nedb';
import Promise from 'bluebird';
import { Container } from './components';
import { questions, colors } from './data';
import settings from './config/settings';
import styles from './styles';

class App extends Component {
  constructor() {
    super();

    this.state = {
      questions: questions.map(this.constructQuestion),
      currentQuestionIndex: 0
    };

    this.persistence = {};

    injectTapEventPlugin();
  }

  async componentWillMount() {
    this.persistence = new Datastore({
      filename: settings.persistence.filename,
      autoload: settings.persistence.autoload
    });

    Promise.promisifyAll(this.persistence);

    if (settings.persistence.wipe) {
      await this.persistence.removeAsync({});
    }

    this.rehydrateState();
  }

  rehydrateState = async () => {
    const count = await this.persistence.countAsync({});

    if (count === 0) {
      await this.persistence.insertAsync({});
    } else {
      const savedState = await this.persistence.findOneAsync({});
      this.setState(savedState);
    }
  };

  constructQuestion = question => {
    const copyOfColors = [...colors];

    return {
      ...question,
      choices: question.choices.map((choiceTitle, index) =>
        this.constructChoice({
          index,
          title: choiceTitle,
          color: this.removeRandomColor(copyOfColors)
        })
      )
    };
  };

  constructChoice = ({ index, title, color }) => ({
    index,
    title,
    color,
    votes: 0
  });

  removeRandomColor = colors =>
    colors.splice(Math.floor(Math.random() * colors.length), 1);

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

    this.setState(
      {
        ...this.state,
        questions: updatedQuestions
      },
      () => this.persistence.updateAsync({}, { $set: this.state })
    );
  };

  render() {
    const { questions, currentQuestionIndex } = this.state;

    return (
      <MuiThemeProvider>
        <StyleRoot>
          <div>
            <AppBar
              title="Project Insight"
              titleStyle={styles.text}
              showMenuIconButton={false}
            />
            <Container
              title={questions[currentQuestionIndex].title}
              choices={questions[currentQuestionIndex].choices}
              selectChoice={this.selectChoice}
            />
          </div>
        </StyleRoot>
      </MuiThemeProvider>
    );
  }
}

export default App;

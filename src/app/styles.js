import { pulse, bounceIn } from 'react-animations';
import Radium from 'radium';

export default {
  text: {
    fontFamily: 'Special Elite',
    textAlign: 'center'
  },
  animations: {
    pulse: {
      animation: 'x 0.5s',
      animationName: Radium.keyframes(pulse, 'pulse')
    },
    bounceIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(bounceIn, 'bounceIn')
    }
  },
  container: {
    outer: {
      width: '90%',
      margin: 'auto',
      padding: '10px',
      fontSize: '2.5rem'
    },
    inner: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  selector: {
    alignSelf: 'center',
    height: '12rem',
    width: '15rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    color: 'white',
    fontSize: '1.25rem',
    lineHeight: 'normal',
    borderRadius: '1rem'
  },
  choices: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  choice: {
    width: '10rem',
    marginRight: '1.5rem',
    marginLeft: '1.5rem',
    cursor: 'move'
  }
};

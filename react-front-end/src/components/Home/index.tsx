import { makeStyles } from '@material-ui/core/styles';

import Form from './Form';
import Mood from './Mood';
import PrivacySetting from './PrivacySetting'

import background from '../../imgs/backgroundImg.png'

const useStyles = makeStyles(() => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignContent: 'center',
    // justifyContent: 'center',
    backgroundImage: `url(${background})`, 
    height: '600px'
  }
}))

const Home = () => {

  const classes = useStyles();

  const timeElapsed: number = Date.now();
  const currentDay = new Date(timeElapsed);

  console.log("Home has loaded");
  
  return (
    
      <div className={classes.root}>
        <h1>Create An Entry</h1>
        <h2>{currentDay.toDateString()}</h2>
          <PrivacySetting />
          <Mood />
          <Form />
      </div>
    
  );
};

export default Home;
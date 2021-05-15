import { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import Form from './Form';
import Mood from './Mood';
import PrivacySetting from './PrivacySetting'

import background from '../../imgs/backgroundImg.png';

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${background})`, 
    height: '600px'
  }
}))

const Home = () => {

  const [ mood, setMood ] = useState<null | number>(null);
  const [ entry, setEntry ] = useState({
    title: "", content: "", privacy: true, category: null
  });
  
  const submitContent = (userId: string | number) => {

    axios.post('api/entries', {...entry, userId, mood}) 
      .then(res => console.log("POST", res.data))
      .catch(err => console.log("ERROR", err));
  }
  const classes = useStyles();

  const timeElapsed: number = Date.now();
  const currentDay = new Date(timeElapsed);
  
  return (
    
      <div className={classes.root}>
        <h1>Create An Entry</h1>
        <h2>{currentDay.toDateString()}</h2>
          <PrivacySetting entry={entry} setEntry={setEntry} />
          
          <Mood mood={mood} setMood={setMood} />
          <Form entry={entry} setEntry={setEntry} submitContent={submitContent}/>
      </div>
    
  );
};

export default Home;
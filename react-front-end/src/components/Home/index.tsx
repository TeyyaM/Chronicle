import { useState } from 'react';
import axios from 'axios';
import Form from './Form';
import Mood from './Mood';
import PrivacySetting from './PrivacySetting'

import background from '../../imgs/backgroundImg.png';

const Home = () => {

  const [ mood, setMood ] = useState<null | number>(null);
  const [ entry, setEntry ] = useState({
    title: "", content: "", privacy: true, category: null
  });
  
  console.log('STATE:', entry)
  console.log('MOOD:', mood)

  const submitContent = (userId: string | number) => {

    axios.post('api/entries', {...entry, userId, mood}) 
      .then(res => console.log("POST", res.data))
      .catch(err => console.log("ERROR", err));
  }

  const timeElapsed: number = Date.now();
  const currentDay = new Date(timeElapsed);

  console.log("Home has loaded");
  
  return (
    
      <div style={{backgroundImage: `url(${background})`, height: '600px'}}>
        <h1>Create An Entry</h1>
        <h2>{currentDay.toDateString()}</h2>
          <PrivacySetting entry={entry} setEntry={setEntry} />
          <Mood setMood={setMood} />
          <Form entry={entry} setEntry={setEntry} submitContent={submitContent}/>
      </div>
    
  );
};

export default Home;
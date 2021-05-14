import Form from './Form';
import Mood from './Mood';
import PrivacySetting from './PrivacySetting'

import background from '../../imgs/backgroundImg.png'

const Home = () => {

  const timeElapsed: number = Date.now();
  const currentDay = new Date(timeElapsed);

  console.log("Home has loaded");
  
  return (
    
      <div style={{backgroundImage: `url(${background})`}}>
        <h1>Create An Entry</h1>
        <h2>{currentDay.toDateString()}</h2>
          <PrivacySetting />
          <Mood />
          <Form />
      </div>
    
  );
};

export default Home;
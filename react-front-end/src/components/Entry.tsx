import { useEffect, useState, useContext } from 'react';
// import {useParams, useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../hooks/UserContext';


import { smiley, mild, neutral, unhappy, angry } from './emojis';

interface Params {entryId: string};

const { userRef } = useContext(UserContext);
const user = userRef.current;

const entryStyling = {
  backgroundColor: user ? user.background_hex : '#0b3c5d',
  color: user ? user.title_hex : '#d9b310',   
  height: '12vh'
}
    

const Entry = () => {

  interface Data {
    title: string;
    content: string;
    privacy: boolean;
    category_id: number | string | null;
    date_created: string | Date;
    mood: number | string| null;
  }
  const [ content, setContent ] = useState<Data>({
    title: "",
    content: "",
    mood: 0,
    privacy: true,
    date_created: "",
    category_id: null
  });

  
  const params: Params = useParams();

  useEffect(() => {
    console.log("useEffect is called")
    axios.get(`/api/entries/${params.entryId}`)
      .then(res => setContent({...res.data[0]})); // Do stuff with it
  }, [params.entryId]);

      // displays mood icon
      const moodImage = (num: number | string) => {
        const imgs = {
          1: {
            src: angry,
            name: 'Very Unhappy'
          },
          2: {
            src: unhappy,
            name: 'Unhappy'
          },
          3: {
            src: neutral,
            name: 'Neutral'
          },
          4: {
            src: mild,
            name: 'Happy'
          },
          5: {
            src: smiley,
            name: 'Very Happy'
            }
        };
        return imgs[num];
      }





  // const history = useHistory();
  // console.log(history);

  const availableMood = () => {

    if(content.mood) {
      const mood = moodImage(content.mood);
      return <p><img src={mood.src} alt={mood.name} /></p> 
    } else {
     return null;
    }
  }

  return (
    <div>
      <h2 style={entryStyling}>{content.title}</h2>
      <p>{content.date_created}</p>
      <p>{content.privacy}</p>
      {availableMood()}
      <p>{content.content}</p>
    </div>
  );
};

export default Entry;
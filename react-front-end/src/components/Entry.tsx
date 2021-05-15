import { useEffect, useState } from 'react';
// import {useParams, useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import { smiley, mild, neutral, unhappy, angry } from './emojis'

const Entry = () => {
  const [ content, setContent ] = useState({
    title: "",
    content: "",
    mood: 0,
    privacy: true,
    date_created: ""
  });
  
  interface Params {
    entryId: string;
  };
  
  const params: Params = useParams();

  useEffect(() => {
    console.log("useEffect is called")
    axios.get(`/api/entries/${params.entryId}`)
      .then(res => setContent({...res.data[0]})); // Do stuff with it
  }, [params.entryId]);

      // displays mood icon
      const moodImage = (num: number) => {
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


  // interface Data {
  //   title: string;
  //   content: string;
  //   privacy: boolean;
  //   category_id?: number;
  //   date_created: string
  // }


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
      <h2>{content.title}</h2>
      <p>{content.date_created}</p>
      <p>{content.privacy}</p>
      {availableMood()}
      <p>{content.content}</p>
    </div>
  );
};

export default Entry;
import { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

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

  // interface Data {
  //   title: string;
  //   content: string;
  //   privacy: boolean;
  //   category_id?: number;
  //   date_created: string
  // }


  const history = useHistory();
  // console.log(history);

  useEffect(() => {
    axios.get(`/api/entries/${params.entryId}`)
      .then(res => setContent({...res.data[0]})); // Do stuff with it
  }, [params.entryId]);

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.mood}</p>
      <p>{content.date_created}</p>
      <p>{content.privacy}</p>
      <p>{content.content}</p>
    </div>
  );
};

export default Entry;
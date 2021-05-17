import TextField from '@material-ui/core/TextField';

import { useEffect, useState, useContext, Fragment } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../hooks/UserContext';
import { smiley, mild, neutral, unhappy, angry } from './emojis';

interface Params {entryId: string};
interface Data {
  title: string;
  content: string;
  privacy: boolean;
  category_id: number | string | null;
  date_created: Date | null;
  mood: number | string | null;
  user_id?: number | string;
};

const Entry = () => {
  const { userRef } = useContext(UserContext);
  const user = userRef.current;
  const [ editMode, setEditMode ] = useState<boolean>(false)
  const [ content, setContent ] = useState<Data>({
    title: "",
    content: "",
    mood: 0,
    privacy: true,
    date_created: null,
    category_id: null,
  });
  
  const entryStyling = {
    backgroundColor: user ? user.background_hex : '#0b3c5d',
    color: user ? user.title_hex : '#d9b310',   
    height: '50%',
    margin: 15,
    padding: 15,
    borderColor: user ? user.secondary_hex : 'black',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10
  }  
  
  const params: Params = useParams();
  const entryId = params.entryId;
  useEffect(() => {
    axios.get(`/api/entries/${entryId}`)
    .then(res => setContent({...res.data[0]})); // Do stuff with it
  }, [entryId]);
  
  const updateEntry = () => {
    axios.post(`/api/entries/${entryId}`, {
      params: { title: content.title, content: content.content, mood: content.mood, category_id: content.category_id, user_id: content.user_id, privacy: content.privacy }
    })
    .then(res => console.log("DATA: ", res.data))
    .catch(err => console.log("ERROR: ", err));
  };

  const deleteEntry = () => {
    axios.delete(`/api/entries/${entryId}`, {
      data: {
        user_id: user.id,
      }
    })
      .then(res => console.log("DATA: ", res.data))
      .catch(err => console.log("ERROR: ", err));
  }
  

  // displays emoji if entry has a mood
  function moodImage (num: number | string | null) {
    if (num) {
      const imgs = {
        1: {src: angry, name: 'Very Unhappy'},
        2: {src: unhappy, name: 'Unhappy'},
        3: {src: neutral, name: 'Neutral'},
        4: {src: mild, name: 'Happy'},
        5: {src: smiley, name: 'Very Happy'}
      };
      return (
        <p><img src={imgs[num].src} alt={imgs[num].name}/></p>
      );
    } else {
      return null;
    }}

  function titleHandler(event) {
    setContent(prev => ({...prev, title: event.target.value}))
  };

  function contentHandler(event) {
    setContent((prev) => ({...prev, content: event.target.value}))
  };

  const save = (val) => {
    if(val) {
      return (
        <div>
          <button onClick={() => updateEntry()}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={() => deleteEntry()}>Delete</button>
        </div>
      )
    }
  }

  return (
    <Fragment>
      {editMode 
      ? (<div style={entryStyling}>
      <form><TextField 
        id="outlined-basic" 
        margin="normal"
        label="Title" 
        variant="outlined" 
        fullWidth
        value={content.title}
        onInput={titleHandler}
        />

      <TextField 
        id="outlined-basic" 
        multiline
        rows="10"
        label="Whats on your mind?" 
        variant="outlined" 
        fullWidth
        value={content.content}
        onInput={contentHandler}
        /></form>
        </div> )

      : (<div style={entryStyling}>
      <h1 >{content.title}</h1>
      <h2>{content.date_created}</h2>
      <p>{content.privacy}</p>
      {moodImage(content.mood)}
      <p>{content.content}</p>
    </div>)}
      {save(editMode)}
    </Fragment>
    
  );
};

export default Entry;
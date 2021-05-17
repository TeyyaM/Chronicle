import TextField from '@material-ui/core/TextField';

import { useEffect, useState, useContext, Fragment } from 'react';
// import {useParams, useHistory} from 'react-router-dom';
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
    category_id: null
  });
  
  const entryStyling = {
    backgroundColor: user ? user.background_hex : '#0b3c5d',
    color: user ? user.title_hex : '#d9b310',   
    height: '50%',
    margin: 15,
    borderColor: user ? user.secondary_hex : 'black',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10
  }  
  
  const params: Params = useParams();
  useEffect(() => {
    axios.get(`/api/entries/${params.entryId}`)
      .then(res => setContent({...res.data[0]})); // Do stuff with it
  }, [params.entryId]);

  // function update(content) {
  //   axios.put(`/api/entries/${params.entryId}`, {content})
  // }
  // may have to update route

  // displays emoji if entry has a mood
  function moodImage (num: number | string | null) {
    if (num) {
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

  const buttonMessage = editMode ? "Save" : "Edit";

  return (
    <Fragment>
      {editMode 
      ? (<form> <TextField 
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
        />
        </form> )

      : (<div style={entryStyling}>
      <h2 >{content.title}</h2>
      <p>{content.date_created}</p>
      <p>{content.privacy}</p>
      {moodImage(content.mood)}
      <p>{content.content}</p>
    </div>)}
      <button onClick={() => setEditMode(true)}>{buttonMessage}</button>
    </Fragment>
    
  );
};

export default Entry;
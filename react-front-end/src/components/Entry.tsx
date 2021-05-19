import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useEffect, useState, useContext, Fragment } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../hooks/UserContext';
import { smiley, mild, neutral, unhappy, angry } from './emojis';
import CategorySelect from './CategorySelect/CategorySelect';

interface Params {entryId: string};
interface Data {
  title: string;
  content: string;
  privacy: boolean;
  date_created: Date | null;
  mood: number | string | null;
  user_id?: number | string;
  date?: Date | string;
};
interface Emojis {
  1: {src: string, name: string},
  2: {src: string, name: string},
  3: {src: string, name: string},
  4: {src: string, name: string},
  5: {src: string, name: string},
}

const Entry = () => {
  const history = useHistory();
  const { userRef } = useContext(UserContext);
  const user = userRef.current;
  const [ editMode, setEditMode ] = useState<boolean>(false)
  const [ content, setContent ] = useState<Data>({
    title: "",
    content: "",
    mood: 0,
    privacy: true,
    date_created: null,
  });
  const [searchResults, setSearchResults] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<null | number>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('/api/categories')
      .then((res) => {
        setSearchResults(res.data);
        setCategoryList(res.data);
      })
      .catch(err => console.log("ERROR: ", err));
  }, [])

  const entryStyling = {
    backgroundColor: user ? user.background_hex : '#0b3c5d',
    color: user ? user.title_hex : '#d9b310',   
    height: 'fit-content',
    margin: 15,
    borderColor: user ? user.secondary_hex : 'black',
    borderStyle: 'solid',
    borderWidth: 10,
    borderRadius: 10,  
    titleStyling: {
      color: user ? user.background_hex : 'white',
      backgroundColor: user ? user.secondary_hex : 'rebeccapurple',
      marginTop: 0,
      paddingTop: 28,
      paddingBottom: 28,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },  
    buttonStyling: {
      margin: '1%'
    }
  }  
  
  const params: Params = useParams();
  const entryId = params.entryId;
  useEffect(() => {
    axios.get(`/api/entries/${entryId}`)
    .then(res => setContent({...res.data[0]})); // Do stuff with it
  }, [entryId]);
  
  const updateEntry = () => {
    console.log("CONTENT ", content);
    return axios.post(`/api/entries/${entryId}`, {
      params: { title: content.title, content: content.content, mood: content.mood, category_id: categoryId, user_id: content.user_id, privacy: content.privacy }
    })
    .then(res => {console.log("DATA: ", res.data)})
    .catch(err => console.log("ERROR: ", err));
  };

  const deleteEntry = () => {
    return axios.delete(`/api/entries/${entryId}`, {
      data: {
        user_id: user.id,
      }
    })
      .then(res => {
        console.log("DATA: ", res.data)
        return history.push('/entries');
      })
        .catch(err => console.log("ERROR: ", err));
      }

    // emojis for the users mood
    const imgs: Emojis = {
      1: {src: angry, name: 'Very Unhappy'},
      2: {src: unhappy, name: 'Unhappy'},
      3: {src: neutral, name: 'Neutral'},
      4: {src: mild, name: 'Happy'},
      5: {src: smiley, name: 'Very Happy'}
    };
  
  // displays emoji if entry has a mood
  function moodImage (num: number | string | null, imgObj: Emojis,  editStatus: boolean): JSX.Element | JSX.Element[] | null {
    if (num && !editStatus) {
    return <p><img src={imgObj[num].src} alt={imgObj[num].name}/></p>;

    } else if (editStatus) {

      const arr: JSX.Element[] = []
      for (const [key, value] of Object.entries(imgObj)) {
        arr.push(<p key={key} onClick={() => setContent({...content, mood: (key + 1)})}>
                  <img src={value.src} alt={value.name}/>
                </p>);
      }
      return arr;

    } else { return null;}   
  }

  function titleHandler(event) {
    setContent(prev => ({...prev, title: event.target.value}))
  };

  function contentHandler(event) {
    setContent((prev) => ({...prev, content: event.target.value}))
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    const results = categoryList.filter(categoryList =>
      categoryList.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
    setCategoryList(results);
  };

  const action = (edit) => {
    if(edit) {
      return (
        <Fragment>
          <Button variant="contained" color="primary" onClick={() => updateEntry()}>Save</Button>
          <Button variant="contained" color="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>Edit</Button>
          <Button variant="contained" color="secondary" onClick={() => deleteEntry()}>Delete</Button>
        </Fragment>
      )
    }
  }

  return (
    <div style={{height: '100%'}}>
      <div style={entryStyling.buttonStyling}>

      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        {moodImage(content.mood, imgs, editMode)}
      </div>     
      {editMode
        ? <div>
        <CategorySelect categories={searchResults}
          setCategoryId={setCategoryId}
          onChange={handleSearchChange} />
        <input
          style={{height: "20px", width: '148px', marginBottom: 10}} 
          type="text"
          placeholder="Filter Categories"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      : <></>}
        {action(editMode)}

      </div>
      {editMode 
      ? (
      <div style={entryStyling}>
        <h1 style={entryStyling.titleStyling}>Edit Your Entry</h1>
          <form>
            <TextField 
              id="outlined-basic" 
              margin="normal"
              label="Title" 
              variant="outlined" 
              fullWidth
              value={content.title}
              onInput={titleHandler} />

            <TextField 
              id="outlined-basic" 
              multiline
              rows="20"
              label="Whats on your mind?" 
              variant="outlined" 
              fullWidth
              value={content.content}
              onInput={contentHandler} />
          </form>
        </div>)

      : (<div style={entryStyling}>
          <h1 style={entryStyling.titleStyling}>{content.title}</h1>
          <h2>{content.date}</h2>
          <p>{content.privacy}</p>
          <p style={{padding: '2%'}}>{content.content}</p>
        </div>)} 
        
    </div>
  );
};

export default Entry;
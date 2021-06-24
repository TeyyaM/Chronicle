import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../hooks/UserContext';

import Form from './Form';
import Mood from './Mood';
import PrivacySetting from './PrivacySetting'
import CategorySelect from '../CategorySelect/CategorySelect';

interface IEntry {
  title: string;
  content: string;
  privacy: boolean;
  category: number | null;
}

const Home = () => {
  
  const { userRef } = useContext(UserContext);
  const user = userRef.current;
  
  const homeStyling = {
    backgroundColor: user ? user.background_hex : '#0b3c5d',
    color: user ? user.texte_hex : '#d9b310',   
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    paddingBottom: 250,
    borderColor: user ? user.secondary_hex : 'black',
    borderStyle: 'solid',
    borderWidth: 5,
    borderRadius: 10,
    height: '300%',
  };

  const [searchResults, setSearchResults] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<null | number>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ mood, setMood ] = useState<null | number>(null);
  const [ entry, setEntry ] = useState<IEntry>({
    title: "", content: "", privacy: true, category: null
  });

  useEffect(() => {
    axios.get('/api/categories')
      .then((res) => {
        setSearchResults(res.data);
        setCategoryList(res.data);
      })
      .catch(err => console.log("ERROR: ", err));
  }, [])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    const results = categoryList.filter(categoryList =>
      categoryList.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
    setCategoryList(results);
  };
  
  const submitContent = (userId: string | number) => {
    axios.post('api/entries', {...entry, userId, mood, category: categoryId}) 
      .then(res => console.log("POST", res.data))
      .catch(err => console.log("ERROR", err));
  }

  const currentDay = new Date(Date.now());
  
  return (
      <div style={homeStyling}>
        <h1>Create An Entry ❉ <em>{currentDay.toDateString()}</em></h1>
        <PrivacySetting entry={entry} setEntry={setEntry} />
        <Mood mood={mood} setMood={setMood} reset={null} />
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

          <Form entry={entry} setEntry={setEntry} submitContent={submitContent}/>
      </div>    
  );
};

export default Home;
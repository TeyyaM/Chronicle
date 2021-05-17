import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';
import Entry from './Entry';
import Mood from './Home/Mood';
import DatePicker from './DatePicker';
import { UserContext } from '../hooks/UserContext';
import CategorySelect from './CategorySelect/CategorySelect';

import { smiley, mild, neutral, unhappy, angry } from './emojis'

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

const Entries = () => {
  
  const { userRef } = useContext(UserContext);
  const user = userRef.current;
  
  const contentStyling = {
    height: '100%', 
    width: '96%',
    color: user ? user.text_hex : 'rebeccapurple',
    margin: 'auto',
    padding: '10px',
    fontFamily: 'Patrick Hand',
    fontStyle: 'cursive',
    fontSize: '1.5em',
    divStyling: {
      backgroundColor: user ? user.background_hex : '#85bade',
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 5,
      borderRadius: 10,
      margin: 10
    }
  }


  const [startDate, setStartDate] = useState<null | Date>(new Date('2015-08-18'));
  const [endDate, setEndDate] = useState<null | Date>(new Date(Date.now()));
  const [entries, setEntries] = useState<any>([{mood: 1, date: '2019-08-30', best_fit: 1}]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<null | number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState("");

  
  // const [categoryId, setCategoryId] = useState<null | number>(null);
  const [mood, setMood] = useState<null | number | 'all'>('all');
  const limit = 30;
  // const categoryId = 'all'; // null or 'all' or a number
  useEffect(() => {
      // get pie chart data
    axios.get('/api/entries', {
      params: {
        startDate,
        endDate,
        limit,
        mood,
        categoryId
      }
    })
    .then((res) => {
      setEntries(res.data)
    });
  }, [startDate, endDate, mood, categoryId]);

  useEffect(() => {
    axios.get('/api/categories')
      .then((res) => {
        setSearchResults(res.data);
        setCategoryList(res.data);
      })
  }, [])

  const searchChange = event => {
    setSearchTerm(event.target.value);
    const results = categoryList.filter(categoryList =>
      categoryList.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
    setCategoryList(results);
  };

  const content = entries.map((entry, index) => {
    const mood = moodImage(entry.mood);
    return ( 
      <div key={index} style={contentStyling.divStyling}>
        <Link to={`/entries/${entry.id}`}>{entry.title}</Link><br/>
        <p>{entry.category_name ? `Category: ${entry.category_name}` : null}</p>
        <p>{entry.date ? entry.date : null}</p>
        <p>{entry.mood ? <img src={mood.src} alt={mood.name} /> : null}</p>
        <p>{entry.content}</p>
      </div>
    ) 
  })

  return (
      <div style={contentStyling}>
        <h2>Entries</h2>
        <DatePicker 
          id="date-picker-start-date" 
          name="Start Date"
          date={startDate}
          setDate={setStartDate} />
        <DatePicker 
          id="date-picker-end-date" 
          name="End Date" 
          date={endDate}
          setDate={setEndDate}/>
        <Mood mood={mood} setMood={setMood} reset="all"/>
        <CategorySelect categories={searchResults}
           setCategoryId={setCategoryId}
           onChange={searchChange}
           all={true} />
        <input
          style={{height: "20px", width: "148px"}}
          type="text"
          placeholder="Narrow Down Categories"
          value={searchTerm}
          onChange={searchChange}
        />
        {content}

        <Switch>
          <Route path="/entries/:entryId" component={Entry} />
          <Route path="/entries">
          </Route>
        </Switch>
      </div>        
  )  
};

export default Entries;

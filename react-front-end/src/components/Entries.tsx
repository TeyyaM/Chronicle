
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';
import Entry from './Entry';
import Mood from './Home/Mood';
import DatePicker from './DatePicker';
import { UserContext } from '../hooks/UserContext';

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
  console.log("user%%%", user );
  
  const contentStyling = {
    height: '100%', 
    width: '96%',
    backgroundColor: user ? user.seccondary_hex : 'rebeccapurple',
    color: user ? user.text_hex : 'rebeccapurple',
    margin: 'auto',
    padding: '10px',
    fontFamily: 'Patrick Hand',
    fontStyle: 'cursive',
    fontSize: '1.5em',
    divStyling: {
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 3,
      borderRadius: 10,
      margin: 10
    }
  }


  const [startDate, setStartDate] = useState<null | Date>(new Date('2015-08-18'));
  const [endDate, setEndDate] = useState<null | Date>(new Date(Date.now()));
  const [entries, setEntries] = useState<any>([{mood: 1, date: '2019-08-30', best_fit: 1}]);

  // const [categoryId, setCategoryId] = useState<null | number>(null);
  const [mood, setMood] = useState<null | number | 'all'>('all');
  const limit = 10;
  const categoryId = 'all'; // null or 'all' or a number
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

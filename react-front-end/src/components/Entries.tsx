
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';
import Entry from './Entry';
import DatePicker from './DatePicker';

import { smiley, mild, neutral, unhappy, angry } from './emojis'

const Entries = () => {

  const [startDate, setStartDate] = useState<null | Date>(new Date('2015-08-18'));
  const [endDate, setEndDate] = useState<null | Date>(new Date(Date.now()));
  const [entries, setEntries] = useState<any>([{mood: 1, date: '2019-08-30', best_fit: 1}]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);

  // const [categoryId, setCategoryId] = useState<null | number>(null);
  const limit = 10;
  const mood = 'all';
  useEffect(() => {
      // get pie chart data
    axios.get('/api/entries', {
      params: {
        startDate,
        endDate,
        limit,
        mood
      }
    })
    .then((res) => {
      setEntries(res.data)
    });
  }, [startDate, endDate]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    axios.get('/api/entries')
    .then((res) => {
      setSearchResults(res.data);
      setEntries(res.data);
    })
  }, [] )
  useEffect(() => {
    if (entries.length !== 0){
    const results = entries.filter(entry =>
      console.log(entry.title)
      // entries.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }}, [entries, searchTerm]);


  // const url = ;

  const contentStyling = {
    height: '100vh', 
    width: '90%',
    border: '2px',
    borderColor: 'black',
    margin: 'auto',
    padding: '10px',
    // backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook.png%22)',
    // backgroundColor: '#cfe8fc', 
    overflow: 'scroll',
    fontFamily: 'Patrick Hand',
    fontStyle: 'cursive',
    fontSize: '1.5em'
  }
  
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

  const content = entries.map((entry, index) => {
      const mood = moodImage(entry.mood);
   return ( <div key={index} style={{border: 'black', borderWidth: '3px'}}>
      <Link to={`/entries/${entry.id}`}>{entry.title}</Link><br/>
      {searchResults.map(item => (
            <li>{item.title}</li>
          ))}
         
      <p>{entry.category_name ? `Category: ${entry.category_name}` : null}</p>
      <p>{entry.mood ? <img src={mood.src} alt={mood.name} /> : null}</p>
      <p>{entry.content}</p>
    </div>) 
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
           <input
        type="text"
        placeholder="Search for an Entry Title"
        value={searchTerm}
        onChange={handleChange}
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

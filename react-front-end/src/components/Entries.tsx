import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import {Link, Route, Switch} from 'react-router-dom';
import Entry from './Entry';
import DatePicker from './DatePicker';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Entries = () => {

  const [startDate, setStartDate] = useState<null | Date>(new Date('2015-08-18'));
  const [endDate, setEndDate] = useState<null | Date>(new Date('2030-01-01'));
  const [entries, setEntries] = useState<any>([{mood: 1, date: '2019-08-30', best_fit: 1}]);
  // const [categoryId, setCategoryId] = useState<null | number>(null);
  const limit = 10;
  const mood = 'null';
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

  // console.log("Entries", entries)

  const contentStyling = {
    width: '90%',
    border: '2px',
    borderColor: 'black',
    backgroundColor: 'lightBlue',
    margin: 'auto'
  }


  const content = entries.map(entry => {
   return ( <div style={contentStyling}>
      <Link to={`/entries/${entry.id}`}>{entry.title}</Link><br/>
      <p>{entry.mood ? `Mood: ${entry.mood}`: null}</p>
      <p>{entry.content}</p>
    </div>) 
  })


  return (

    <Fragment>
      <CssBaseline />
        <Container maxWidth="xl">
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', overflow: 'scroll' }} >
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

            {content}

        <Switch>
          <Route path="/entries/:entryId" component={Entry} />
          <Route path="/entries">
          </Route>
        </Switch>
        </Typography>
        </Container>
    </Fragment>
  )  
};

export default Entries;


import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';
import Entry from './Entry';
import DatePicker from './DatePicker';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// import smiley from '../imgs/smiley.ico';
// import mild from '../imgs/mildly_happy.ico';
// import neutral from '../imgs/neutral.ico';
// import unhappy from '../imgs/unhappy.ico';
// import angry from '../imgs/angry.ico';


const Entries = () => {

  const [startDate, setStartDate] = useState<null | Date>(new Date('2015-08-18'));
  const [endDate, setEndDate] = useState<null | Date>(new Date('2030-01-01'));
  const [entries, setEntries] = useState<any>([{mood: 1, date: '2019-08-30', best_fit: 1}]);
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

  // console.log("Entries", entries)

  const contentStyling = {
    height: '100vh', 
    width: '90%',
    border: '2px',
    borderColor: 'black',
    margin: 'auto',
    backgroundColor: '#cfe8fc', 
    overflow: 'scroll',
    fontFamily: 'Patrick Hand',
    fontStyle: 'cursive',
    fontSize: '1.5em'
  }

  const content = entries.map(entry => {
   return ( <div >
      <Link to={`/entries/${entry.id}`}>{entry.title}</Link><br/>
      <p>{entry.mood ? `Mood: ${entry.mood}`: null}</p>
      <p>{entry.content}</p>
    </div>) 
  })

  // displays mood icon
  // const moodImage = (num: number) => {
  //   const imgs = {1: angry, 2: unhappy, 3: neutral, 4: mild, 5: smiley};
  //   return (
  //     <img src={imgs[num]}/>
  //   )
  // }


  return (

    <Fragment>
      <CssBaseline />
        <Container maxWidth="xl">
          <Typography component="div" style={contentStyling} >
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

import { useState, useEffect } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Entry from './Entry';
import DatePicker from './DatePicker';
import axios from 'axios';

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

console.log(entries)
  return (
    <div>
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
      <div>
        <Link to="/entries/1">Entry Title #1</Link><br/>
        <Link to="/entries/2">Entry Title #2</Link><br/>
        <Link to="/entries/3">Entry Title #3</Link><br/>
        <Link to="/entries/4">Entry Title #4</Link><br/>
        <Link to="/entries/5">Entry Title #5</Link>
      </div>

      <Switch>
        <Route path="/entries/:entryId" component={Entry} />
        <Route path="/entries">
          <h2>Please choose a entry from the list above</h2>
        </Route>
      </Switch>
    </div>
  );
};

export default Entries;

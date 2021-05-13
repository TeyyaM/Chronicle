// import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries,
  ScatterSeries
} from '@devexpress/dx-react-chart-material-ui';


// const test = [
//   { day: 1, mood: 10 },
//   { day: 2, mood: 40 },
//   { day: 3, mood: 30 },
//   { day: 4, mood: 5 },
//   { day: 5, mood: 10 },
//   { day: 6, mood: 1 },
// ];

export default function Graphs() {
  const [data, setData] = useState<any>([{mood: 1, date_created: '2019-08-30T12:33:58.695Z'}]);
  useEffect(() => {
    axios.get('/api/graph')
    .then((res) => {
      setData(res.data)
      console.log('the res data', res.data)
    })
  }, [])
  return (
    <div className="Graphs">
      <h2>Graphs</h2>
    {/* <Paper> */}
    <Chart
      data={data}
    >
      <ArgumentAxis />
      <ValueAxis />

      <ScatterSeries name="points" valueField="mood" argumentField="date_created" />
      <SplineSeries name="average" valueField="mood" argumentField="date_created" />
    </Chart>
  {/* </Paper> */}
    </div>
  );
}
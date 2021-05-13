// import Paper from '@material-ui/core/Paper';   
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries,
  ScatterSeries,
} from '@devexpress/dx-react-chart-material-ui';


export default function Graphs() {
  const [data, setData] = useState<any>([{mood: 1, date: '2019-08-30T12:33:58.695Z', best_fit: 1}]);
  useEffect(() => {
    axios.get('/api/graph')
    .then((res) => {
      // Add line of best fit
      const { data } = res
      for (let i = 0; i < data.length; i++) {
        (data[i + 1] && data[i - 1])
        ? data[i].best_fit = ((data[i - 1].mood + data[i].mood + data[i + 1].mood) / 3)
        : (data[i + 1])
        ? data[i].best_fit = ((data[i].mood + data[i + 1].mood) / 2)
        : data[i].best_fit = ((data[i - 1].mood + data[i].mood) / 2 )
      }
      setData(data)
      console.log('the res data', data)
      // console.log('the setData data', data)
    })
  }, [])
  return (
    <div className="Graphs">
      <h2>Graphs</h2>
    {/* <Paper> */}
    <Chart
      data={data}
    >
      <ArgumentAxis>
        </ArgumentAxis>
      <ValueAxis />

      <ScatterSeries name="points" valueField="mood" argumentField="date" />
      <SplineSeries name="best fit" valueField="best_fit" argumentField="date"  />
    </Chart>
  {/* </Paper> */}
    </div>
  );
}
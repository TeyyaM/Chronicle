import { useEffect, useState } from 'react';
import axios from 'axios';
import LineGraph from './LineGraph'
export default function Graphs() {
  const [data, setData] = useState<any>([{mood: 1, date: '2019-08-30', best_fit: 1}]);
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
    })
  }, [])
  return (
  <LineGraph data={data}/>
  );
}
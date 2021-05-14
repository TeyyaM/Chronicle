import axios from 'axios';
import { useState, useEffect } from 'react';
import LineGraph from './graphs/LineGraph';
import PieGraph from './graphs/PieGraph';
export default function Graphs() {
  // const [startDate, setStartDate] = useState<string | null>(null);
  // const [endDate, setEndDate] = useState<string | null>(null);
  const startDate = '2019-08-30';
  const endDate = '2021-08-30';
  const [pieData, setPieData] = useState<any>([{mood: 1, entries: 1}]);
  const [lineData, setLineData] = useState<any>([{mood: 1, date: '2019-08-30', best_fit: 1}]);
  useEffect(() => {
    // get pie chart data
  axios.get('/api/graph', {
    params: {
      type: 'pie',
      startDate,
      endDate
    }
  })
  .then((res) => {
    console.log('pie', res.data)
    setPieData(res.data)
  });

  // get line graph data
  axios.get('/api/graph', {
    params: {
      type: 'line',
      startDate,
      endDate
    }
  })
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
      console.log('line', data)
      setLineData(data)
    });
  }, [])
  return (
  <>
  <PieGraph data={pieData} startDate={startDate} endDate={endDate} />
  <LineGraph data={lineData} startDate={startDate} endDate={endDate} />
  </>
  );
}
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import axios from 'axios';
import {
  Chart,
  Series,
  Legend,
  ValueAxis,
  ArgumentAxis,
  Grid,
  MinorGrid,
  CommonPaneSettings,
  Border,
  Label,
  CommonSeriesSettings
} from 'devextreme-react/chart';

export default function Graphs() {
  const { userRef } = useContext(UserContext);
  const color = userRef.current.accent_hex
  console.log(color)
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
      console.log('the res data', data)
      // console.log('the setData data', data)
    })
  }, [])
  return (
    <Chart id="mood-graph" dataSource={data} title="Your Mood Over Time">
      <CommonSeriesSettings color="#3d2200" />
    <Series
      type="scatter"
      color={userRef.current.accent_hex}
      valueField="mood"
      name="Mood"
      argumentField="date" />
    <Series
      type="spline"
      color={userRef.current.text_hex}
      valueField="best_fit"
      name="Average Mood"
      argumentField="date" />
    <ArgumentAxis>
    <Label wordWrap="none" overlappingBehavior="hide" />
      <Grid visible={true} />
      <MinorGrid visible={true} />
      <h4>Entry Dates</h4>
    </ArgumentAxis>
    <ValueAxis>
      <h4>Mood</h4>
    </ValueAxis>
    <Legend
            verticalAlignment="top"
            horizontalAlignment="right"
          />
    <CommonPaneSettings>
      <Border visible={true} />
    </CommonPaneSettings>
  </Chart>
  );
}
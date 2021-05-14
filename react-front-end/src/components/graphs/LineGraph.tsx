import { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
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
  CommonSeriesSettings, 
  Point
} from 'devextreme-react/chart';

export default function LineGraph(props: { data: [{mood: number, date: string }], startDate: string | null, endDate: string | null }) {
  const { data } = props;
  const { userRef } = useContext(UserContext);

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
      argumentField="date" >
    <Point visible={false} />
    </Series>
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
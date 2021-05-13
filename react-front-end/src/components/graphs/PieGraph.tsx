import { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export
} from 'devextreme-react/pie-chart';


export default function PieGraph(props) {
  const { startDate, endDate } = props;
  const [data, setData] = useState<any>([{mood: 1, entries: 1}]);

  useEffect(() => {
    axios.get('/api/graph', {
    params: {
      type: 'pie',
      startDate,
      endDate
    }
  })
    .then((res) => {
      setData(res.data)
    })
  }, [])
  return (
    <PieChart
        id="pie-mood"
        dataSource={data}
        palette="Bright"
        title="Your Moods Over This Time"
      >
      <Series
        valueField="mood"
        name="Mood"
        argumentField="date">
        <Label visible={true}>
          <Connector visible={true} width={1} />
        </Label>
      </Series>

        <Size width={500} />
        <Export enabled={true} />
    </PieChart>
  );
}
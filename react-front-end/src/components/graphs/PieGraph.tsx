// import { useContext } from 'react';
// import { UserContext } from '../../hooks/UserContext';
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export
} from 'devextreme-react/pie-chart';


export default function PieGraph(props) {
  // const { userRef } = useContext(UserContext);
  return (
    <PieChart
        id="pie-mood"
        dataSource={props.data}
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
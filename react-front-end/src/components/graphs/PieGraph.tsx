import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export
} from 'devextreme-react/pie-chart';


export default function PieGraph(props) {
  const { data } = props;
  console.log(data)
  return (
    <PieChart
        id="pie-mood"
        dataSource={data}
        palette="Bright"
        title="Your Moods Over This Time"
      >
      <Series
        name="Mood"
        argumentField="mood"
        valueField="entires">
        <Label visible={true}>
          <Connector visible={true} width={1} />
        </Label>
      </Series>

        <Size width={700} />
        <Export enabled={true} />
    </PieChart>
  );
}
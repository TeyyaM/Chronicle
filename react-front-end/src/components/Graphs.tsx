import { useState } from 'react';
import LineGraph from './graphs/LineGraph';
import PieGraph from './graphs/PieGraph';
export default function Graphs() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  setStartDate('2020-01-01');
  setEndDate('2020-01-01');
  return (
  <>
  <LineGraph startDate={startDate} endDate={endDate} />
  <PieGraph startDate={startDate} endDate={endDate} />
  </>
  );
}
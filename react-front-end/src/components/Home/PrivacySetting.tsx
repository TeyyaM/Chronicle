import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Alert from '@material-ui/lab/Alert';
import { Dispatch, SetStateAction } from 'react';

interface IEntry {
  title: string;
  content: string;
  privacy: boolean;
  category: number | null;
}

export default function PrivacySetting(props: { entry: IEntry, setEntry: Dispatch<SetStateAction<IEntry>> }) {
  const { entry, setEntry } = props;

  const handleChange = () => {
    entry.privacy ? setEntry(prev => ({...prev, privacy: false})) 
    : setEntry(prev => ({...prev, privacy: true}));
  }

  return (
    <div style={{width: '92%', margin: 'auto'}}>
      <Alert style={entry.privacy ? {opacity: 0} : {opacity: 1}} severity="warning">Warning: privacy is set to public!</Alert>
      <FormControlLabel
        control={<Switch  checked={entry.privacy} onChange={handleChange} name="switch" color="secondary" />}
        label="Privacy"/>
    </div>
    
  )
} 

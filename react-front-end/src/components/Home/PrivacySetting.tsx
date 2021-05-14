import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export default function PrivacySetting(props) {
  const { entry, setEntry } = props;

  const handleChange = () => {

    entry.privacy ? setEntry(prev => ({...prev, privacy: false})) 
    : setEntry(prev => ({...prev, privacy: true}));
  }

  return (
    <FormControlLabel
        control={<Switch  checked={entry.privacy} onChange={handleChange} name="switch" />}
        label="Privacy"
      />
  )
} 

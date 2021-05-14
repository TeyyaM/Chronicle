import useContentData from '../../hooks/useContentData';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export default function PrivacySetting() {
  const { state, setState } = useContentData();

  const handleChange = () => {

    state.privacy ? setState(prev => ({...prev, privacy: false})) 
    : setState(prev => ({...prev, privacy: true}));
    
  }

  return (
    <FormControlLabel
        control={<Switch  checked={state.privacy} onChange={handleChange} name="switch" />}
        label="Privacy"
      />
  )
} 

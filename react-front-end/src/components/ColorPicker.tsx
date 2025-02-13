import axios from 'axios';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { FormEventHandler, useContext } from 'react'; 
import { UserContext } from '../hooks/UserContext';  
import SaveButton from './SaveButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const ColorPicker = (props: { color: string; setColor: (color: string) => void; name: string;}) => {

  const { color, setColor, name } = props
  const { userRef, setUser } = useContext(UserContext);   
  const user = userRef.current;
  const convertedName = name.split(' ').join('_').toLowerCase() + '_hex';


  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      textFieldColors: {
        color: user ? user.text_hex : '#000000',
        backgroundColor: user ? user.form_hex : '#fffbc8',
      }
    }),
  );
  const classes = useStyles();

  const homeStyling = {
    backgroundColor: user ? user.background_hex : '#0b3c5d',
    color: user ? user.text_hex : '#d9b310',   
    marginRight: 15,
    marginLeft: 15,
    paddingBottom: 15,
    paddingTop: 15,
    width: '40%',

    borderColor: user ? user.secondary_hex : 'black',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    height: '100%',
  };

  const saveColor: FormEventHandler<HTMLFormElement> = () => {
    saveToDatabase();
  };

  const changeColor = (event: string) => {
    setColor(event)
    setUser({...user, [convertedName]: event});

  };

  const saveToDatabase = () => {
    axios.post(`/api/users/${user.id}`, {
      params: {
      [convertedName]: color
      }
    })
  };

  return (
    <form style={homeStyling} onSubmit={saveColor}>
      <HexColorPicker color={color} onChange={changeColor} />
  <label>
    {name} Hex Value:
  </label>
      <span>
      # <HexColorInput color={color} 
      onChange={changeColor} 
      name={name}
      className={classes.textFieldColors}
      />
      </span>
  <SaveButton save={saveColor} color={color} />
</form>
  );
};
export default ColorPicker;
import axios from 'axios';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useContext } from 'react'; 
import { UserContext } from '../hooks/UserContext';  
import SaveButton from './SaveButton';

const ColorPicker = (props: { color: string; setColor: (color: string) => void; name: string;}) => {
  const { color, setColor, name } = props
  const { userRef, setUser } = useContext(UserContext);   
  const user = userRef.current;
  const convertedName = name.toLowerCase() + '_hex';

  const homeStyling = {
    backgroundColor: user ? user.background_hex : '#0b3c5d',
    color: user ? user.text_hex : '#d9b310',   
    margin: 15,
    paddingBottom: 15,
    borderColor: user ? user.secondary_hex : 'black',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    height: '100%',
  };

  const saveColor = (event: any) => {
    event.preventDefault();
    saveToDatabase();

  };

  const changeColor = (event: any) => {
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
      <label>
      <HexColorPicker color={color} onChange={changeColor} />
      {name} Hex Value: #
      <HexColorInput color={color} onChange={changeColor} name={name}/>
      </label>
    <SaveButton save={saveColor} />
    </form>
  );
};
export default ColorPicker;
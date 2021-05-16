import axios from 'axios';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useContext } from 'react'; 
import { UserContext } from '../hooks/UserContext';  

const ColorPicker = (props: { color: string; setColor: (color: string) => void; name: string;}) => {
  const { color, setColor, name } = props
  const { userRef, setUser } = useContext(UserContext);   
  const user = userRef.current;
  const convertedName = name.toLowerCase() + '_hex';

  const saveColor = (event: any) => {
    event.preventDefault();
    saveToDatabase(color);

  };

  const changeColor = (event: any) => {
    setColor(event)
    setUser({...user, [convertedName]: event});
  };

  const saveToDatabase = (color: string) => {
    axios.post(`/api/users/${user.id}`, {
      params: {
      [convertedName]: color
      }
    })
  };

  return (
    <form onSubmit={saveColor}>
  <label>
    {name} Hex Value:
      <HexColorPicker color={color} onChange={changeColor} />
      <HexColorInput color={color} onChange={changeColor} name={name}/>
  </label>
  <input type="submit" name="save-color"value="Save" />
</form>
  );
};
export default ColorPicker;
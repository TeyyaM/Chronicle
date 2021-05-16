import { HexColorPicker } from 'react-colorful';
import { useContext, useState } from 'react'; 
import { UserContext } from '../hooks/UserContext';  


export default function Settings() {
  // const history = useHistory();
  // const [isLoading, setIsLoading] = useState(false);
  const { userRef } = useContext(UserContext);   
  const user = userRef.current;
  const [background, setBackground] = useState('#76c2f5');
  const [secondary, setSecondary] = useState('#0B3C5D');
  const [accent, setAccent] = useState('#ebb30e');
  const [text, setText] = useState('#fafafa');
  const [title, setTitle] = useState('#1D2731');
  console.log(user)


  return (
    <div className="Settings">
      <HexColorPicker color={background} onChange={setBackground} />
      <HexColorPicker color={secondary} onChange={setSecondary} />
      <HexColorPicker color={accent} onChange={setAccent} />
      <HexColorPicker color={text} onChange={setText} />
      <HexColorPicker color={title} onChange={setTitle} />
    </div>
  );
}
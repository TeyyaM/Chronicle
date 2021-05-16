import ColorPicker from './ColorPicker';
import { useState, useContext, useEffect } from 'react'; 
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

  useEffect (() => {
    if (user) {
      setBackground(user.background_hex);
      setSecondary(user.secondary_hex);
      setAccent(user.accent_hex);
      setText(user.text_hex);
      setTitle(user.title_hex);
    }
    // there's never a user id without a user
    // eslint-disable-next-line
  }, [user.id])

  return (
    <div className="Settings">
      <ColorPicker color={background} 
        setColor={setBackground}
        name="Background" />
      <ColorPicker color={secondary}
        setColor={setSecondary} 
        name="Secondary" />
      <ColorPicker color={accent}
        setColor={setAccent}
        name="Accent" />
      <ColorPicker color={text}
        setColor={setText}
        name="Text" />
      <ColorPicker color={title}
        setColor={setTitle} 
        name="Title" />
    </div>
  );
}
import ColorPicker from './ColorPicker';
import { useState, useContext, useEffect } from 'react'; 
import { UserContext } from '../hooks/UserContext';  


export default function Settings() {
  // const history = useHistory();
  const { userRef } = useContext(UserContext);   
  const user = userRef.current;
  const [background, setBackground] = useState('#76c2f5');
  const [secondary, setSecondary] = useState('#0B3C5D');
  const [accent, setAccent] = useState('#ebb30e');
  const [text, setText] = useState('#fafafa');
  const [form, setForm] = useState('#1D2731');
  const [button, setButton] = useState('#d80c2a');
  const [dangerButton, setDangerButton] = useState('#d80c2a');

  useEffect (() => {
    if (user) {
      setBackground(user.background_hex);
      setSecondary(user.secondary_hex);
      setAccent(user.accent_hex);
      setText(user.text_hex);
      setForm(user.form_hex);
      setButton(user.button_hex);
      setDangerButton(user.danger_button_hex);
    }
    // there's never a user id without a user
    // eslint-disable-next-line
  }, [user.id])

  return (
    <div className="Settings">

      <div>
        <ColorPicker color={background}
          setColor={setBackground}
          name="Background" />
        <ColorPicker color={text}
          setColor={setText}
          name="Text" />
      </div>
      <div>
        <ColorPicker color={secondary}
          setColor={setSecondary}
          name="Secondary" />
        <ColorPicker color={accent}
          setColor={setAccent}
          name="Accent" />
      </div>

      <div>
      <ColorPicker color={button}
        setColor={setButton} 
        name="Button" />
      <ColorPicker color={dangerButton}
        setColor={setDangerButton} 
        name="Danger Button" />
      </div>

      <div style={{marginBottom: "15px"}}>
      <ColorPicker color={form}
        setColor={setForm} 
        name="Form" />
      </div>
    </div>
  );
}
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';



export default function Settings() {
  // const history = useHistory();
  // const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState('#aabbcc');

  return (
    <div className="Settings">
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
}
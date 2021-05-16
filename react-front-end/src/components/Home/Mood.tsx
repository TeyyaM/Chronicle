import Box from '@material-ui/core/Box';
import { smiley, mild, neutral, unhappy, angry } from '../emojis'

const moodStyling = {
    
    height: 40,
    margin: "auto",
    display:'flex', 
    justifyContent: 'center',
    listStyle: 'none', 
    width: '100%'
};
  
export default function Mood(props) {

  const { mood, setMood } = props;

  function clickHandler(index) {
    setMood(index);
  }

  const emojiArr = [
    { src: angry,
    name: 'Very Unhappy' },
    { src: unhappy,
      name: 'Unhappy' },
    { src: neutral,
      name: 'Neutral' },
    { src: mild,
      name: 'Happy' },
    { src: smiley,
      name: 'Very Happy' }
    ];

  // The user can select an emoji as their mood
  const emojiList = emojiArr.map((emoji, index) => {  
    return (
      <li 
      key={index}  
      onClick={() => clickHandler(index)}
      style={mood === (index) ? {opacity: 1} : {opacity: 0.4}}>
        <img src={emoji.src} alt={emoji.name}/>
      </li>
    )})
    
  return (
    <Box>
      <ul style={moodStyling}>
        {emojiList}
      </ul>
    </Box>
    
  )
}


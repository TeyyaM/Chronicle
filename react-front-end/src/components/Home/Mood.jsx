import { makeStyles } from '@material-ui/core/styles';
import useContentData from '../../hooks/useContentData'

import Box from '@material-ui/core/Box';
import smiley from '../../imgs/smiley.ico';
import mild from '../../imgs/mildly_happy.ico';
import neutral from '../../imgs/neutral.ico';
import unhappy from '../../imgs/unhappy.ico';
import angry from '../../imgs/angry.ico';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    borderRadius: 3,
    height: 40,
    margin: "auto"
  },
  ol: { 
    display:'flex', 
    flexDirection: 'row', 
    'list-style': 'none', 
    width: 100
  }
}));

export default function Mood() {
  const classes = useStyles();

  const { setState } = useContentData();

  function clickHandler(index) {
    setState(prev => ({...prev, mood: index}))
  }

  const emojiArr = [angry, unhappy, neutral, mild, smiley];
  const emojiList = emojiArr.map((item, index) => {  
    return (
      <li 
      key={index}  
      onClick={() => clickHandler(index + 1)}>
        <img src={item} alt={item.toString()}/>
        </li>
    )})

  return (
    <Box className={classes.root}>
      <ul className={classes.ol}>
        {emojiList}
      </ul>
    </Box>
    
  )
}


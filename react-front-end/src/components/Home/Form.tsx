// to resolve error "Expected an assignment or function call and instead saw an expression"
/* eslint-disable */

import useContentData from '../../hooks/useContentData';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    background: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: 300,
    padding: '0 30px',
    margin: theme.spacing(1),
  }
}));

export default function Form() {

  const classes = useStyles();

  const { state, setState, submitContent } = useContentData();

  function submitHandler(event) {
    event.preventDefault();
    console.log("form was submitted");
    submitContent();
  }

  function titleHandler(event) {
    setState(prev => ({...prev, title: event.target.value}))
  };

  function contentHandler(event) {
    setState(prev => ({...prev, content: event.target.value}))
  };
 
  return (
    <form id="entry_form" className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>
      <Box
        width="100%"
        display="flex" 
        flexDirection="column"
        bgcolor="background.paper">

        <TextField 
          id="outlined-basic" 
          margin="normal"
          label="Title" 
          variant="outlined" 
          fullWidth
          value={state.title}
          onInput={titleHandler}
          />

        <TextField 
          id="outlined-basic" 
          multiline
          rows="10"
          label="Whats on your mind?" 
          variant="outlined" 
          fullWidth
          value={state.content}
          onInput={contentHandler}
          />

        <Button 
        variant="contained" 
        color="primary"
        type="submit" >
          Submit
        </Button>
      </Box>
    </form>
    
  );
}


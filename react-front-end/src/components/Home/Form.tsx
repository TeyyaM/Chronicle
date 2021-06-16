// to resolve error "Expected an assignment or function call and instead saw an expression"
/* eslint-disable */
import { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const formStyling = {
  display: 'flex',
  background: 'white',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'black',
  height: 347,
  width: '90%',
  padding: 10,
  margin: 'auto',
};

// const textFieldStyling = {
//   background: 'red',
// };


export default function Form(props) {
  const history = useHistory();
  const { entry, setEntry, submitContent } = props;
  const { userRef } = useContext(UserContext);
  const user = userRef.current;
  
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
          backgroundColor: 'grey',
        },
      },
      textFieldColors: {
        color: 'red',
        backgroundColor: 'white',
      }
    }),
  );
  const classes = useStyles();

  function submitHandler(event) {
    event.preventDefault();
    submitContent(user.id);
    return history.push('/entries');
  }

  function titleHandler(event) {
    setEntry(prev => ({ ...prev, title: event.target.value }))
  };

  function contentHandler(event) {
    setEntry((prev) => ({ ...prev, content: event.target.value }))
  };

  return (
    <form style={formStyling} noValidate autoComplete="off" onSubmit={submitHandler}>
      <Box
        width="100%"
        height="90%"
        display="flex"
        flexDirection="column"
        bgcolor={user ? user.form_hex : '#fffbc8'}>

        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          fullWidth
          value={entry.title}
          onInput={titleHandler}
          InputProps={{
            classes: { root: classes.textFieldColors },
          }}
          />

        <TextField
          id="outlined-basic"
          margin="normal"
          multiline
          rows="10"
          label="Whats on your mind?"
          variant="outlined"
          fullWidth
          value={entry.content}
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


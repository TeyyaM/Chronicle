// to resolve error "Expected an assignment or function call and instead saw an expression"
/* eslint-disable */
import { Dispatch, SetStateAction, useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';



// const textFieldStyling = {
//   background: 'red',
// };

interface IEntry {
  title: string;
  content: string;
  privacy: boolean;
  category: number | null;
}

export default function Form(props: { entry: IEntry, setEntry: Dispatch<SetStateAction<IEntry>>, submitContent: (userId: string | number) => void }) {
  const history = useHistory();
  const { entry, setEntry, submitContent } = props;
  const { userRef } = useContext(UserContext);
  const user = userRef.current;

  const formStyling = {
    display: 'flex',
    background: user ? user.secondary_hex : 'rebeccapurple',
    border: 0,
    borderRadius: 3,
    boxShadow: `1px 1px 1px 1px ${user ? user.secondary_hex : 'rebeccapurple'}`,
    color: 'black',
    height: 347,
    width: '90%',
    padding: 10,
    margin: 'auto',
  };
  
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
        color: user ? user.text_hex : '#000000',
        backgroundColor: user ? user.form_hex : '#fffbc8',
      },
    }),
  );


  const classes = useStyles();
  const placeholder= {
    color: user ? user.text_hex : '#000000'
  }

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
        >

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
          InputLabelProps={{
            style: placeholder }}

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
          InputProps={{
            classes: { root: classes.textFieldColors },
          }}
          InputLabelProps={{
            style: placeholder }}
          />

        <Box marginTop="1%" width="100%">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit" >
            Submit
          </Button>
        </Box>
      </Box>
    </form>

  );
}


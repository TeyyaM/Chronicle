import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';

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


interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export default function LoginForm() {
  const classes = useStyles();
  const [error, setError] = useState<boolean>(false);
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    showPassword: false,
  });

  console.log("This is just to stop errors", setError);

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = values;
    axios.get('/api/users', { params: { username, password } })
    .then((res) => {
      console.log(res.data[0]);
      // setUser(res.data[0]);
      // history.push('/');
    })
    .catch(err => console.log('ERROR: ', err))
    console.log("This is from the submit", { username, password })
  };

  return (
    <form 
      style={{backgroundColor: "grey"}}
      onSubmit={handleSubmit} 
      className={classes.root} 
      noValidate 
      autoComplete="off">
      <div>
        <TextField 
          required
          error={error}
          id="outlined-required" 
          label="Username" 
          variant="outlined" 
          helperText={error ? "Incorrect Username or Password" : ""}
          onChange={handleChange('username')}
          InputProps={{
            classes: { root: classes.textFieldColors },
          }}
        />
        <TextField
          required
          error={error}
          id="outlined-password-input"
          label="Password"
          // Shows password text when visibility is toggled to 'true'
          type={values.showPassword ? "" : "password"}
          helperText={error ? "Incorrect Username or Password" : ""}
          variant="outlined"
          onChange={handleChange('password')}
          InputProps={{
            classes: { root: classes.textFieldColors },
            endAdornment:
              <InputAdornment position="end">
              <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
              </InputAdornment>
          }}
        />
        <Button 
          type="submit" 
          fullWidth 
          variant="contained"
          color="primary"
          className="submit"
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}
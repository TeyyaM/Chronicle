import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
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

  console.log(setError);

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField 
          required
          error={error}
          id="outlined-required" 
          label="Username" 
          variant="outlined" 
          helperText={error ? "Incorrect Username or Password" : ""}
          onChange={handleChange('username')}
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
      </div>
    </form>
  );
}
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';


export default function CircularIntegration(props: { color: string, save: (event: any) => void; }) {
  
  const { userRef } = useContext(UserContext);
  const user = userRef.current;

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    buttonSuccess: {
      backgroundColor: user ? user.button_hex : '#ffffff',
      '&:hover': {
        backgroundColor: user ? user.accent_hex : '#FFFF00',
      },
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  useEffect(() => {
    setSuccess(false);
  }, [props.color]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = (event) => {

    props.save(event);
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className={classes.root}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Save
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
}
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function TextButtons(props) {
  const classes = useStyles();
  const { color, text } = props;

  return (
    <div className={classes.root}>
      <Button color={color}>{text}</Button>
    </div>
  );
}
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

interface IThemeProps{
  children:any;
}

export default function Theme(props: IThemeProps) {

  // Get the user data, if there is any
  const { userRef } = useContext(UserContext);
  const user = userRef.current;

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: user ? user.button_hex : '#ffffff', //white
        contrastText: user ? user.text_hex : '#000000', //black
        // background color when hovered over
        dark: user ? user.accent_hex : '#FFFF00', //yellow
      },
      secondary: {
        main: user ? user.danger_hex : '#d80c2a', //white
        contrastText: user ? user.text_hex : '#000000', //black
        dark: user ? user.accent_hex : '#FFFF00', //yellow
      },
    },
    // Color prop being primary or secondary will overrride this
    // Use if we ever need anything beyond Primary and Secondary colours
    // overrides:{
    //   MuiButton:{
    //     contained:{
    //       color: '#000000', //black
    //       backgroundColor: '#c40000', //red
    //       '&:hover': {
    //         backgroundColor: '#000000', //black
    //       //   // Reset on touch devices, it doesn't add specificity
    //       //   '@media (hover: none)': {
    //       //     backgroundColor: '#c40000', //red
    //       //   },
    //       }
    //     }
    //   }
    // }
  });

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
}
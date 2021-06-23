import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#f58414', //orange
//       contrastText: '#c40000', //red
//     },
//     secondary: {
//       main: '#ffffff', //orange
//       contrastText: '#c40000', //red
//     },
//   },
//   // Color prop being primary or secondary will overrride this
//   overrides:{
//     MuiButton:{
//       contained:{
//         color: '#000000', //black
//         backgroundColor: '#c40000', //red
//         '&:hover': {
//           backgroundColor: '#000000', //black
//         //   // Reset on touch devices, it doesn't add specificity
//         //   '@media (hover: none)': {
//         //     backgroundColor: '#c40000', //red
//         //   },
//         }
//       }
//     }
//   }
// });
// interface IThemeProps{
//   children:any;
// }
interface IThemeProps{
  children:any;
}
export default function Theme(props: IThemeProps) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f58414', //orange
        contrastText: '#c40000', //red
      },
      secondary: {
        main: '#ffffff', //orange
        contrastText: '#c40000', //red
      },
    },
    // Color prop being primary or secondary will overrride this
    overrides:{
      MuiButton:{
        contained:{
          color: '#000000', //black
          backgroundColor: '#c40000', //red
          '&:hover': {
            backgroundColor: '#000000', //black
          //   // Reset on touch devices, it doesn't add specificity
          //   '@media (hover: none)': {
          //     backgroundColor: '#c40000', //red
          //   },
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
}
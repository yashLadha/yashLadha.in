import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Roboto'],
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#e91e63',
      accentColor: '#f48fb1',
      darkAccentColor: '#c2185b',
    },
  },
});

export default theme;

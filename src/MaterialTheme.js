import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Source Code Pro'],
  },
  palette: {
    type: 'light',
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#e91e63',
      accentColor: '#f48fb1',
      darkAccentColor: '#c2185b',
    },
  },
})

export default theme

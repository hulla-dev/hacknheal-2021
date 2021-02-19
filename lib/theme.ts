import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// Create a theme instance.
const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      main: '#00408b',
    },
    secondary: {
      main: '#98c000',
    },
    background: {
      default: '#fff',
    },
  },
}))

export default theme
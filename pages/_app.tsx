import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../lib/theme'
import '../styles/styles.css'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  
  // Server-side inject css clean-up
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
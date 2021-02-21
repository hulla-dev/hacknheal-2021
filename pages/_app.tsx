import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import ResolutionMaintainer from '../components/ResolutionMaintainer'
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

  // make-shift, obviously would query and update DB in real implementation
  const [api, setApi] = useState(null)
  const [unsupported, setUnsupported] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <ResolutionMaintainer setUnsupported={setUnsupported}>
          <Component unsupported={unsupported} api={api} setApi={setApi} {...pageProps} />
        </ResolutionMaintainer>
    </ThemeProvider>
  )
}

export default App
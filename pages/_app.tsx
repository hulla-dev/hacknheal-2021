import { NextComponentType, NextPageContext } from 'next'
import { AppProps } from 'next/app'


const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Component {...pageProps} />
) 

export default App
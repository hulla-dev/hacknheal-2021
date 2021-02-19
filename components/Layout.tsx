import Head from 'next/head'
import { ReactChild } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type Props = {
  children: ReactChild
}

const Layout = ({ children }: Props): JSX.Element => (
  <div>
    <Head>
      <meta
        name="description"
        content="Hacknheal Project Submission"
      />
      <meta
        name="author"
        content="Samuel Hulla"
      />
    </Head>
    <Navbar />
    {children}
    <Footer />
  </div>
)

export default Layout

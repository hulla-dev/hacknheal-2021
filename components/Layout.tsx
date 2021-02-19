import Head from 'next/head'
import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type Props = {
  children: ReactNode
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
      <meta
        name="description"
        content="Hero banner credits:
        https://www.freepik.com/vectors/people'>People vector created by rawpixel.com - www.freepik.com"
      />
    </Head>
    <Navbar />
    {children}
    <Footer />
  </div>
)

export default Layout

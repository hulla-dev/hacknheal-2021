import Head from 'next/head'
import { ReactChild } from 'react'

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
    {children}
  </div>
)

export default Layout

import Image from 'next/image'
import { Box, Button } from '@material-ui/core'
import Link from './Link'

const Navbar = (): JSX.Element => (
  <Box display="flex" alignItems="center" justifyContent="space-between" p={2} width="100%">
    <Image src="/images/logo.png" alt="Company logo" width={400} height={50} />
    <Box mr={2}>
      <Button><Link href="https://www.richtergedeon.cz/" text="Home" /></Button>
      <Button><Link href="/about-us" text="About us" /></Button>
      <Button><Link href="/contact" text="Contact" /></Button>
    </Box>
  </Box>
)


export default Navbar
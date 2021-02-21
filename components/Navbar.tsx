import Image from 'next/image'
import { Box, Button, Grid } from '@material-ui/core'
import { makeStyles } from  '@material-ui/core/styles'
import Link from './Link'

const useStyles = makeStyles({
  nav: {
    margin: '1rem 5rem'
  }
})

const Navbar = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.nav}>
      <Box>
        <Image src="/images/logo.png" alt="Company logo" width={400} height={70} />
      </Box>
      <Box width={400} mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Button><Link href="https://www.richtergedeon.cz/" text="Home" /></Button>
          </Grid>
          <Grid item xs={4}>
            <Button><Link href="/about-us" text="About us" /></Button>
          </Grid>
          <Grid item xs={4}>
            <Button><Link href="/contact" text="Contact" /></Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Button size="large" variant="outlined" color="primary">
          <Link href="/tool" text="Diagnostic Tool" />
        </Button>
      </Box>
    </Box>
  )
}


export default Navbar
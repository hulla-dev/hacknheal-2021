import { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  children: ReactNode,
}

const useStyles = makeStyles(theme => ({
  main: {
    background: theme.palette.primary.main,
    width: '100vw',
    height: '100vh',
    padding: 40,
    color: theme.palette.background.default,
  }
}))

const ResolutionMaintainer = ({children }: Props): JSX.Element => {

  const min = 1500
  const max = 3000
  const [width, setWidth] = useState<number>(0)
  const [didMount, setDidMount] = useState(false)
  const [didAgree, setDidAgree] = useState(false)
  const classes = useStyles()

  useEffect(
    () => {
      const onResize = () => setWidth(window?.innerWidth)
      window.addEventListener('resize', onResize)
      onResize()
      setDidMount(true)
      return () => window.removeEventListener('resize', onResize)
    }, []
  )

  if (!didAgree && (width < min || width > max)) {
    if (!didMount) {
      return <Container><CircularProgress color="primary" /></Container>
    }
    return (
      <Box display="flex" alignItems="center" justifyContent="center" className={classes.main}>
        <Box>
        <Grid container spacing={9} alignItems="center">
          <Grid item container xs={6} spacing={6}>
            <Grid item xs={12}>
              <Typography variant="h3">
                This project does not (fully) deal with responsivity
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                While it is built in majority with Grid Layout, given this &nbsp;
                <strong>is a one man project built in 2 days</strong> &nbsp;
                I did not have the time to fully optimize (or even deal with)
                responsive design. Obviously if the project got picked up
                this would be the number one priority, but for now
                I had to focus on getting a working prototype out of the door
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Please change your screen window size for optimal experience</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={5} xs={6}>
            <Grid item xs={12}>
              <Typography variant="h5">Thank you for your understanding</Typography>
            </Grid>
            <Grid item xs={12} > 
             <Image src="/images/hacknheal-logo.svg" alt="Hacknheal logo" width={400} height={100} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                The site will automatically unlock if you change to supported screen size
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Or alternatively you can continue at your own risk with unsupported resolution</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setDidAgree(true)}>
                Continue with unsupported resolution 
              </Button>
            </Grid>
          </Grid>
        </Grid>
        </Box>
      </Box>
    )
  }

  return (
    <>
     {children}
    </>
  )

}

export default ResolutionMaintainer
import { useRef } from 'react'
import Image from 'next/image'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from  '@material-ui/core/styles'
import { ExpandMore as ExpandMoreIcon } from  '@material-ui/icons'
import { Fade } from 'react-awesome-reveal'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Trail from '../components/animations/Trail'
import Parallax from '../components/animations/Parallax'
import { scrollToRef } from '../lib/animations'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: '4rem',
    fontWeight: 'bold',
  },
  stepOne: {
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
    marginBottom: '20rem',
  }
}))

const parallaxItems = [
  <Image key="hospital" src="/images/hospital.png" alt="Hospital" height={400} width={400} />,
  <Image key="hacknheal" src="/images/hacknheal-logo.svg" alt="hacknheal" height={200} width={200} />,
  <Image key="logo" src="/images/logo.png" alt="logo" height={100} width={300} />,
]

const Home = (): JSX.Element => {
  const classes = useStyles()
  const productRef = useRef(null)


  return (
    <Layout>
      <Section>
        <Box height="75vh">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box py={5}>
                <Trail open>
                  <Typography className={classes.heading} variant="h1">Ever wondered</Typography>
                  <Typography className={classes.heading} variant="h1">{"what it's like to have"}</Typography>
                  <Typography className={classes.heading} variant="h1">to have superpowers?</Typography>
                </Trail>
                <Box mt={5}>
                  <Typography variant="h5">
                    With our help you can get an instant diagnosis tool,
                    you will get the benefits of early treatment or even prevention
                  </Typography>
                </Box>
                <Box mt={5}>
                  <Button
                    size="large"
                    variant="outlined"
                    color="secondary"
                    startIcon={<ExpandMoreIcon />}
                    onClick={() => scrollToRef(productRef)}>
                      {"I'm interested"}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Image src="/images/hero.jpg" alt="Hero banner" height={500} width={600} />
            </Grid>
          </Grid>
        </Box>
      </Section>
      <Fade>
        <Box className={classes.stepOne}>
          <Section>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h3">Get to know our diagnostics tool!</Typography>
              </Grid>
              <Grid item xs={6}>
                Or dont
              </Grid>
            </Grid>
          </Section>
        </Box>
      </Fade>
      <Section>
        <div ref={productRef}>
          <Parallax items={parallaxItems} />
        </div>
      </Section>
    </Layout>
  )
}

export default Home

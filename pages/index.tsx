import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Button, Grid, Tab, Tabs, Typography } from '@material-ui/core'
import { makeStyles } from  '@material-ui/core/styles'
import { ExpandMore as ExpandMoreIcon } from  '@material-ui/icons'
import { Fade } from 'react-awesome-reveal'
import Layout from '../components/Layout'
import Section from '../components/Section'
import TabPanel from '../components/TabPanel'
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
    height: '100vh'
  }
}))

const parallaxItems = [
  <Image key="hospital" src="/images/hospital.png" alt="Hospital" height={400} width={400} />,
  <Image key="hacknheal" src="/images/hacknheal-logo.svg" alt="hacknheal" height={200} width={200} />,
  <Image key="logo" src="/images/logo.png" alt="logo" height={100} width={300} />,
]

const slides = parallaxItems

const Home = (): JSX.Element => {
  const classes = useStyles()
  const productRef = useRef(null)
  const [tab, setTab] = useState(0)

  const onTabChange = (_event: ChangeEvent<HTMLButtonElement>, value: number) => setTab(value)

  useEffect(() => {
    const updateSlide = setInterval(() => setTab(prevTab => prevTab === slides.length - 1 ? 0 : prevTab + 1), 5000)
    return () => clearInterval(updateSlide)
  })

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
                <Typography variant="h2">Get to know our diagnostics tool!</Typography>
                <Box mt={5}>
                  <Typography variant="h5">
                   In just a few minutes we can provide you with instant results,
                   preventions and treatment that will help you live a longer and happier life!
                  </Typography>
                </Box>
                <Box width={300} my={20}>
                  <Tabs
                    orientation="vertical"
                    value={tab}
                    onChange={onTabChange}>
                      <Tab label="Get a quick diagnosis" />
                      <Tab label="Consult the results" />
                      <Tab label="Keep track of risks" />
                  </Tabs>
                </Box>
              </Grid>
              <Grid item xs={6}>
               {slides.map((slide, index) => (
                 <TabPanel value={tab} key={index} index={index}>
                   {slide}
                 </TabPanel>
               ))}
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

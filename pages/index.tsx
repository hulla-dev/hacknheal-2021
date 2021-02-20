import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Button, Grid, Tab, Tabs, Typography } from '@material-ui/core'
import { makeStyles } from  '@material-ui/core/styles'
import { ExpandMore as ExpandMoreIcon } from  '@material-ui/icons'
import { Bounce, Fade, Slide, Zoom } from 'react-awesome-reveal'
import Layout from '../components/Layout'
import Section from '../components/Section'
import TabPanel from '../components/TabPanel'
import Link from '../components/Link'
import Testimony from '../components/Testimony'
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
  },
  testimonyHeader: {
    textAlign: 'center',
  },
  stepTwo: {
    background: theme.palette.secondary.main,
    color: theme.palette.background.default,
    height: '100vh',
  },
  stepThree: {
    height: '100vh',
  },
  button: {
    width: 500,
    height: 50,
  },
  modal: {
    width: '60%',
    height: '80%',
    background: theme.palette.background.paper, 
  }
}))

const parallaxItems = [
  <Image key="hospital" src="/images/heart.jpg" alt="Hospital" height={600} width={600} />,
  <Image key="cardio" src="/images/cardiogram.svg" alt="logo" height={100} width={100} />,
]

const testimonies = [
  <Testimony
    key="Testimony 1"
    src="/images/doctor-placeholder.jpg"
    alt="Testimony 1"
    from="Johnathan Doe, MD"
    companyText="Pharmacetic, Inc."
    heading="Absolutely amazing!"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nullam quam arcu, sodales eget lacus ut, faucibus imperdiet enim. Duis sed sem ligula"
  />,
  <Testimony
    key="Testimony2"
    src="/images/me.jpeg"
    alt="Testimony 2"
    from="Samuel Hulla"
    companyText="Freelance developer"
    heading="This was a blast!"
    text="I had a lot of fun developing this application. Considering it's a one man project made in 2 days
    I think it turned out better than I expected"
  />,
  <Testimony
    key="Testimony 3"
    src="/images/winona-ryder.jpg"
    alt="Testimony 1"
    from="Joyce Byers"
    companyText="Stay at home mom"
    heading="Saved my son's life"
    text="Helped me catch a rare disease my son had early and stopped it before it had a chance to spread"
  />,
]

const slides = [
  <Zoom key={0} delay={200}>
    <Box>
      <Box width={500} pb={10}>
        <Typography variant="h4">Instant evaluation of health risks</Typography>
        <Typography>
          We will help you catch early symptomps of preventable illnesses and offer instant treatment.
          This way you will never be caught offguard and may even increase your life expectancy
        </Typography>
      </Box>
      <Image src="/images/placeholder.png" alt="Placeholder" width={600} height={500} />
    </Box>
  </Zoom>,
  <Zoom cascade delay={200} key={1}>
    <Box>
      <Box width={500} pb={10}>
        <Typography variant="h4">We offer consultation</Typography>
        <Typography>
          Do you have any questions regarding your results?
          We can provide you with consultation and treatment recommendations
          to make sure you live a happy and healthy life!
        </Typography>
      </Box>
      <Image src="/images/placeholder.png" alt="Placeholder" width={600} height={500} />
    </Box>
  </Zoom>,
  <Zoom delay={200} key={0}>
    <Box>
      <Box width={500} pb={10}>
        <Typography variant="h4">Track your progress</Typography>
        <Typography>
          We will help you catch early symptomps of preventable illnesses and offer instant treatment.
          This way you will never be caught offguard and may even increase your life expectancy
        </Typography>
      </Box>
      <Image src="/images/placeholder.png" alt="Placeholder" width={600} height={500} />
    </Box>
  </Zoom>,
]

const Home = (): JSX.Element => {
  const classes = useStyles()
  const productRef = useRef(null)
  const [tab, setTab] = useState(0)

  const onTabChange = (_event: ChangeEvent<HTMLButtonElement>, value: number) => setTab(value)

  useEffect(() => {
    const updateSlide = setInterval(() => setTab(prevTab => prevTab === slides.length  - 1 ? 0 : prevTab + 1), 5000)
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
              <Fade>
                <Parallax
                  items={[<Image key="hero" src="/images/hero.jpg" alt="Hero banner" height={500} width={600} />]}
                />
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Section>
      <Fade>
        <div className={classes.stepOne}>
          <Section>
            <Grid container spacing={2} ref={productRef}>
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
        </div>
      </Fade>
      <Box className={classes.stepThree}>
        <Section>
          <Grid container spacing={5}>
            <Grid item container xs={6}>
              <Grid item xs={12}>
                <Fade>
                  <Typography variant="h2">Sounds interesting?</Typography>
                  <Typography variant="h2">Give it a try!</Typography>
                </Fade>
              </Grid>
              <Grid item xs={12}>
                <Fade>
                  <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum purus leo,
                    <b>in vestibulum orci accumsan a. Nam ac nunc purus</b>.
                    In vehicula aliquam nunc, sit amet iaculis tellus tristique sed.
                    Fusce eget erat ante. Proin tellus metus, pretium sit amet pharetra vel, aliquet ut nunc.
                    Integer quis fringilla metus.
                    <b>Nam et condimentum purus, vitae malesuada turpis. 
                      Phasellus a ligula risus. Vivamus blandit fermentum convallis.</b> 
                    Donec rhoncus eros sit amet sem tempus, nec volutpat magna tincidunt. 
                    Donec imperdiet vitae odio et ornare.
                  </Typography>
                </Fade>
              </Grid>
              <Grid item xs={12}>
                <Fade>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    size="large">
                    <Link href="/tool" text="Start the diagnostic tool" />
                  </Button>
                </Fade>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Bounce>
                <Parallax items={parallaxItems} />
              </Bounce>
            </Grid>
          </Grid>
        </Section>
      </Box>
      <Box className={classes.stepTwo}>
        <Section>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Fade duration={2000}>
                  <Typography  className={classes.testimonyHeader} variant="h2">
                    Read what others have to say about us
                  </Typography>
                </Fade>
              </Grid>
              <Grid item xs={12}>
                <Slide direction="right">
                  <Grid item xs={12} container spacing={4}>
                      {testimonies.map((testimony, index) => (
                        <Grid key={index} item xs={4}>
                          {testimony}
                        </Grid>
                      ))}
                  </Grid>
                </Slide>
              </Grid>
            </Grid>
        </Section>
      </Box>
    </Layout>
  )
}

export default Home

import Image from 'next/image'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
  Mail as MailIcon,
 } from '@material-ui/icons'
import Link from './Link'


const referrals: Array<{
  link: string,
  text: string,
  icon: JSX.Element,
 }> = [
  {
    link: 'https://www.instagram.com/samuel.hulla/',
    text: 'Instagram',
    icon: <InstagramIcon color="inherit" />,
  },
  {
    link: 'https://github.com/samuelhulla',
    text: 'Github',
    icon: <GitHubIcon color="inherit" />
  },
  {
    link: 'mailto:oficialny.hulla@gmail.com',
    text: 'E-Mail',
    icon: <MailIcon color="inherit" />
  }
]

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
    padding: '1rem 5rem',
  },
  bottomNav: {
    marginTop: '7rem',
  },
  refButton: {
    fontWeight: 'bold',
    margin: '0 1rem',
    color: theme.palette.background.default,
  }
}))

const Footer = (): JSX.Element => {
  const { palette } = useTheme()
  const classes = useStyles()
  return (
      <Grid className={classes.footer} container spacing={7}>
        <Grid item container xs={12}>
          <Grid item xs={5}>
            <Typography variant="h4">
              This is a submission prototype for the Hacknheal 2021 Hackathon!
              Interested in how I did it? 
            </Typography>
            <Box mt={4}>
              <Link href="https://github.com/samuelhulla/hacknheal-2020">
                <Button size="large" startIcon={<GitHubIcon />} variant="outlined" color="secondary">
                View on github
                </Button>
              </Link>
            </Box>
          </Grid>
          {/* @ts-ignore */}
          <Grid item xs={7} align="end">
            {/* Outdated @types on MUI Grid */}
            <Image src="/images/hacknheal-logo.svg" alt="Hacknheal logo" width={400} height={120} />
          </Grid>
        </Grid>
        <Grid  className={classes.bottomNav} item container xs={12}>
          <Grid item xs={4}>
            &copy; Copyright 2021 Samuel Hulla. All rights reserved
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="flex-end">
              {referrals.map(ref => (
                <Link key={ref.text} href={ref.link} text={ref.text}>
                  <Button className={classes.refButton} startIcon={ref.icon}>
                    {ref.text}
                  </Button>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
  )
}
  
export default Footer

import { Avatar, Box, Card, CardHeader, Typography } from '@material-ui/core'
import { makeStyles } from  '@material-ui/core/styles'

type Props = {
  src: string,
  alt: string,
  companyText: string,
  from: string,
  heading: string,
  text: string,
}

const useStyles = makeStyles(theme => ({
  testimony: {
    width: 350,
    height: 400,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  companyText: {
    color: theme.palette.text.secondary,
  },
  heading: {
    margin: '15px 0',
  }
}))

const Testimony = (props: Props): JSX.Element => {
  const { src, alt, heading, text, from, companyText } = props
  const classes = useStyles()

  return (
    <Card elevation={3} className={classes.testimony}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={3}>
        <CardHeader avatar={<Avatar className={classes.avatar} src={src} alt={alt} />} />
        <Typography><b>{from}</b></Typography>
        <Typography className={classes.companyText}>{companyText}</Typography>
        <Typography variant="h5" className={classes.heading}>{heading}</Typography>
        <Typography>{text}</Typography>
      </Box>
    </Card>
  )
}

export default Testimony
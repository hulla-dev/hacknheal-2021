import { Alert, AlertTitle } from '@material-ui/lab'
import { Grid, LinearProgress, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

type Props = {
  available: number,
  answered: number,
  title: string,
  accuracyColor: 'error' | 'warning' | 'success'
  text: string,
}

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 30,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);


const Info = withStyles({
  root: {
    width: 800,
    height: 180,
  }
})(Alert)

const AccuracyMeter = (props: Props): JSX.Element => {
  const { available, answered, title, text, accuracyColor } = props 
  // MUI Automatically presumes max is 100
  const ratio = (answered / available) * 100
  return (
    <Info severity={accuracyColor}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AlertTitle><Typography variant="h5">{title}</Typography></AlertTitle>
        </Grid>
        <Grid item xs={12}>
          <BorderLinearProgress value={ratio} variant="determinate" />
        </Grid>
        <Grid item xs={12}>
          <Typography>{text}</Typography>
        </Grid>
      </Grid>
    </Info>
  )
}

export default AccuracyMeter

import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, LinearProgress, Typography} from '@material-ui/core'
import { SentimentSatisfied, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@material-ui/icons'

type Props = {
  category: string,
  score: number,
  icon: JSX.Element,
  inconclusive: boolean,
}

const useStyles = makeStyles({
  inconclusive: {
    opacity: 0.3,
  }
})

const Bar = withStyles(theme => ({
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
}))(LinearProgress)


const Score = (props: Props): JSX.Element => {
  const { category, score, icon, inconclusive } = props
  const classes = useStyles()

  const getScoreEmoji = () => {
    if (score < 33) {
      return <SentimentVeryDissatisfied />
    } else if (score < 66) {
      return <SentimentSatisfied  />
    } else {
      return <SentimentVerySatisfied />
    }
  }

  return (
    // MUI Grid does not support className (outdated @types)
    // @ts-ignore
    <Grid item container xs={12} spacing={2} className={inconclusive && classes.inconclusive}>
      <Grid item xs={1}>
        {icon}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4">{category}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Bar variant="determinate" value={score} />
      </Grid>
      <Grid item xs={1}>
        {getScoreEmoji()}
      </Grid>
    </Grid>
  )
}

export default Score
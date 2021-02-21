import { withStyles } from '@material-ui/core/styles'
import { Grid, LinearProgress, Typography} from '@material-ui/core'
import { SentimentSatisfied, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@material-ui/icons'

type Props = {
  category: string,
  score: number,
  icon: JSX.Element
}

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
  const { category, score, icon } = props

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
    <Grid item container xs={12} spacing={2}>
      <Grid item xs={2}>
        {icon}
      </Grid>
      <Grid item xs={3}>
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
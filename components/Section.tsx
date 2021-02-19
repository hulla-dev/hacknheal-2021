import { Box } from '@material-ui/core'
import { makeStyles } from  '@material-ui/core/styles'
import { ReactNode } from  'react'


type Props = {
  children: ReactNode,
}

const useStyles = makeStyles({
  section: {
    padding: '5rem',
  }
})

const Section = ({ children }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.section}>
      {children}
    </Box>
  )
}

export default Section
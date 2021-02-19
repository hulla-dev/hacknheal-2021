import { default as NextLink } from 'next/link'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  text: string,
  href: string,
}

const useStyles = makeStyles(theme => ({
  link: {
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      color: theme.palette.text.primary,
    }
  }
}))

const Link = ({ href, text }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <NextLink href={href}>
      <a className={classes.link}>{text}</a>
    </NextLink>
  )
}

export default Link

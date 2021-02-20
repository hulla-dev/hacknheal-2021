import { default as NextLink } from 'next/link'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  text: string,
  href: string,
  color?: string,
}

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: (props: Props) => props.color ?? 'inherit',
    '&:active': {
      color: (props: Props) => props.color ?? 'inherit',
    }
  }
})

const Link = (props: Props): JSX.Element => {
  const { href, text } = props
  const classes = useStyles(props)

  return (
    <NextLink href={href}>
      <a className={classes.link}>{text}</a>
    </NextLink>
  )
}

export default Link

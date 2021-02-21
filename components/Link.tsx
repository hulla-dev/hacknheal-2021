import { default as NextLink } from 'next/link'
import { ReactNode } from  'react'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  text?: string,
  href: string,
  children?: ReactNode,
  color?: string,
  passHref?: boolean
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
  const { href, text, children, passHref = false } = props
  const classes = useStyles(props)

  return (
    <NextLink href={href} passHref={passHref}>
      { children 
        ? children
        : <a className={classes.link}>{text}</a>
      }
    </NextLink>
  )
}

export default Link

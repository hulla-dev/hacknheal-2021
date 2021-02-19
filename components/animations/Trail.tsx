import { Children, ReactNode } from 'react'
import { animated, interpolate, useTrail } from 'react-spring'

type Props = {
  children: ReactNode,
  open: boolean,
}

const Trail = ({ children, open = true }: Props): JSX.Element => {
  const trailingItems = Children.toArray(children)
  const trailAnimation = useTrail(trailingItems.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 70 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trailAnimation.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={index}
            className="trails-text"
            style={{ ...rest, transform: interpolate([x], iX => `translate3d(0,${iX}px,0)`) }}>
            <animated.div style={{ height }}>{trailingItems[index]}</animated.div>
          </animated.div>
        ))}
    </div>
  )
}

export default Trail

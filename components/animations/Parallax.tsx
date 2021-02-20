import { animated, useSpring } from 'react-spring'
import { ReactNodeArray } from 'react'
import { randomInInterval } from '../../lib/random'

type Props = {
  items: ReactNodeArray,
  deterministic?: boolean,
}

const mousePosCalc = (x: number, y: number) => [
  x - window.innerWidth / 2,
  y - window.innerHeight / 2,
]

const transitions = [
  (x: number, y: number) => `translate3d(${x / 10}px,${y / 10}px,0)`,
  (x: number, y: number) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`,
  (x: number, y: number) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`,
  (x: number, y: number) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`,
]


const Parallax = ({ items, deterministic = true }: Props): JSX.Element => {
  const [spring, setSpring] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))

  const createParallax = (isDeterministic: boolean, renderItems: ReactNodeArray) =>
    renderItems && renderItems.map((item, index) => {
      const randomAmount = randomInInterval(0, 255)
      const randomParallax = (x: number, y: number) => `translate3d(${x / randomAmount}px, ${y / randomAmount}px, 0)`
      const transition = isDeterministic
        ? index < transitions.length
          ? transitions[index]
          : randomParallax
        : randomParallax
      return (
        <animated.div
          key={index}
        style={{ transform: spring.xy.interpolate(transition as (params: unknown) => string)}}>
          {item}
        </animated.div>
      )
    })

  return (
    <div onMouseMove={({ clientX: x, clientY: y }) => setSpring({ xy: mousePosCalc(x, y)})}>
      {createParallax(deterministic, items)}
    </div>
  )
}

export default Parallax
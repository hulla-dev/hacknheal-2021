import { MutableRefObject } from 'react'

export const scrollToRef = (ref: MutableRefObject<Element | null>): void => {
  if (ref && ref.current) {
    ref.current.scrollIntoView()
  } else {
    console.error(`Unable to scroll to ref: ${ref}. Likely forgot to assign it as a prop`)
  }
}
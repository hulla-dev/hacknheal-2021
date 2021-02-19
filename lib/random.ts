/**
 * Generates a random number in a provided interval
 * @param min Minimal possible number (inclusive)
 * @param max Maximal possible number (inclusive)
 */
export const randomInInterval = (min: number, max: number): number => {
  const ceiledMin = Math.ceil(min)
  const flooredMax = Math.floor(max)
  return Math.floor(Math.random() * (flooredMax - ceiledMin + 1)) + ceiledMin
}
import { range, flatten } from 'lodash'

export let width = window.innerWidth
export let height = window.innerHeight

export let quarterWidth = width / 4

export let tiles = (x, y) => {
  let w = width / x
  let h = height / y
  return flatten(range(x).map(xx => range(y).map(yy => [xx * w, yy * h])))
}

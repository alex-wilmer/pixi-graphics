import Tone from 'tone'
import { range } from 'lodash'
import { diamond } from '../frames/diamond'
import { toHexNum } from '../utils/color'

export let diamondCluster = ({ numDiamonds, app, colorScale, time = 0 }) =>
  range(1, numDiamonds).forEach(x => {
    Tone.Draw.schedule(
      () =>
        diamond({
          app,
          w: x * 30,
          color: toHexNum(colorScale((1 / (numDiamonds - 1)) * x))
        }),
      (1 / (numDiamonds - 1)) * x + time
    )
  })

import * as PIXI from 'pixi.js'
// import { MotionBlurFilter } from 'pixi-filters'
import { ease } from 'pixi-ease'
import { width, height } from '../coords'

// let blur = new MotionBlurFilter([5, 5], 5, 0)

export let diamond = ({ app, color = 0xffffff, w = width / 4 }) => {
  let g = new PIXI.Graphics()
  let g1 = new PIXI.Graphics()
  app.stage.addChild(g)
  app.stage.addChild(g1)

  let coords = [width / 2 - w / 2, height / 2 - w / 2]

  let center = [width / 2, height / 2]

  let setShape = g => {
    g.lineStyle(2, color)

    g.drawRect(...coords, w, w)

    g.endFill()
    g.pivot.set(...center)
    g.position.set(...center)
    g.angle = 45
    g.scale.set(1)
  }

  let graphics = [g, g1]
  graphics.forEach(setShape)

  // g.filters = [blur]

  g.alpha = 1
  g1.alpha = 0

  let e = ease.add(g, { angle: 405 }, { duration: 500 })

  e.on('complete', () => {
    ease.add(g, { alpha: 0 }, { duration: 500 })
    ease.add(g1, { alpha: 1 }, { duration: 250 })
  })
}

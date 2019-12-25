import * as PIXI from 'pixi.js'
import { ease } from 'pixi-ease'
import { width, height, center } from '../utils/coords'

export let diamond = ({ app, color = 0xffffff, w = width / 4 }) => {
  let g = new PIXI.Graphics()
  app.stage.addChild(g)

  let coords = [width / 2 - w / 2, height / 2 - w / 2]

  let setShape = g => {
    g.lineStyle(2, color)
    g.drawRect(...coords, w, w)
    g.endFill()
    g.pivot.set(...center)
    g.position.set(...center)
    g.angle = 45
    g.scale.set(1)
  }

  let graphics = [g]
  graphics.forEach(setShape)

  g.alpha = 1

  let e = ease.add(g, { angle: 405 }, { duration: 500 })

  e.on('complete', () => {
    ease.add(g, { alpha: 0 }, { duration: 500 })
  })
}

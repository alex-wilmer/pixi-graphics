import * as PIXI from 'pixi.js'
import Tone from 'tone'
import { ease } from 'pixi-ease'
import { quarterWidth, height } from '../coords'

export let fadingredsq = (app, color = 0xe11466) => {
  let g = new PIXI.Graphics()
  app.stage.addChild(g)

  // eslint-disable-next-line no-unused-vars
  return new Tone.Loop(time => {
    let [, qs] = Tone.Transport.position.split(':')
    let q = +qs

    g.clear()
    g.beginFill(color)
    g.drawRect(0, 0, quarterWidth, height)
    g.endFill()

    g.alpha = 1
    ease.add(
      g,
      { alpha: 0, x: q * quarterWidth, y: 0, width: quarterWidth, height },
      { duration: 200 }
    )
  }, '8n')
}

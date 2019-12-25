import * as PIXI from 'pixi.js'
import Tone from 'tone'
import { ease } from 'pixi-ease'
import { width, height } from '../coords'

export let ks = (app, loopLength = '8n') => {
  let g = new PIXI.Graphics()
  app.stage.addChild(g)
  // eslint-disable-next-line no-unused-vars
  return new Tone.Loop(time => {
    g.clear()
    g.beginFill(0x3711c0)
    g.drawRect(0, 0, width, height)
    g.endFill()
    g.alpha = 1
    ease.add(g, { alpha: 0 }, { duration: 240 })
  }, loopLength)
}

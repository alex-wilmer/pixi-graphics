import { sample } from 'lodash'
import * as PIXI from 'pixi.js'
import Tone from 'tone'
import { ease } from 'pixi-ease'
import { width, height, tiles } from '../coords'

export let whitesq = (app, loopLength = '8n', color = 0xffffff) => {
  let g = new PIXI.Graphics()
  app.stage.addChild(g)
  let coords = tiles(4, 4)
  // eslint-disable-next-line no-unused-vars
  return new Tone.Loop(time => {
    g.clear()
    g.beginFill(color)
    g.drawRect(...sample(coords), width / 4, height / 4)
    g.endFill()
    g.alpha = 1
    ease.add(g, { alpha: 0 }, { duration: 240 })
  }, loopLength)
}

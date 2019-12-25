import { range } from 'lodash'
import Tone from 'tone'
import { scale } from 'chroma-js'
import * as PIXI from 'pixi.js'
import './index.css'
import beat from './song.wav'
import { width, height } from './coords'
// import { whitesq } from './loops/whitesquare'
// import { fadingredsq } from './loops/fadingredsquare'
// import { ks } from './loops/kicksnare'
import { diamond } from './frames/diamond'

let app = new PIXI.Application({
  width,
  height
})

Tone.Transport.bpm.value = 125

document.body.appendChild(app.view)

let text = new PIXI.Text('Loading...', {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 0xff1010,
  align: 'center'
})

text.anchor.set(0.5)
text.position.set(width / 2, height / 2)

app.stage.addChild(text)

let sampler = new Tone.Sampler(
  {
    C3: beat
  },
  () => {
    text.text = 'Click anywhere to play.'

    // eslint-disable-next-line no-unused-vars
    let playsong = new Tone.Loop(time => {
      sampler.triggerAttack('C3')
    }, '129:0:0')

    let sc = scale(['yellow', 'purple'])

    document.body.onclick = () => {
      text.text = ''
      // playsong.start(0)

      let toHexNum = v => parseInt(Number(`0x${v.hex().slice(1)}`), 10)

      range(1, 10).forEach(x => {
        console.log(toHexNum(sc((1 / 9) * x)))
      })

      let spawnDiamonds = num =>
        range(1, num).forEach(x => {
          Tone.Transport.schedule(
            () =>
              diamond({
                app,
                w: x * 30,
                color: toHexNum(sc((1 / (num - 1)) * x))
              }),
            (1 / (num - 1)) * x
          )
        })

      spawnDiamonds(10)

      // whitesq(app, '16n', 0x15053d).start(0.1)
      // whitesq(app, '16n', 0x053d33).start(0.1)
      // whitesq(app, '4n').start(0.1)

      // let x = () => ks(app, '2n').start(0.1)

      // fadingredsq(app).start(0)
      Tone.Transport.toggle()
    }
  }
).toMaster()

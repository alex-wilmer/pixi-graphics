import Tone from 'tone'
import { scale } from 'chroma-js'
import * as PIXI from 'pixi.js'
import './index.css'
import beat from './song.wav'
import bellFade from './bellfade.wav'
import { width, height } from './utils/coords'
// import { whitesq } from './loops/whitesquare'
// import { fadingredsq } from './loops/fadingredsquare'
// import { ks } from './loops/kicksnare'
import { diamondCluster } from './seq/diamondCluster'

let app = new PIXI.Application({
  width,
  height
})

export let getApp = () => app

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
    C3: bellFade
  },
  () => {
    text.text = 'Click anywhere to play.'

    // eslint-disable-next-line no-unused-vars
    let playsong = new Tone.Loop(time => {
      sampler.triggerAttack('C3')
    }, '4:0:0')

    document.body.onclick = () => {
      text.text = ''
      playsong.start(0)

      let dl = new Tone.Loop(time => {
        Tone.Draw.schedule(() => {
          diamondCluster({
            app,
            time,
            numDiamonds: 15,
            // colorScale: scale(['purple', 'yellow', 'pink'])
            colorScale: scale('Spectral')
          })
        }, time)
      }, '2:0:0')

      // diamondCluster({
      //   app,
      //   time: 0,
      //   numDiamonds: 15,
      //   // colorScale: scale(['purple', 'yellow', 'pink'])
      //   colorScale: scale('Spectral')
      // })

      dl.start(0)

      // whitesq(app, '16n', 0x15053d).start(0.1)
      // whitesq(app, '16n', 0x053d33).start(0.1)
      // whitesq(app, '4n').start(0.1)

      // let x = () => ks(app, '2n').start(0.1)

      // fadingredsq(app).start(0)
      Tone.Transport.toggle()
    }
  }
).toMaster()

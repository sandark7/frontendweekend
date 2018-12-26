import React, { Component } from 'react'
import TimecodeCSSModule from './timecode.module.css'
import { AudioContext } from './episode'
import moment from 'moment'

class Timecode extends Component {
  seek (context, time) {
    const audio = context.getAudioRef().current
    audio.currentTime = time
    audio.play()
    context.onTimecodeClick && context.onTimecodeClick()
  }

  render () {
    const { children } = this.props
    let [time] = children
    let [, hours, minutes, seconds] = time.match(/(\d?\d?):?(\d\d):(\d\d)/)
    time = moment.duration({ hours, minutes, seconds }).asSeconds()
    return (
      <AudioContext.Consumer>
        {getAudioRef => (
          <div className={[
            TimecodeCSSModule.timecode,
          ].join(' ')}
          onClick={() => this.seek(getAudioRef, time)}>
            {children}
          </div>
        )}
      </AudioContext.Consumer>
    )
  }
}

export default Timecode

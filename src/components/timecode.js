import React, { Component } from 'react'
import TimecodeCSSModule from './timecode.module.css'
import { AudioContext } from '../templates/episode'
import moment from 'moment'

class Timecode extends Component {
  seek (getAudioRef, time) {
    const audio = getAudioRef().current
    audio.currentTime = time
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

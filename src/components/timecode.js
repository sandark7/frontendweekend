import React, { Component } from 'react'
import TimecodeCSSModule from './timecode.module.css'
import { AudioContext } from './episode'

class Timecode extends Component {
  seek (context, sec) {
    const audio = context.getAudioRef().current
    audio.currentTime = sec
    audio.play()
    context.onTimecodeClick && context.onTimecodeClick()
  }

  render () {
    const { children, sec } = this.props
    return (
      <AudioContext.Consumer>
        {getAudioRef => (
          <div className={[
            TimecodeCSSModule.timecode,
            'test--timecode'
          ].join(' ')}
          onClick={() => this.seek(getAudioRef, sec)}>
            {children}
          </div>
        )}
      </AudioContext.Consumer>
    )
  }
}

export default Timecode

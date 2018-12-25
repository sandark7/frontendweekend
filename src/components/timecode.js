import React, { Component } from 'react'
import TimecodeCSSModule from './timecode.module.css'

class Timecode extends Component {
  seek (time) {
    // TODO
  }

  render () {
    const { children } = this.props
    const [time] = children
    // TODO convert time to sec
    return (
      <div className={[
        TimecodeCSSModule.timecode,
      ].join(' ')}
      onClick={() => this.seek(time)}>
        {children}
      </div>
    )
  }
}

export default Timecode

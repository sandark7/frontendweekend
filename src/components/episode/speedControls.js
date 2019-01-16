import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import EpisodeCSSModule from './episode.module.css'

export default class SpeedControls extends Component {
  static propTypes = {
    t: PropTypes.func,
    getAudioRef: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.getAudioRef = props.getAudioRef
  }

  setSpeed (speed) {
    const audio = this.getAudioRef().current
    audio.playbackRate = speed
  }

  render () {
    const { t } = this.props
    const SPEEDS = [
      { speed: 0.5, name: 'x05' },
      { speed: 1, name: 'x1' },
      { speed: 2, name: 'x2' },
    ]
    return <div
      className={ [
        EpisodeCSSModule.controls_wrapper,
        'test--controls_wrapper'
      ].join(' ') }>
      <h4
        className={ [
          EpisodeCSSModule.controls_title,
          'test--controls_title'
        ].join(' ') }>
        { t('controls_title_speed') }
      </h4>
      {SPEEDS.map(({ speed, name }) => (
        <span
          onClick={ () => this.setSpeed(speed) }
          className={ [
            EpisodeCSSModule.x_speed_control,
            `gtm--${ name }speed`,
            `test--${ name }speed`
          ].join(' ') }>
          { t(name + 'speed') }
        </span>
      ))}
    </div>
  }
}

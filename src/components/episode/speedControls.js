import React, { Component } from 'react'
import { string, number, func } from 'prop-types'
import EpisodeCSSModule from './episode.module.css'

export function SpeedControl ({ name, speed, title, setSpeed }) {
  return (
    <span
      onClick={ () => setSpeed(speed) }
      className={ [
        EpisodeCSSModule.x_speed_control,
        `gtm--${ name }speed`,
        `test--${ name }speed`
      ].join(' ') }>
      { title }
    </span>
  )
}

SpeedControl.propTypes = {
  name: string,
  title: string,
  speed: number,
  setSpeed: func,
}

export default class SpeedControls extends Component {
  static propTypes = {
    t: func,
    getAudioRef: func,
  }

  constructor (props) {
    super(props)
    this.SPEEDS = [
      { speed: 0.5, name: 'x05' },
      { speed: 1, name: 'x1' },
      { speed: 2, name: 'x2' },
    ]
    this.getAudioRef = props.getAudioRef
  }

  setSpeed (speed) {
    const audio = this.getAudioRef().current
    audio.playbackRate = speed
  }

  render () {
    const { t } = this.props
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
      {this.SPEEDS.map(({ speed, name }) => (
        <SpeedControl name={name} title={t(name + 'speed')} speed={speed}
          setSpeed={this.setSpeed.bind(this)} />
      ))}
    </div>
  }
}

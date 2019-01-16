import React from 'react'
import * as PropTypes from 'prop-types'
import EpisodeCSSModule from './episode.module.css'

export default function Audio ({ refEl, podcastUrl }) {
  return <audio
    ref={ refEl }
    className={ [
      EpisodeCSSModule.audio,
      'test--audio'
    ].join(' ') }
    src={ podcastUrl }
    controls>
  </audio>
}

Audio.propTypes = {
  refEl: PropTypes.any,
  podcastUrl: PropTypes.string
}

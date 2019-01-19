import React from 'react'
import * as PropTypes from 'prop-types'
import EpisodeCSSModule from './episode.module.css'
import EpisodeStats from '../episodeStats'

export default function StatsWrapper ({ t, downloadText, episode }) {
  return <div className={ [
    EpisodeCSSModule.stats_wrapper,
    'test--stats_wrapper'
  ].join(' ') }>
    <EpisodeStats
      episode={ episode }
      downloadText={ downloadText }
      t={ t }
    />
  </div>
}

StatsWrapper.propTypes = { episode: PropTypes.any }

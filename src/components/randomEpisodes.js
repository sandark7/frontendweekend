import React, { Component } from 'react'
import RandomEpisodesCSSModule from './randomEpisodes.module.css'
import EpisodeItem from './episodeItem'

class RandomEpisodes extends Component {
  render () {
    const {
      randomEpisodes,
      t,
    } = this.props
    return (
      <div
        className={[
          RandomEpisodesCSSModule.main_wrapper,
          'test--random_episode_main_wrapper',
        ].join(' ')}
      >
        <h3
          className={[
            RandomEpisodesCSSModule.random_episode_wrapper,
            'test--random_episode_wrapper',
          ].join(' ')}
        >{t('random_episode_title')}</h3>
        {randomEpisodes.map(({ node: episode }) => (
          <EpisodeItem
            key={episode.id}
            episode={episode}
            t={t}
          />
        ))}
      </div>
    )
  }
}

export default RandomEpisodes

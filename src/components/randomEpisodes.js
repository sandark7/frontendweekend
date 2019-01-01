import React, { Component } from 'react'
import { Link } from 'gatsby-plugin-i18next'
import RandomEpisodesCSSModule from './randomEpisodes.module.css'
import ArchiveCSSModule from '../pages/archive.module.css'
import EpisodeStats from './episodeStats'

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
          'test--random_episode_wrapper',
        ].join(' ')}
      >
        <h3
          className={[
            RandomEpisodesCSSModule.random_episode_wrapper,
            'test--random_episode_wrapper',
          ].join(' ')}
        >{t('random_episode_title')}</h3>
        {randomEpisodes.map(({ node: episode }) => (
          <div key={ episode.id }
            className={[
              RandomEpisodesCSSModule.random_episode_item
            ].join(' ')}
          >
            <Link
              to={ episode.fields.slug }
              className={ [
                ArchiveCSSModule.podcast_link,
                RandomEpisodesCSSModule.random_episode_link,
                'test--podcast_link'
              ].join(' ') }
            >
              <h3
                className={[
                  RandomEpisodesCSSModule.random_episode_title
                ].join(' ')}
              >
                { episode.frontmatter.title }
              </h3>
              <p
                className={[
                  RandomEpisodesCSSModule.random_episode_subtitle
                ].join(' ')}
              >{episode.frontmatter.subtitle}</p>
              <div className={ [
                RandomEpisodesCSSModule.random_episode_footer,
                'test--podcast_link'
              ].join(' ') }>
                <span
                  className={[
                    RandomEpisodesCSSModule.random_episode_btn
                  ].join(' ')}
                >
                  {t('random_episode_listen_cta')}
                </span>
                <EpisodeStats
                  {...episode.frontmatter}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

export default RandomEpisodes

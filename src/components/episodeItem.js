import React from 'react'
import EpisodeItemCSSModule from './episodeItem.module.css'
import { Link } from 'gatsby-plugin-i18next'
import EpisodeStats from './episodeStats'
import { func, any } from 'prop-types'

function EpisodeItemFooterWrapper ({ t, episode }) {
  return <div className={[
    EpisodeItemCSSModule.footer,
    'test--episode_footer'
  ].join(' ')}>
    <span className={[
      EpisodeItemCSSModule.listen_cta_btn,
      'test--episode_listen_cta_btn'
    ].join(' ')}>
      {t('episode_listen_cta')}
    </span>
    <EpisodeStats episode={episode} />
  </div>
}

EpisodeItemFooterWrapper.propTypes = {
  t: func, episode: any
}

const EpisodeItem = ({
  episode,
  t
}) => <div id={episode.frontmatter.name}
  className={['test--random_episode_item'].join(' ')}>
  <Link to={episode.fields.slug} className={[
    EpisodeItemCSSModule.link,
    'test--episode_link',
    'gtm--episode_link'
  ].join(' ')}>
    <h3
      className={[EpisodeItemCSSModule.title, 'test--episode_title'].join(' ')}
    >
      {episode.frontmatter.title}
    </h3>
    <p className={[
      EpisodeItemCSSModule.subtitle,
      'test--episode_subtitle'
    ].join(' ')}
    >{episode.frontmatter.subtitle}</p>
    <EpisodeItemFooterWrapper t={t} episode={episode} />
  </Link>
</div>
export default EpisodeItem

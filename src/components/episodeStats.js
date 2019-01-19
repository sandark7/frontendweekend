import React from 'react'
import {
  FiPlay,
  FiHeart,
  FiShare2,
  FiMessageSquare,
  FiDownload
} from 'react-icons/fi'
import EpisodeStatsCSSModule from './episodeStats.module.css'
import { Link } from 'gatsby-plugin-i18next'

const EpisodeStats = ({ episode, t, downloadText = false }) => {
  const { frontmatter: {
    playback_count: playback,
    favoritings_count: favoritings,
    reposts_count: reposts,
    comment_count: comment,
    download_count: download,
  } } = episode
  return (
    <div className={ [
      EpisodeStatsCSSModule.stats_wrapper,
      'test--episode_stats_wrapper'
    ].join(' ') }>
      <div className={[
        EpisodeStatsCSSModule.stat_wrapper,
        'test--episode_stat_wrapper'
      ].join(' ')}>
        <FiPlay
          className={[
            EpisodeStatsCSSModule.stat_icon,
            'test--episode_stat_icon'
          ].join(' ')}
        />{playback}
      </div>
      <div className={[
        EpisodeStatsCSSModule.stat_wrapper,
        'test--episode_stat_wrapper'
      ].join(' ')}>
        <FiHeart
          className={[
            EpisodeStatsCSSModule.stat_icon,
            'test--episode_stat_icon'
          ].join(' ')}
        />{favoritings}
      </div>
      <div className={[
        EpisodeStatsCSSModule.stat_wrapper,
        'test--episode_stat_wrapper'
      ].join(' ')}>
        <Link
          className={[
            EpisodeStatsCSSModule.stat_link,
            'test--episode_stat_link'
          ].join(' ')}
          to={episode.fields.slug + '#share'}>
          <FiShare2
            className={[
              EpisodeStatsCSSModule.stat_icon,
              'test--episode_stat_icon'
            ].join(' ')}
          />{reposts}
        </Link>
      </div>
      <div className={[
        EpisodeStatsCSSModule.stat_wrapper,
        'test--episode_stat_wrapper'
      ].join(' ')}>
        <Link
          className={[
            EpisodeStatsCSSModule.stat_link,
            'test--episode_stat_link'
          ].join(' ')}
          to={episode.fields.slug + '#comments'}>
          <FiMessageSquare
            className={[
              EpisodeStatsCSSModule.stat_icon,
              'test--episode_stat_icon'
            ].join(' ')}
          />{comment}
        </Link>
      </div>
      <div className={[
        EpisodeStatsCSSModule.stat_wrapper,
        'test--episode_stat_wrapper'
      ].join(' ')}>
        <a
          className={[
            EpisodeStatsCSSModule.stat_link,
            EpisodeStatsCSSModule.stat_link_none,
            downloadText && EpisodeStatsCSSModule.download_link,
            'test--episode_stat_link'
          ].join(' ')}
          download={true}
          href={episode.frontmatter.podcastUrl}>
          { downloadText && t('episode_download_text') }
          { !downloadText && <FiDownload
            className={[
              EpisodeStatsCSSModule.stat_icon,
              'test--episode_stat_icon'
            ].join(' ')}
          />}{!downloadText && download}
        </a>
      </div>
    </div>
  )
}
export default EpisodeStats

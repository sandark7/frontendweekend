import React from 'react'
import {
  FiPlay,
  FiHeart,
  FiShare2,
  FiMessageSquare,
  FiDownload
} from 'react-icons/fi'
import EpisodeStatsCSSModule from './episodeStats.module.css'

const EpisodeStats = ({
  playback_count: playback,
  favoritings_count: favoritings,
  reposts_count: reposts,
  comment_count: comment,
  download_count: download,
}) => {
  return (
    <div className={ [
      EpisodeStatsCSSModule.stats_wrapper,
      'test--episode_stats_wrapper'
    ].join(' ') }>
      <FiPlay/>{playback}
      <FiHeart/>{favoritings}
      <FiShare2/>{reposts}
      <FiMessageSquare/>{comment}
      <FiDownload/>{download}
    </div>
  )
}
export default EpisodeStats

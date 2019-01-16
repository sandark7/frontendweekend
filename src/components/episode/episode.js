import React from 'react'
import EpisodeCSSModule from './episode.module.css'
import * as PropTypes from 'prop-types'

import Header from './header'
import StatsWrapper from './statsWrapper'
import CommentForm from './commentForm'
import AudioContext from './audioContext'

export default function Episode ({ episode, siteUrl, t, lng, comments,
  onTimecodeClick, onDescriptionClick }) {
  return (
    <div className={ [
      EpisodeCSSModule.wrapper,
      'test--episode_wrapper'
    ].join(' ') }>
      <Header title={ episode.frontmatter.title }/>
      <StatsWrapper episode={ episode }/>
      <AudioContext lng={lng}
        comments={comments} t={t}
        episode={episode}
        onTimecodeClick={onTimecodeClick}
        onDescriptionClick={onDescriptionClick}/>
      <CommentForm episode={ episode }
        t={ t } returnUrl={ `${ siteUrl }${ episode.fields.slug }` }/>
    </div>
  )
}

Episode.propTypes = {
  episode: PropTypes.any,
  siteUrl: PropTypes.string,
  t: PropTypes.func,
  lng: PropTypes.string,
  comments: PropTypes.array,
  onTimecodeClick: PropTypes.func,
  onDescriptionClick: PropTypes.func,
}

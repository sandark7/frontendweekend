import React from 'react'
import EpisodeCSSModule from './episode.module.css'
import * as PropTypes from 'prop-types'

import Header from './header'
import StatsWrapper from './statsWrapper'
import CommentForm from './commentForm'
import AudioContext from './audioContext'

export default function Episode (props) {
  const { episode, siteUrl, t } = props
  return (
    <div className={ [
      EpisodeCSSModule.wrapper,
      'test--episode_wrapper'
    ].join(' ') }>
      <Header title={ episode.frontmatter.title }/>
      <StatsWrapper episode={ episode }/>
      <AudioContext { ...props } />
      <CommentForm episode={ episode }
        t={ t } returnUrl={ `${ siteUrl }${ episode.fields.slug }` }/>
    </div>
  )
}

export const episodePropTypes = {
  episode: PropTypes.any,
  siteUrl: PropTypes.string,
  t: PropTypes.func,
  lng: PropTypes.string,
  comments: PropTypes.array,
  onTimecodeClick: PropTypes.func,
  onDescriptionClick: PropTypes.func,
}

Episode.propTypes = episodePropTypes

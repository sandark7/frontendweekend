import React, { Component } from 'react'
import EpisodeCSSModule from './episode.module.css'
import * as PropTypes from 'prop-types'

import Header from './header'
import StatsWrapper from './statsWrapper'
import ShareWrapper from './shareWrapper'
import CommentForm from './commentForm'
import Comments from './comments'
import Description from './description'
import SpeedControls from './speedControls'
import Audio from './audio'

export const AudioContext = React.createContext()

class Episode extends Component {
  static propTypes = {
    episode: PropTypes.any,
    siteUrl: PropTypes.string,
    t: PropTypes.func,
    lng: PropTypes.string,
    comments: PropTypes.array,
    onTimecodeClick: PropTypes.func,
    onDescriptionClick: PropTypes.func,
  }

  static defaultProps = {
    onTimecodeClick: () => {},
    onDescriptionClick: () => {},
  }

  constructor () {
    super()
    this.audioRef = React.createRef()
  }

  getAudioRef () {
    return this.audioRef
  }

  render () {
    const {
      episode,
      siteUrl,
      t,
      lng,
      comments,
      onTimecodeClick,
      onDescriptionClick,
    } = this.props
    return (
      <div className={ [
        EpisodeCSSModule.wrapper,
        'test--episode_wrapper'
      ].join(' ') }>
        <Header title={ episode.frontmatter.title }/>
        <StatsWrapper episode={ episode }/>
        <AudioContext.Provider value={ {
          getAudioRef: this.getAudioRef.bind(this),
          onTimecodeClick
        } }>
          <Audio refEl={ this.audioRef }
            podcastUrl={ episode.frontmatter.podcastUrl }/>
          <SpeedControls t={ t }
            getAudioRef={ this.getAudioRef.bind(this) }/>
          <Description onClick={ () => onDescriptionClick() }
            htmlAst={ episode.htmlAst }/>
          <ShareWrapper t={ t } siteUrl={ siteUrl } lng={ lng }
            slug={ episode.fields.slug }/>
          <Comments comments={ comments } t={ t }/>
        </AudioContext.Provider>
        <CommentForm episode={ episode }
          t={ t } returnUrl={ `${ siteUrl }${ episode.fields.slug }` }/>
      </div>
    )
  }
}

export default Episode

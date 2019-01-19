import React, { Component } from 'react'
import { episodePropTypes } from './episode'
import EpisodeCSSModule from './episode.module.css'
import {
  FiExternalLink
} from 'react-icons/fi'

import ShareWrapper from './shareWrapper'
import Comments from './comments'
import Description from './description'
import SpeedControls from './speedControls'
import Audio from './audio'

export const AudioContext = React.createContext()

export default class EpisodeAudioContext extends Component {
  static propTypes = {
    ...episodePropTypes,
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
      episode, siteUrl, t, lng, comments,
      onTimecodeClick, onDescriptionClick,
    } = this.props
    return (
      <AudioContext.Provider value={ {
        getAudioRef: this.getAudioRef.bind(this),
        onTimecodeClick
      } }>
        <Audio refEl={ this.audioRef }
          podcastUrl={ episode.frontmatter.podcastUrl }/>
        <SpeedControls t={ t }
          getAudioRef={ this.getAudioRef.bind(this) }/>
        <a className={[
          EpisodeCSSModule.sc_link_text,
          'test--sc_link_text',
        ].join(' ')} href={episode.frontmatter.scLink}
        >{ t('listen_on_sc_link_text') } <FiExternalLink /></a>
        <Description onClick={ () => onDescriptionClick() }
          htmlAst={ episode.htmlAst }/>
        <ShareWrapper t={ t } siteUrl={ siteUrl } lng={ lng }
          slug={ episode.fields.slug }/>
        <Comments comments={ comments } t={ t }/>
      </AudioContext.Provider>
    )
  }
}

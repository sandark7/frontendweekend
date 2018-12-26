import React, { Component } from 'react'
import EpisodeCSSModule from './episode.module.css'
import Share from './share'
import RehypeReact from 'rehype-react'
import Timecode from './timecode'

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { 'timecode': Timecode }
}).Compiler

export const AudioContext = React.createContext()

class Episode extends Component {
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
      onTimecodeClick = () => {},
      onDescriptionClick = () => {},
    } = this.props
    return (
      <div className={[
        EpisodeCSSModule.wrapper,
        'test--episode_wrapper'
      ].join(' ')}>
        <h1
          className={
            'test--episode_title'
          }>{episode.frontmatter.title}</h1>
        <AudioContext.Provider value={{
          getAudioRef: this.getAudioRef.bind(this),
          onTimecodeClick
        }}>
          <audio
            ref={this.audioRef}
            className={[
              EpisodeCSSModule.audio,
              'test--audio'
            ].join(' ')}
            src={episode.frontmatter.podcastUrl}
            controls>
          </audio>
          <div
            onClick={() => onDescriptionClick()}
            className={[
              EpisodeCSSModule.text_wraper,
              'test--text_wraper'
            ].join(' ')}
          >{renderAst(episode.htmlAst)}</div>
        </AudioContext.Provider>
        <Share t={t} url={`${ siteUrl }${ lng }${ episode.fields.slug }`}/>
      </div>
    )
  }
}

export default Episode

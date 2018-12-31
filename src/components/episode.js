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

  setSpeed (speed) {
    const audio = this.getAudioRef().current
    audio.playbackRate = speed
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
            src={ episode.frontmatter.podcastUrl }
            controls>
          </audio>
          <div
            className={[
              EpisodeCSSModule.controls_wrapper,
              'test--controls_wrapper',
            ].join(' ')}>
            <h4
              className={[
                EpisodeCSSModule.controls_title,
                'test--controls_title',
              ].join(' ')}>
              {t('controls_title_speed')}
            </h4>
            <span
              onClick={e => this.setSpeed(0.5)}
              className={[
                EpisodeCSSModule.x_speed_control,
                'gtm--x05speed',
                'test--x05speed',
              ].join(' ')}>
              {t('x05speed')}
            </span>
            <span
              onClick={e => this.setSpeed(1)}
              className={[
                EpisodeCSSModule.x_speed_control,
                'gtm--x1speed',
                'test--x1speed',
              ].join(' ')}>
              {t('x1speed')}
            </span>
            <span
              onClick={e => this.setSpeed(2)}
              className={[
                EpisodeCSSModule.x_speed_control,
                'gtm--x2speed',
                'test--x2speed',
              ].join(' ')}>
              {t('x2speed')}
            </span>
          </div>
          <div
            onClick={() => onDescriptionClick()}
            className={[
              EpisodeCSSModule.text_wraper,
              'test--text_wraper'
            ].join(' ')}
          >{renderAst(episode.htmlAst)}</div>
        </AudioContext.Provider>
        <form
          className={[
            EpisodeCSSModule.comment_form,
            'test--comment_form',
          ].join(' ')}
          method="POST"
          action="https://staticman-fw.herokuapp.com/v2/entry/nuxdie/frontendweekend/master/comment"
        >
          <input
            name="options[redirect]"
            type="hidden"
            value="https://frontendweekend.ml"></input>
          <input
            name="options[slug]"
            type="hidden"
            value={episode.frontmatter.name}></input>
          <label>
            {t('comment_form_name')}
            <input name="fields[name]" type="text"></input>
          </label>
          <label>
            {t('comment_form_email')}
            <input name="fields[email]" type="email"></input>
          </label>
          <label>
            {t('comment_form_message')}
            <textarea name="fields[message]"></textarea>
          </label>
          <button type="submit">
            {t('comment_form_submit_btn_cta')}
          </button>
        </form>
        <Share t={t} url={`${ siteUrl }${ lng }${ episode.fields.slug }`}/>
      </div>
    )
  }
}

export default Episode

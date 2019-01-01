import React, { Component } from 'react'
import EpisodeCSSModule from './episode.module.css'
import Share from './share'
import RehypeReact from 'rehype-react'
import Timecode from './timecode'
import moment from 'moment'
import EpisodeStats from './episodeStats'

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
      comments,
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
        <div className={[
          EpisodeCSSModule.stats_wrapper,
          'test--stats_wrapper',
        ].join(' ')}><EpisodeStats
            {...episode.frontmatter}
          /></div>
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
          <Share t={t} url={`${ siteUrl }${ lng }${ episode.fields.slug }`}/>
          <h3 className={[
            EpisodeCSSModule.comment_block_title,
            'test--comment_block_title',
          ].join(' ')}>
            {
              comments.length
                ? t('comment_block_title')
                : t('no_comments_title')
            }
          </h3>
          {comments.map(({ node: comment }) => (
            <div className={[
              EpisodeCSSModule.comment_wrapper,
              'test--comment_wrapper',
            ].join(' ')}>
              <div className={[
                EpisodeCSSModule.meta_wrapper,
                'test--meta_wrapper',
              ].join(' ')}>
                {comment.username && (<span className={[
                  EpisodeCSSModule.comment_user,
                  'test--comment_user',
                ].join(' ')}>
                  {comment.username}
                </span>)}
                {!!comment.timestamp && (
                  <Timecode
                    className={[
                      EpisodeCSSModule.comment_timestamp,
                      'test--comment_user',
                    ].join(' ')}
                    sec={comment.timestamp}
                  >
                    @ {
                      moment.duration({ seconds: comment.timestamp })
                        .locale('ru')
                        .humanize()
                    }
                  </Timecode>
                )}
                <span className={[
                  EpisodeCSSModule.comment_date,
                  'test--comment_date',
                ].join(' ')}>
                  {moment.unix(comment.date).fromNow()}
                </span>
              </div>
              <p className={[
                EpisodeCSSModule.comment_text,
                'test--comment_text',
              ].join(' ')}>
                {comment.message}
              </p>
            </div>
          ))}
        </AudioContext.Provider>
        <form
          className={[
            EpisodeCSSModule.comment_form,
            'test--comment_form',
          ].join(' ')}
          method="POST"
          action={'https://staticman-fw.herokuapp.com/v2/entry/' +
          'nuxdie/frontendweekend/master/comment'}
        >
          <input
            name="options[redirect]"
            type="hidden"
            value="https://frontendweekend.ml"></input>
          <input
            name="options[slug]"
            type="hidden"
            value={episode.frontmatter.name}></input>
          <input
            name="fields[slug]"
            type="hidden"
            value={episode.frontmatter.name}></input>
          <input
            name="fields[name]"
            className={[
              EpisodeCSSModule.comment_form_name_input,
              'test--comment_form_name_input',
            ].join(' ')}
            aria-label={t('comment_form_name')}
            placeholder={t('comment_form_name')}
          ></input>
          <textarea
            aria-label={t('comment_form_message')}
            className={[
              EpisodeCSSModule.comment_form_message_input,
              'test--comment_form_message_input',
            ].join(' ')}
            placeholder={t('comment_form_message')}
            required={true}
            name="fields[message]"></textarea>
          <button
            className={[
              EpisodeCSSModule.comment_form_submit_btn,
              'test--comment_form_submit_btn',
            ].join(' ')}
            type="submit">
            {t('comment_form_submit_btn_cta')}
          </button>
        </form>
      </div>
    )
  }
}

export default Episode

import React, { Component } from 'react'
import EpisodeCSSModule from './episode.module.css'
import Share from './share'
import RehypeReact from 'rehype-react'
import Timecode from './timecode'
import moment from 'moment'
import EpisodeStats from './episodeStats'
import * as PropTypes from 'prop-types'

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { 'timecode': Timecode }
}).Compiler

export const AudioContext = React.createContext()

function EpisodeHeader ({ title }) {
  return <h1
    className={
      'test--episode_title'
    }>{ title }</h1>
}

EpisodeHeader.propTypes = { title: PropTypes.string }

function EpisodeStatsWrapper ({ episode }) {
  return <div className={ [
    EpisodeCSSModule.stats_wrapper,
    'test--stats_wrapper'
  ].join(' ') }>
    <EpisodeStats
      episode={ episode }
    />
  </div>
}

EpisodeStatsWrapper.propTypes = { episode: PropTypes.any }

function EpisodeShareWrapper ({ t, siteUrl, lng, slug }) {
  return <div id='share'>
    <Share t={ t }
      url={ `${ siteUrl }${ lng }${ slug }` }/>
  </div>
}

EpisodeShareWrapper.propTypes = {
  t: PropTypes.func,
  siteUrl: PropTypes.string,
  lng: PropTypes.string,
  slug: PropTypes.string
}

function EpisodeCommentForm ({ t, episode, returnUrl }) {
  const INPUTS = [
    {
      tag: 'input',
      name: 'options[redirect]',
      type: 'hidden',
      value: returnUrl
    },
    {
      tag: 'input',
      name: 'options[slug]',
      type: 'hidden',
      value: episode.frontmatter.name
    },
    {
      tag: 'input',
      name: 'fields[slug]',
      type: 'hidden',
      value: episode.frontmatter.name
    },
    {
      tag: 'input',
      name: 'fields[name]',
      className: [
        EpisodeCSSModule.comment_form_name_input,
        'test--comment_form_name_input'
      ].join(' '),
      ariaLabel: t('comment_form_name'),
      placeholder: t('comment_form_name')
    },
    {
      tag: 'textarea',
      name: 'fields[message]',
      className: [
        EpisodeCSSModule.comment_form_message_input,
        'test--comment_form_message_input'
      ].join(' '),
      ariaLabel: t('comment_form_message'),
      placeholder: t('comment_form_message'),
      required: true
    },
  ]
  const makeInput = ({
    tag: TagName,
    name,
    type,
    value,
    className,
    ariaLabel,
    placeholder,
    required
  }) => {
    return <TagName
      name={name}
      type={type}
      value={value}
      className={className}
      aria-label={ariaLabel}
      placeholder={placeholder}
      required={required}
    ></TagName>
  }
  return <form
    className={ [
      EpisodeCSSModule.comment_form,
      'test--comment_form'
    ].join(' ') }
    method="POST"
    action={ 'https://staticman-fw.herokuapp.com/v2/entry/' +
    'nuxdie/frontendweekend/master/comment' }
  >
    {INPUTS.map(makeInput)}
    <button
      className={ [
        EpisodeCSSModule.comment_form_submit_btn,
        'test--comment_form_submit_btn'
      ].join(' ') }
      type="submit">
      { t('comment_form_submit_btn_cta') }
    </button>
  </form>
}

EpisodeCommentForm.propTypes = {
  episode: PropTypes.any,
  t: PropTypes.func,
  returnUrl: PropTypes.string
}

function EpisodeComment ({ comment }) {
  return <div className={ [
    EpisodeCSSModule.comment_wrapper,
    'test--comment_wrapper'
  ].join(' ') }>
    <div className={ [
      EpisodeCSSModule.meta_wrapper,
      'test--meta_wrapper'
    ].join(' ') }>
      { comment.username && (<span className={ [
        EpisodeCSSModule.comment_user,
        'test--comment_user'
      ].join(' ') }>
        { comment.username }
      </span>) }
      { !!comment.timestamp && (
        <Timecode
          className={ [
            EpisodeCSSModule.comment_timestamp,
            'test--comment_user'
          ].join(' ') }
          sec={ comment.timestamp }
        >
          @ {
            moment
              .duration({ seconds: comment.timestamp })
              .humanize()
          }
        </Timecode>
      ) }
      <span className={ [
        EpisodeCSSModule.comment_date,
        'test--comment_date'
      ].join(' ') }>
        { moment.unix(comment.date).fromNow() }
      </span>
    </div>
    <p className={ [
      EpisodeCSSModule.comment_text,
      'test--comment_text'
    ].join(' ') }>
      { comment.message }
    </p>
  </div>
}

EpisodeComment.propTypes = { comment: PropTypes.any }

function EpisodeCommentsTitle ({ t, hasComments }) {
  return <h3 id={ 'comments' } className={ [
    EpisodeCSSModule.comment_block_title,
    'test--comment_block_title'
  ].join(' ') }>
    {
      hasComments
        ? t('comment_block_title')
        : t('no_comments_title')
    }
  </h3>
}

EpisodeCommentsTitle.propTypes = {
  hasComments: PropTypes.bool,
  t: PropTypes.func,
}

function EpisodeComments ({ t, comments }) {
  return (<>
    <EpisodeCommentsTitle hasComments={ comments.length }
      t={ t }/>
    { comments.map(({ node: comment }) => (
      <EpisodeComment comment={ comment }/>
    )) }
  </>)
}

EpisodeComments.propTypes = {
  comments: PropTypes.array,
  t: PropTypes.func,
}

function EpisodeDescription ({ htmlAst, onClick }) {
  return (<div
    onClick={ onClick }
    className={ [
      EpisodeCSSModule.text_wraper,
      'test--text_wraper'
    ].join(' ') }
  >{ renderAst(htmlAst) }</div>)
}

EpisodeDescription.propTypes = {
  onClick: PropTypes.func,
  htmlAst: PropTypes.any
}

class EpisodeSpeedControls extends Component {
  constructor (props) {
    super(props)
    this.getAudioRef = props.getAudioRef
  }

  setSpeed (speed) {
    const audio = this.getAudioRef().current
    audio.playbackRate = speed
  }

  render () {
    const { t } = this.props
    const SPEEDS = [
      { speed: 0.5, name: 'x05' },
      { speed: 1, name: 'x1' },
      { speed: 2, name: 'x2' },
    ]
    return <div
      className={ [
        EpisodeCSSModule.controls_wrapper,
        'test--controls_wrapper'
      ].join(' ') }>
      <h4
        className={ [
          EpisodeCSSModule.controls_title,
          'test--controls_title'
        ].join(' ') }>
        { t('controls_title_speed') }
      </h4>
      {SPEEDS.map(({ speed, name }) => (
        <span
          onClick={ e => this.setSpeed(speed) }
          className={ [
            EpisodeCSSModule.x_speed_control,
            `gtm--${ name }speed`,
            `test--${ name }speed`
          ].join(' ') }>
          { t(name + 'speed') }
        </span>
      ))}
    </div>
  }
}

EpisodeSpeedControls.propTypes = {
  t: PropTypes.func,
  getAudioRef: PropTypes.func,
}

function EpisodeAudio ({ refEl, podcastUrl }) {
  return <audio
    ref={ refEl }
    className={ [
      EpisodeCSSModule.audio,
      'test--audio'
    ].join(' ') }
    src={ podcastUrl }
    controls>
  </audio>
}

EpisodeAudio.propTypes = {
  refEl: PropTypes.any,
  podcastUrl: PropTypes.string
}

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
      comments,
      onTimecodeClick = () => {},
      onDescriptionClick = () => {},
    } = this.props
    return (
      <div className={ [
        EpisodeCSSModule.wrapper,
        'test--episode_wrapper'
      ].join(' ') }>
        <EpisodeHeader title={ episode.frontmatter.title }/>
        <EpisodeStatsWrapper episode={ episode }/>
        <AudioContext.Provider value={ {
          getAudioRef: this.getAudioRef.bind(this),
          onTimecodeClick
        } }>
          <EpisodeAudio refEl={ this.audioRef }
            podcastUrl={ episode.frontmatter.podcastUrl }/>
          <EpisodeSpeedControls t={ t }
            getAudioRef={ this.getAudioRef.bind(this) }/>
          <EpisodeDescription onClick={ () => onDescriptionClick() }
            htmlAst={ episode.htmlAst }/>
          <EpisodeShareWrapper t={ t } siteUrl={ siteUrl } lng={ lng }
            slug={ episode.fields.slug }/>
          <EpisodeComments comments={ comments } t={ t }/>
        </AudioContext.Provider>
        <EpisodeCommentForm episode={ episode }
          t={ t } returnUrl={ `${ siteUrl }${ episode.fields.slug }` }/>
      </div>
    )
  }
}

export default Episode

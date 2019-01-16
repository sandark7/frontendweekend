import React from 'react'
import * as PropTypes from 'prop-types'
import EpisodeCSSModule from './episode.module.css'
import moment from 'moment'

export default function Comment ({ comment }) {
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

Comment.propTypes = { comment: PropTypes.any }

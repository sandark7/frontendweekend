import React from 'react'
import * as PropTypes from 'prop-types'
import EpisodeCSSModule from './episode.module.css'

export default function CommentsTitle ({ t, hasComments }) {
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

CommentsTitle.propTypes = {
  hasComments: PropTypes.bool,
  t: PropTypes.func,
}

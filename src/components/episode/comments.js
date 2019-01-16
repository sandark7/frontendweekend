import React from 'react'
import * as PropTypes from 'prop-types'

import Comment from './comment'
import CommentsTitle from './commentsTitle'

export default function Comments ({ t, comments }) {
  return (<div>
    <CommentsTitle hasComments={ comments.length }
      t={ t }/>
    { comments.map(({ node: comment }) => (
      <Comment comment={ comment }/>
    )) }
  </div>)
}

Comments.propTypes = {
  comments: PropTypes.array,
  t: PropTypes.func,
}

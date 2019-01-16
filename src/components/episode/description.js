import React, { createElement } from 'react'
import * as PropTypes from 'prop-types'
import EpisodeCSSModule from './episode.module.css'
import RehypeReact from 'rehype-react'
import Timecode from '../timecode'

const renderAst = new RehypeReact({
  createElement,
  components: { 'timecode': Timecode }
}).Compiler

export default function Description ({ htmlAst, onClick }) {
  return (
    <div
      onClick={ onClick }
      className={ [
        EpisodeCSSModule.text_wraper,
        'test--text_wraper'
      ].join(' ') }
    >
      { renderAst(htmlAst) }
    </div>
  )
}

Description.propTypes = {
  onClick: PropTypes.func,
  htmlAst: PropTypes.any
}

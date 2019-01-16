import React from 'react'
import * as PropTypes from 'prop-types'

export default function Header ({ title }) {
  return <h1
    className={
      'test--episode_title'
    }>{ title }</h1>
}

Header.propTypes = { title: PropTypes.string }

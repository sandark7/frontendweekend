import React from 'react'
import * as PropTypes from 'prop-types'
import Share from '../share'

export default function ShareWrapper ({ t, siteUrl, lng, slug }) {
  return <div id='share'>
    <Share t={ t }
      url={ `${ siteUrl }${ lng }${ slug }` }/>
  </div>
}

ShareWrapper.propTypes = {
  t: PropTypes.func,
  siteUrl: PropTypes.string,
  lng: PropTypes.string,
  slug: PropTypes.string
}

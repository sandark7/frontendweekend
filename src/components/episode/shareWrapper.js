import React from 'react'
import { func, string } from 'prop-types'
import Share from '../share'

export default function ShareWrapper ({ t, siteUrl, lng, slug }) {
  return <div id='share'>
    <Share t={ t }
      url={ `${ siteUrl }${ lng }${ slug }` }/>
  </div>
}

ShareWrapper.propTypes = { t: func, siteUrl: string, lng: string, slug: string }

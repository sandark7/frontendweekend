import React from 'react'
import SwitcherCSSModule from './switcher.module.css'
import { Language } from 'gatsby-plugin-i18next'

const Switcher = ({ changeLng, lng, availableLngs }) => (
  <ul className={[
    SwitcherCSSModule.lang_list,
    'test--lang_list'
  ].join(' ')}>
    { availableLngs.map(value => (
      <li className={[
        SwitcherCSSModule.lang_item,
        'test--lang_item'
      ].join(' ')} key={ value }>
        <a className={[
          SwitcherCSSModule.lang_btn,
          'test--lang_btn'
        ].join(' ')}
        onClick={ () => changeLng(value) }
        data-lang={value}>
          { value }
        </a>
      </li>
    )) }
  </ul>
)

export default props => (
  <Language>{ lngProps => <Switcher { ...props } { ...lngProps } /> }</Language>
)

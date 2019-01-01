import React from 'react'
import {
  FiRss
} from 'react-icons/fi'
import SubscribeBtnCSSModule from './subscribeBtn.module.css'
import { Link } from 'gatsby-plugin-i18next'

const SubscribeBtn = ({
  t,
}) => {
  return (
    <Link className={[
      SubscribeBtnCSSModule.subscribe_wrapper,
      'test--header_nav-subscribe',
      'gtm--subscribe_link',
    ].join(' ')} to={`/subscribe/`}>
      <FiRss className={[
        SubscribeBtnCSSModule.nav_item_subscribe_icon,
        'test--nav_item_subscribe_icon',
      ].join(' ')}/>
      <span className={[
        SubscribeBtnCSSModule.nav_item_subscribe_text,
        'test--header_nav_subscribe_text',
      ].join(' ')}>{t('subscribe_podcast_link_text')}</span>
    </Link>

  )
}
export default SubscribeBtn

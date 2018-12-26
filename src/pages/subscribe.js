import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SubscribeCSSModule from './subscribe.module.css'
import { I18n } from 'react-i18next'
import { withI18next } from 'gatsby-plugin-i18next'

class SubscribePage extends Component {
  render () {
    return (
      <I18n>
        {t => (
          <Layout
            title={[
              t('subscribe_podcast_link_text'),
              '–',
              t('site_title'),
            ].join(' ')}
          >
            <div className={
              [
                SubscribeCSSModule.content_wrapper,
                'test--content_wrapper'
              ].join(' ')
            }>
              <h1>{t('subscribe_page_title')}</h1>
              <p className={[
                SubscribeCSSModule.podcast_description,
                'test--podcast_description'
              ].join(' ')}>
                {t('subscribe_page_description')}
              </p>
              <ul className={[
                SubscribeCSSModule.list,
                'test--list'
              ].join(' ')}>
                <li className={[
                  SubscribeCSSModule.list_item,
                  'test--list_item'
                ].join(' ')}>
                  <a className={[
                    SubscribeCSSModule.link,
                    'test--link'
                  ].join(' ')}
                  href={t('soundcloud_link')}>
                    {t('subscribe_link_soundcloud')}
                  </a>
                </li>
                <li className={[
                  SubscribeCSSModule.list_item,
                  'test--list_item'
                ].join(' ')}>
                  <a className={[
                    SubscribeCSSModule.link,
                    'test--link'
                  ].join(' ')}
                  href={t('itunes_link')}>
                    {t('subscribe_link_itunes')}
                  </a>
                </li>
                <li className={[
                  SubscribeCSSModule.list_item,
                  'test--list_item'
                ].join(' ')}>
                  <a className={[
                    SubscribeCSSModule.link,
                    'test--link'
                  ].join(' ')}
                  href={t('rss_link')}>
                    {t('subscribe_link_rss')}
                  </a>
                </li>
                <li className={[
                  SubscribeCSSModule.list_item,
                  'test--list_item'
                ].join(' ')}>
                  <a className={[
                    SubscribeCSSModule.link,
                    'test--link'
                  ].join(' ')}
                  href={t('vk_link')}>
                    {t('subscribe_link_vk')}
                  </a>
                </li>
                <li className={[
                  SubscribeCSSModule.list_item,
                  'test--list_item'
                ].join(' ')}>
                  <a className={[
                    SubscribeCSSModule.link,
                    'test--link'
                  ].join(' ')}
                  href={t('fb_link')}>
                    {t('subscribe_link_fb')}
                  </a>
                </li>
                <li className={[
                  SubscribeCSSModule.list_item,
                  'test--list_item'
                ].join(' ')}>
                  <a className={[
                    SubscribeCSSModule.link,
                    'test--link'
                  ].join(' ')}
                  href={t('twitter_link')}>
                    {t('subscribe_link_twitter')}
                  </a>
                </li>
                <li className={[
                  SubscribeCSSModule.list_item,
                  'test--list_item'
                ].join(' ')}>
                  <a className={[
                    SubscribeCSSModule.link,
                    'test--link'
                  ].join(' ')}
                  href={t('telegram_link')}>
                    {t('subscribe_link_telegram')}
                  </a>
                </li>
                <li className={[
                  SubscribeCSSModule.list_item,
                  'test--list_item'
                ].join(' ')}>
                  <a className={[
                    SubscribeCSSModule.link,
                    'test--link'
                  ].join(' ')}
                  href={t('instagram_link')}>
                    {t('subscribe_link_instagram')}
                  </a>
                </li>
                <li className={[
                  SubscribeCSSModule.list_item,
                  'test--list_item'
                ].join(' ')}>
                  <a className={[
                    SubscribeCSSModule.link,
                    'test--link'
                  ].join(' ')}
                  href={t('patreon_link')}>
                    {t('subscribe_link_patreon')}
                  </a>
                </li>
              </ul>
            </div>
          </Layout>
        )}
      </I18n>
    )
  }
}

export default withI18next()(SubscribePage)

export const query = graphql`
    query($lng: String!) {
        locales: allLocale(
            filter: { lng: { eq: $lng }, ns: { eq: "messages" } }
        ) {
            ...TranslationFragment
        }
    }
`

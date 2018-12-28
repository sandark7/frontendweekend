import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SubscribeCSSModule from './subscribe.module.css'
import { I18n } from 'react-i18next'
import { withI18next } from 'gatsby-plugin-i18next'

class SubscribePage extends Component {
  render () {
    const networks = [
      'soundcloud',
      'itunes',
      'rss',
      'vk',
      'fb',
      'twitter',
      'telegram',
      'instagram',
      'patreon',
    ]
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
                {networks.map(network => (
                  <li className={[
                    SubscribeCSSModule.list_item,
                    'list_item-' + network,
                    'test--list_item'
                  ].join(' ')}>
                    <a className={[
                      SubscribeCSSModule.link,
                      'gtm--subscribe_link',
                      'gtm--subscribe_link-' + network,
                      'test--link'
                    ].join(' ')}
                    href={t(network + '_link')}>
                      {t('subscribe_link_' + network)}
                    </a>
                  </li>
                ))}
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

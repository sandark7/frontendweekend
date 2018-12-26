import React, { Component } from 'react'
import Layout from '../components/layout'
import IndexCSSModule from './index.module.css'
import { graphql } from 'gatsby'
import { I18n } from 'react-i18next'
import { Link, withI18next } from 'gatsby-plugin-i18next'
import Episode from '../components/episode'
import LayoutCSSModule from '../components/layout.module.css'

class IndexPage extends Component {
  constructor () {
    super()
    this.state = {
      shown: false
    }
  }

  onShowMoreClick () {
    this.setState({ shown: !this.state.shown })
  }

  expandDescription () {
    this.setState({ shown: true })
  }

  render () {
    const {
      lng,
      data: {
        site: {
          siteMetadata: { siteUrl },
        },
        allMarkdownRemark: {
          edges: [
            { node: episode }
          ]
        }
      }
    } = this.props
    return (
      <I18n>
        {t => (
          <Layout title={t('site_title')}>
            <div className={[
              IndexCSSModule.main_wrapper,
              'test--main_wrapper'
            ].join(' ')}>
              <div className={[
                IndexCSSModule.title_wrapper,
                'test--title_wrapper'
              ].join(' ')}>
                <h3>{t('latest_episode_title')}</h3>
                <Link className={[
                  LayoutCSSModule.nav_item,
                  LayoutCSSModule.nav_item_subscribe,
                  'test--header_nav-subscribe',
                  'gtm--subscribe_link',
                ].join(' ')} to={`/subscribe/`}>
                  <span>{t('subscribe_podcast_link_text')}</span>
                </Link>
              </div>
              <div>
                <div className={[
                  IndexCSSModule.combine_wrapper,
                  !this.state.shown ? IndexCSSModule.collapsed : '',
                ].join(' ')}>
                  <Episode
                    episode={episode}
                    siteUrl={siteUrl}
                    t={t}
                    lng={'/' + lng}
                    onTimecodeClick={() => this.expandDescription()}
                    onDescriptionClick={() => this.expandDescription()}
                  ></Episode>
                </div>
                <div
                  onClick={() => this.onShowMoreClick()}
                  className={[
                    IndexCSSModule.show_more_wrapper,
                    'test--show_more'
                  ].join(' ')}
                >
                  <span
                    className={IndexCSSModule.show_more}
                  >{
                      this.state.shown
                        ? t('show_less_btn_cta')
                        : t('show_more_btn_cta')
                    }
                  </span>
                </div>
              </div>
            </div>
            <Link className={[
              IndexCSSModule.archive_link,
              'test--header_nav-archive',
            ].join(' ')} to={`/archive/`}>
              <span>{t('archive_link_text')}</span>
            </Link>
            <div className={[
              IndexCSSModule.donate,
              'test--donate-wrapper'
            ].join(' ')}>
              <iframe
                title={t('ya_money_iframe_title')}
                className={
                  IndexCSSModule.iframe +
                  ' test--yandex-money-embed'
                }
                width="450"
                height="230"
                frameBorder="0"
                allowtransparency="true"
                scrolling="no"
                src={'https://money.yandex.ru/quickpay/shop-widget?' +
                'writer=seller&' +
                'targets=' + t('ya_money_payment_target_text') + '&' +
                'targets-hint=&' +
                'default-sum=500&' +
                'button-text=14&' +
                'payment-type-choice=on&' +
                'fio=on&' +
                'hint=&' +
                'successURL=&' +
                'quickpay=shop&' +
                'account=410015721260448'}
              />
              <p className={[
                IndexCSSModule.donate_text,
                'test--donate_text'
              ].join(' ')}>
                {t('patreon_support_text')}&nbsp;<a
                  className={'test--patreon-link gtm--patreon-link'}
                  href={t('patreon_link')}
                >{t('patreon_support_link')}</a>.
              </p>
            </div>
          </Layout>
        )}
      </I18n>
    )
  }
}

export default withI18next()(IndexPage)

export const query = graphql`
    query($lng: String!) {
        locales: allLocale(
            filter: {lng: {eq: $lng}, ns: {eq: "messages"}}
        ) {
            ...TranslationFragment
        }
        site {
            siteMetadata {
                siteUrl
            }
        }
        allMarkdownRemark(
            limit: 1,
            sort: {fields: [frontmatter___date], order: DESC}
        ){
            edges {
                node {
                    id
                    frontmatter {
                        title
                        subtitle
                        image
                        podcastUrl
                    }
                    htmlAst
                    fields {
                        slug
                    }
                }
            }
        }
    }
`

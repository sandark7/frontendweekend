import React from 'react'
import Layout from '../components/layout'
import IndexCSSModule from './index.module.css'
import { graphql } from 'gatsby'
import { I18n } from 'react-i18next'
import { Link, withI18next } from 'gatsby-plugin-i18next'
import EpisodeCSSModule from '../templates/episode.module.css'

class IndexPage extends React.Component {
  constructor () {
    super()
    this.state = {
      shown: false
    }
  }

  onShowMoreClick () {
    this.setState({ shown: !this.state.shown })
  }

  render () {
    const data = this.props.data
    const episode = data.allMarkdownRemark.edges[0].node
    return (
      <I18n>
        { t => (
          <Layout title={t('site_title')}>
            <div className={ [
              IndexCSSModule.main_wrapper,
              'test--main_wrapper'
            ].join(' ') }>
              <h3>{ t('latest_episode_title') }</h3>
              <h2>{ episode.frontmatter.title }</h2>
              <audio
                className={ [
                  EpisodeCSSModule.audio,
                  'test--audio'
                ].join(' ') }
                src={ episode.frontmatter.podcastUrl }
                controls>
              </audio>
              <div
                className={ [].join(' ') }
              >
                <div
                  className={ [
                    EpisodeCSSModule.text_wraper,
                    IndexCSSModule.text_wraper,
                    !this.state.shown ? IndexCSSModule.collapsed : '',
                    'test--text_wraper'
                  ].join(' ') }
                  dangerouslySetInnerHTML={ { __html: episode.html } }
                />
                <div
                  onClick={ () => this.onShowMoreClick() }
                  className={ [
                    IndexCSSModule.show_more_wrapper,
                    'test--show_more'
                  ].join(' ') }
                >
                  <span
                    className={ IndexCSSModule.show_more }
                  >{
                      this.state.shown
                        ? t('show_less_btn_cta')
                        : t('show_more_btn_cta')
                    }</span>
                </div>
              </div>
            </div>
            <Link className={ [
              IndexCSSModule.archive_link,
              'test--header_nav-archive',
            ].join(' ') } to={ `/archive/` }>
              <span>{ t('archive_link_text') }</span>
            </Link>
            <div className={ [
              IndexCSSModule.donate,
              'test--donate-wrapper'
            ].join(' ') }>
              <iframe
                title={ t('ya_money_iframe_title') }
                className={
                  IndexCSSModule.iframe +
                  ' test--yandex-money-embed'
                }
                width="450"
                height="213"
                frameBorder="0"
                allowtransparency="true"
                scrolling="no"
                src={ 'https://money.yandex.ru/quickpay/shop-widget?' +
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
                'account=410015721260448' }
              />
              <p className={ [
                IndexCSSModule.donate_text,
                'test--donate_text'
              ].join(' ') }>
                { t('patreon_support_text') }&nbsp;<a
                  className={ 'test--patreon-link gtm--patreon-link' }
                  href="https://www.patreon.com/frontendweekend"
                >{ t('patreon_support_link') }</a>.
              </p>
            </div>
          </Layout>
        ) }
      </I18n>
    )
  }
}

export default withI18next()(IndexPage)

export const query = graphql`
    query($lng: String!) {
        locales: allLocale(
            filter: { lng: { eq: $lng }, ns: { eq: "messages" } }
        ) {
            ...TranslationFragment
        },
        allMarkdownRemark(
            limit: 1,
            sort: { fields: [frontmatter___date], order: DESC }
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
                    html
                    fields {
                        slug
                    }
                }
            }
        }
    }
`

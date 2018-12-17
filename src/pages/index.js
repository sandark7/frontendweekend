import React from 'react'
import Layout from '../components/layout'
import IndexCSSModule from './index.module.css'
import { graphql, Link } from 'gatsby'
import EpisodeCSSModule from '../templates/episode.module.css'

export default class IndexPage extends React.Component {
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
      <Layout>
        <div className={[
          IndexCSSModule.main_wrapper,
          'test--main_wrapper'
        ].join(' ')}>
          <h3>Latest episode</h3>
          <h2>{episode.frontmatter.title}</h2>
          <audio
            className={[
              EpisodeCSSModule.audio,
              'test--audio'
            ].join(' ')}
            src={episode.frontmatter.podcastUrl}
            controls>
          </audio>
          <div
            className={[].join(' ')}
          >
            <div
              className={[
                EpisodeCSSModule.text_wraper,
                IndexCSSModule.text_wraper,
                !this.state.shown ? IndexCSSModule.collapsed : '',
                'test--text_wraper'
              ].join(' ')}
              dangerouslySetInnerHTML={{ __html: episode.html }}
            />
            <div
              onClick={() => this.onShowMoreClick()}
              className={[
                IndexCSSModule.show_more_wrapper,
                'test--show_more'
              ].join(' ')}
            >
              <span
                className={IndexCSSModule.show_more}
              >{this.state.shown ? 'Show less' : 'Show more'}</span>
            </div>
          </div>
        </div>
        <Link className={[
          IndexCSSModule.archive_link,
          'test--header_nav-archive',
        ].join(' ')} to={`/archive/`}>
          <span>All episodes</span>
        </Link>
        <div className={[
          IndexCSSModule.donate,
          'test--donate-wrapper'
        ].join(' ')}>
          <iframe
            title="Yandex Money widget - Frontend Weekend podcast"
            className={IndexCSSModule.iframe + ' test--yandex-money-embed'}
            width="450"
            height="213"
            frameBorder="0"
            allowtransparency="true"
            scrolling="no"
            src={'https://money.yandex.ru/quickpay/shop-widget?' +
            'writer=seller&' +
            'targets=Frontend%20Weekend&' +
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
            Также вы можете поддержать нас постоянной подпиской на&nbsp;<a
              className={'test--patreon-link gtm--patreon-link'}
              href="https://www.patreon.com/frontendweekend"
            >Patreon</a>.
          </p>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
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

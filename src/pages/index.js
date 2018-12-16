import React from 'react'
import ShowMoreText from 'react-show-more-text'
import Layout from '../components/layout'
import IndexCSSModule from './index.module.css'
import { graphql, Link } from 'gatsby'
import EpisodeCSSModule from '../templates/episode.module.css'

export default ({ data }) => {
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
        <ShowMoreText
          lines={4}
          more='Show more'
          less='Show less'
          anchorClass={[
            IndexCSSModule.show_more,
            'test--show_more'
          ].join(' ')}
        >
          <div
            className={[
              EpisodeCSSModule.text_wraper,
              'test--text_wraper'
            ].join(' ')}
            dangerouslySetInnerHTML={{ __html: episode.html }}
          />
        </ShowMoreText>
      </div>
      <Link className={[
        IndexCSSModule.archive_link,
        'test--header_nav-archive',
      ].join(' ')} to={`/archive/`}>
        <span>More episodes</span>
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
            href="https://www.patreon.com/frontendweekend">Patreon</a>.
        </p>
      </div>
    </Layout>
  )
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

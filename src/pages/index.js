import React, { Component } from 'react'
import Layout from '../components/layout'
import IndexCSSModule from './index.module.css'
import { graphql } from 'gatsby'
import { I18n } from 'react-i18next'
import { Link, withI18next } from 'gatsby-plugin-i18next'
import Episode from '../components/episode'
import RandomEpisodes from '../components/randomEpisodes'
import SubscribeBtn from '../components/subscribeBtn'
import Support from '../components/support'
import uniqueRandomArray from 'unique-random-array'

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
    let {
      lng,
      data: {
        site: {
          siteMetadata: { siteUrl },
        },
        latestEpisode: {
          edges: [
            { node: episode }
          ]
        },
        allEpisodes: {
          edges: allEpisodes
        },
        allCommentYaml: { edges: comments },
      }
    } = this.props
    comments = comments.filter(
      ({ node: comment }) => (comment.slug === episode.frontmatter.name)
    )
    allEpisodes.pop()
    const getRandomEpisode = uniqueRandomArray(allEpisodes)
    const randomEpisodes = [
      getRandomEpisode(),
      getRandomEpisode()
    ]
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
                <SubscribeBtn t={t} />
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
                    comments={comments}
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
            <RandomEpisodes
              t={t}
              randomEpisodes={randomEpisodes}
            />
            <Link className={[
              IndexCSSModule.archive_link,
              'test--header_nav-archive',
            ].join(' ')} to={`/archive/`}>
              <span>{t('archive_link_text')}</span>
            </Link>
            <Support
              t={t}
              siteUrl={siteUrl}
              lng={lng}
            />
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
        allCommentYaml(sort: {fields: [date], order: ASC}) {
            edges {
                node {
                    slug
                    message
                    date
                    username
                    timestamp
                }
            }
        }
        latestEpisode: allMarkdownRemark(
            limit: 1,
            sort: {fields: [frontmatter___date], order: DESC}
        ){
            edges {
                node {
                    id
                    frontmatter {
                        title
                        name
                        subtitle
                        image
                        podcastUrl
                        playback_count
                        download_count
                        favoritings_count
                        reposts_count
                        comment_count
                    }
                    htmlAst
                    fields {
                        slug
                    }
                }
            }
        }
        allEpisodes: allMarkdownRemark{
            edges {
                node {
                    id
                    frontmatter {
                        title
                        subtitle
                        image
                        playback_count
                        download_count
                        favoritings_count
                        reposts_count
                        comment_count
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`

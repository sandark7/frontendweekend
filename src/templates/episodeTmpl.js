import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Episode from '../components/episode'
import { I18n } from 'react-i18next'
import { Link, withI18next } from 'gatsby-plugin-i18next'
import RandomEpisodes from '../components/randomEpisodes'
import uniqueRandomArray from 'unique-random-array'
import Support from '../components/support'
import EpisodeTmplCSSModule from './episodeTmpl.module.css'

class EpisodeTmpl extends Component {
  render () {
    let {
      lng,
      data: {
        currentEpisode: episode,
        site: {
          siteMetadata: { siteUrl },
        },
        allEpisodes: { edges: allEpisodes }
      }
    } = this.props
    allEpisodes = allEpisodes.filter(({ node }) => (node.id !== episode.id))
    const getRandomEpisode = uniqueRandomArray(allEpisodes)
    const randomEpisodes = [
      getRandomEpisode(),
      getRandomEpisode()
    ]
    return (
      <I18n>
        {t => (
          <Layout title={[
            episode.frontmatter.title,
            '–',
            t('site_title'),
          ].join(' ')}
          description={episode.frontmatter.subtitle}
          >
            <div
              className={[
                EpisodeTmplCSSModule.wrapper,
                'test--wrapper',
              ].join(' ')}
            >
              <Link className={[
                EpisodeTmplCSSModule.archive_link,
                'test--header_nav-archive',
              ].join(' ')} to={`/archive/#${ episode.frontmatter.name }`}>
                <span>{t('archive_link_text_back')}</span>
              </Link>
              <Episode
                episode={episode}
                t={t}
                lng={'/' + lng}
                siteUrl={siteUrl}
              />
              <RandomEpisodes
                t={t}
                randomEpisodes={randomEpisodes}
              />
              <Support
                t={t}
                siteUrl={siteUrl}
                lng={lng}
              />
            </div>
          </Layout>
        )}
      </I18n>
    )
  }
}

export default withI18next()(EpisodeTmpl)

export const query = graphql`
    query($slug: String!, $lng: String!) {
        locales: allLocale(
            filter: { lng: { eq: $lng }, ns: { eq: "messages" } }
        ) {
            ...TranslationFragment
        }
        site {
            siteMetadata {
                siteUrl
            }
        }
        currentEpisode: markdownRemark(fields: { slug: { eq: $slug } }) {
            htmlAst
            frontmatter {
                title
                name
                podcastUrl
                subtitle
            }
            fields {
                slug
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
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`

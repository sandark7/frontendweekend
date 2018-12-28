import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Episode from '../components/episode'
import { I18n } from 'react-i18next'
import { withI18next } from 'gatsby-plugin-i18next'

class EpisodeTmpl extends Component {
  render () {
    const {
      lng,
      data: {
        markdownRemark: episode,
        site: {
          siteMetadata: { siteUrl },
        }
      }
    } = this.props
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
            <Episode
              episode={episode}
              t={t}
              lng={'/' + lng}
              siteUrl={siteUrl}
            />
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
        markdownRemark(fields: { slug: { eq: $slug } }) {
            htmlAst
            frontmatter {
                title
                podcastUrl
                podcastFile
                subtitle
            }
            fields {
                slug
            }
        }
    }
`

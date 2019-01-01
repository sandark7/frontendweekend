import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ArchiveCSSModule from './archive.module.css'
import { I18n } from 'react-i18next'
import { withI18next } from 'gatsby-plugin-i18next'
import EpisodeItem from '../components/episodeItem'

class Archive extends Component {
  render () {
    const { data } = this.props
    return (
      <I18n>
        { t => (
          <Layout title={t('archive_page_title')}>
            <div className={
              [
                ArchiveCSSModule.content_wrapper,
                'test--content_wrapper'
              ].join(' ')
            }>
              <h1>{t('archive_page_title')}</h1>
              { data.allMarkdownRemark.edges.map(({ node: episode }) => (
                <EpisodeItem
                  key={episode.id}
                  episode={episode}
                  t={t}
                />
              )) }
            </div>
          </Layout>
        ) }
      </I18n>
    )
  }
}

export default withI18next()(Archive)

export const query = graphql`
    query($lng: String!) {
        locales: allLocale(
            filter: { lng: { eq: $lng }, ns: { eq: "messages" } }
        ) {
            ...TranslationFragment
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        name
                        title
                        subtitle
                        scLink
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

import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import AboutCSSModule from './about.module.css'
import ArchiveCSSModule from './archive.module.css'
import { I18n } from 'react-i18next'
import { Link, withI18next } from 'gatsby-plugin-i18next'
import RandomEpisodesCSSModule from '../components/randomEpisodes.module.css'
import EpisodeStats from '../components/episodeStats'

class Archive extends Component {
  render () {
    const { data } = this.props
    return (
      <I18n>
        { t => (
          <Layout title={t('archive_page_title')}>
            <div className={
              [
                AboutCSSModule.content_wrapper,
                'test--content_wrapper'
              ].join(' ')
            }>
              <h1>{t('archive_page_title')}</h1>
              { data.allMarkdownRemark.edges.map(({ node: episode }) => (
                <div id={episode.frontmatter.name} key={ episode.id }>
                  <Link
                    to={ episode.fields.slug }
                    className={ [
                      ArchiveCSSModule.podcast_link,
                      'test--podcast_link'
                    ].join(' ') }
                  >
                    <h3 className={ [
                      ArchiveCSSModule.podcast_title,
                      'test--podcast_link'
                    ].join(' ') }>
                      { episode.frontmatter.title }
                    </h3>
                    <p>
                      { episode.frontmatter.subtitle }
                    </p>
                    <div className={ [
                      RandomEpisodesCSSModule.random_episode_footer,
                      'test--podcast_link'
                    ].join(' ') }>
                      <EpisodeStats
                        {...episode.frontmatter}
                      />
                    </div>
                  </Link>
                </div>
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

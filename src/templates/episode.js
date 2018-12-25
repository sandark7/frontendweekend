import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Share from '../components/share'
import Timecode from '../components/timecode'
import EpisodeCSSModule from './episode.module.css'
import { I18n } from 'react-i18next'
import { withI18next } from 'gatsby-plugin-i18next'
import RehypeReact from 'rehype-react'

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { 'timecode': Timecode }
}).Compiler

export const AudioContext = React.createContext()

class Episode extends Component {
  constructor () {
    super()
    this.audioRef = React.createRef()
  }
  getAudioRef () {
    return this.audioRef
  }
  render () {
    const {
      data: {
        markdownRemark: episode, site: {
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
            <div className={[
              EpisodeCSSModule.wrapper,
              'test--episode_wrapper'
            ].join(' ')}>
              <h1
                className={
                  'test--episode_title'
                }>{episode.frontmatter.title}</h1>
              <AudioContext.Provider value={this.getAudioRef.bind(this)}>
                <audio
                  ref={this.audioRef}
                  className={[
                    EpisodeCSSModule.audio,
                    'test--audio'
                  ].join(' ')}
                  src={episode.frontmatter.podcastUrl}
                  controls>
                </audio>
                <div
                  className={[
                    EpisodeCSSModule.text_wraper,
                    'test--text_wraper'
                  ].join(' ')}
                >{renderAst(episode.htmlAst)}</div>
              </AudioContext.Provider>
              <Share t={t} url={`${ siteUrl }${ episode.fields.slug }`}/>
            </div>
          </Layout>
        )}
      </I18n>
    )
  }
}

export default withI18next()(Episode)

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
                subtitle
            }
            fields {
                slug
            }
        }
    }
`

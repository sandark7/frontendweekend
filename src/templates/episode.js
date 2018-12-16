import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import EpisodeCSSModule from './episode.module.css'

export default ({ data }) => {
  const episode = data.markdownRemark
  return (
    <Layout>
      <div className={EpisodeCSSModule.wrapper}>
        <h1>{episode.frontmatter.title}</h1>
        <audio
          className={EpisodeCSSModule.audio}
          src={episode.frontmatter.podcastUrl}
          controls>
        </audio>
        <div
          className={EpisodeCSSModule.text_wraper}
          dangerouslySetInnerHTML={{ __html: episode.html }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        podcastUrl
      }
    }
  }
`

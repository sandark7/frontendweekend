import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import AboutCSSModule from './about.module.css'
import ArchiveCSSModule from './archive.module.css'

export default ({ data }) => {
  return (
    <Layout>
      <div className={
        [AboutCSSModule.content_wrapper, 'test--content_wrapper'].join(' ')
      }>
        <h1>Frontend Weekend podcast archive</h1>
        {data.allMarkdownRemark.edges.map(({ node: episode }) => (
          <div key={episode.id}>
            <Link
              to={episode.fields.slug}
              className={[
                ArchiveCSSModule.podcast_link,
                'test--podcast_link'
              ].join(' ')}
            >
              <h3>
                {episode.frontmatter.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            scLink
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

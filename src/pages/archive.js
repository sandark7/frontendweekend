import React from 'react'
import { graphql } from 'gatsby'
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
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <a className={
              ArchiveCSSModule.podcast_link
            } href={node.frontmatter.scLink}>
              <h3>
                {node.frontmatter.title}
              </h3>
            </a>
          </div>
        ))}
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            scLink
          }
        }
      }
    }
  }
`

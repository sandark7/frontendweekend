import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import AboutCSSModule from './about.module.css'
import { I18n } from 'react-i18next'
import { withI18next } from 'gatsby-plugin-i18next'

const AboutPage = () => <I18n>
  {t => <Layout>
    <div className={[ AboutCSSModule.content_wrapper,
      'test--content_wrapper' ].join(' ')}>
      <h1>{t('site_title')}</h1>
      <p className={[ AboutCSSModule.podcast_description,
        'test--podcast_description' ].join(' ')}>
        {t('site_description')}
      </p>
      <h2>{t('podcast_host_title')}</h2>
      <img className={'test--host_photo'}
        src={'https://avatars0.githubusercontent.com/u/13529513?s=460&v=4'}
        alt="sandark7" />
      <h3>{t('podcast_host_full_name')}</h3>
      <p>{t('podcast_host_job_title')}</p>
    </div>
  </Layout>}
</I18n>

export default withI18next()(AboutPage)

export const query = graphql`
    query($lng: String!) {
        locales: allLocale(
            filter: { lng: { eq: $lng }, ns: { eq: "messages" } }
        ) {
            ...TranslationFragment
        }
    }
`

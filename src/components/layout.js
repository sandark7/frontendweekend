import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import LayoutCSSModule from './layout.module.css'
import { translate } from 'react-i18next'
import { Head, Link } from 'gatsby-plugin-i18next'
import Switcher from './switcher.js'

const Layout = ({ children, data, newLogo, t, title, description }) => (
  <article className={newLogo ? LayoutCSSModule.globalWrapper : ''}>
    <StaticQuery
      query={query}
      render={({
        site: {
          siteMetadata: {
            siteUrl,
          },
        },
      }) => {
        return (
          <Head siteUrl={siteUrl + '/'} hreflang>
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <title>{title || t('site_title')}</title>
            <meta name="description"
              content={description || t('site_description')}/>
            <meta name="keywords"
              content={t('site_keywords')}/>
            <meta
              content='width=device-width, initial-scale=1.0'
              name='viewport'/>
            <meta name="viewport" content="width=device-width"/>
          </Head>)
      }}
    />
    <header className={[
      LayoutCSSModule.header,
      newLogo ? LayoutCSSModule.newLogoAdded : '',
    ].join(' ')}>
      <nav className={[LayoutCSSModule.nav, 'test--header-nav'].join(' ')}>
        <Link to={`/`}>
          <div aria-label={t('main_page_logo_aria_label')}
            className={[
              LayoutCSSModule.logo,
              newLogo ? LayoutCSSModule.newLogo : '',
              'test--header_nav-logo'
            ].join(' ')}></div>
        </Link>
        <Link className={[
          LayoutCSSModule.nav_item,
          'test--header_nav-about',
        ].join(' ')} to={`/about/`}>
          <span>{t('about_podcast_link_text')}</span>
        </Link>
        <Switcher/>
      </nav>
    </header>
    <main className={[
      LayoutCSSModule.wrapper + ' test--wrapper',
      newLogo ? LayoutCSSModule.newLogoAdded : '',
      ].join(' ')}>
      {children}
    </main>
    <footer className={[
      LayoutCSSModule.footer,
      newLogo ? LayoutCSSModule.newLogoAdded : '',
      'test--footer'
    ].join(' ')}>
      <p className={'test--footer-gh_text'}>
        {t('gh_footer_text')}&nbsp;<a
          className={'test--gh-link gtm--gh-link'}
          href="https://github.com/nuxdie/frontendweekend/issues"
        >{t('gh_footer_link_text')}</a>.
      </p>
      <p className={'test--footer-email_text'}>
        {t('email_footer_text')}&nbsp;<a
          className={'test--email-link gtm--email-link'}
          href="mailto:pr@frontendweekend.ml">{t('email_footer_link_text')}</a>
      </p>
    </footer>
  </article>
)

export default translate()(Layout)

const query = graphql`
    query Layout {
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`

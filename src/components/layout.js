import React from 'react'
import { Helmet } from 'react-helmet'
import LayoutCSSModule from './layout.module.css'
import { Link } from 'gatsby'

export default ({ children }) => (
  <div className="application">
    <Helmet>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
      <title>Frontend Weekend podcast</title>
      <meta name="description"
        content={'Самые честные интервью с известными людьми из мира ' +
        'web-разработки. Впечатляющие истории успеха, забавные моменты ' +
        'из жизни и полезные советы – мы показываем человеческое лицо ' +
        'frontend’а и не только.'}/>
      <meta
        content='width=device-width, initial-scale=1.0'
        name='viewport'/>
      <meta name="viewport" content="width=device-width"/>
    </Helmet>
    <header className={LayoutCSSModule.header}>
      <nav className={[LayoutCSSModule.nav, 'test--header-nav'].join(' ')}>
        <Link aria-label={'Main page'} to={`/`}
          className={[LayoutCSSModule.logo, 'test--header_nav-logo'].join(' ')}>
        </Link>
        <Link className={[
          LayoutCSSModule.nav_item,
          'test--header_nav-about',
        ].join(' ')} to={`/about/`}>
          <span >About podcast</span>
        </Link>
      </nav>
    </header>
    <main className={LayoutCSSModule.wrapper + ' test--wrapper'}>
      {children}
    </main>
    <footer className={[LayoutCSSModule.footer, 'test--footer'].join(' ')}>
      <p className={'test--footer-email_text'}>
                По вопросам сотрудничества пишите на <a
          className={'test--email-link gtm--email-link'}
          href="mailto:pr@frontendweekend.ml">pr@frontendweekend.ml</a>
      </p>
    </footer>
  </div>
)

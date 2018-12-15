import React from "react"
import {Helmet} from "react-helmet";
import LayoutCSSModule from './layout.module.css'
import {Link} from "gatsby"

export default ({children}) => (
    <div className="application">
        <Helmet>
            <meta charSet="utf-8"/>
            <link rel="icon" type="image/png" href={"img/favicon.ico"}/>
            <link rel="apple-touch-icon" sizes="180x180" href={"img/apple-touch-icon.png"}/>
            <link rel="icon" type="image/png" sizes="32x32" href={"img/favicon-32x32.png"}/>
            <link rel="icon" type="image/png" sizes="16x16" href={"img/favicon-16x16.png"}/>
            <link rel="manifest" href={"img/site.webmanifest"}/>
            <link rel="mask-icon" href={"img/safari-pinned-tab.svg"} color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#ffee4e"/>
            <meta name="theme-color" content="#ffee4e"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <title>Frontend Weekend podcast</title>
            <meta name="description"
                  content="Самые честные интервью с известными людьми из мира web-разработки. Впечатляющие истории успеха, забавные моменты из жизни и полезные советы – мы показываем человеческое лицо frontend’а и не только."/>
            <meta
                content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
                name='viewport'/>
            <meta name="viewport" content="width=device-width"/>
            <link href={"css/landing-page.css"} rel="stylesheet"/>
        </Helmet>
        <header className={LayoutCSSModule.nav}>
            <Link to={`/`} className={LayoutCSSModule.logo}>
            </Link>
            <Link to={`/about/`}>
                <span className={LayoutCSSModule.about_nav_item}>About</span>
            </Link>
        </header>
        <div className={LayoutCSSModule.wrapper + " test--wrapper"}>
            {children}
        </div>
        <footer className={[LayoutCSSModule.footer, "test--footer"].join(' ')}>
            <p className={'test--footer-email_text'}>
                По вопросам сотрудничества пишите на <a
                className={'test--email-link gtm--email-link'}
                href="mailto:pr@frontendweekend.ml">pr@frontendweekend.ml</a>
            </p>
        </footer>
    </div>
)
import React from "react"
import {Helmet} from "react-helmet"

class Application extends React.Component {
    render() {
        return (
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
                    <meta
                        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
                        name='viewport'/>
                    <meta name="viewport" content="width=device-width"/>
                    <link href={"css/landing-page.css"} rel="stylesheet"/>
                </Helmet>
                <div className="wrapper test--wrapper">
                    <iframe
                        title="Sound cloud player - Frontend Weekend podcast"
                        className="test--sc-embedded-player"
                        width="450"
                        height="345"
                        scrolling="no"
                        frameBorder="no"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/306455261&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=false"
                    />
                    <iframe
                        title="Yandex Money widget - Frontend Weekend podcast"
                        className="test--yandex-money-embed"
                        width="450"
                        height="213"
                        frameBorder="0"
                        allowtransparency="true"
                        scrolling="no"
                        src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=Frontend%20Weekend&targets-hint=&default-sum=500&button-text=14&payment-type-choice=on&fio=on&hint=&successURL=&quickpay=shop&account=410015721260448"
                    />
                    <footer className="test--footer">
                        Также вы можете поддержать нас постоянной подпиской на <a
                        className='test--patreon-link gtm--patreon-link'
                        href="https://www.patreon.com/frontendweekend">Patreon</a>.<br/>
                        По вопросам сотрудничества пишите на <a
                        className='test--email-link gtm--email-link'
                        href="mailto:pr@frontendweekend.ml">pr@frontendweekend.ml</a>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Application

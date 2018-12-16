import React from 'react'
import Layout from '../components/layout'
import IndexCSSModule from './index.module.css'

class Application extends React.Component {
    render() {
        return (
            <Layout>
                <iframe
                    title="Sound cloud player - Frontend Weekend podcast"
                    className={[IndexCSSModule.iframe, IndexCSSModule.iframe_sc, 'test--sc-embedded-player'].join(' ')}
                    width="450"
                    height="345"
                    scrolling="no"
                    frameBorder="no"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/306455261&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=false"
                />
                <div className={[IndexCSSModule.donate, 'test--donate-wrapper'].join(' ')}>
                    <iframe
                        title="Yandex Money widget - Frontend Weekend podcast"
                        className={IndexCSSModule.iframe + ' test--yandex-money-embed'}
                        width="450"
                        height="213"
                        frameBorder="0"
                        allowtransparency="true"
                        scrolling="no"
                        src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=Frontend%20Weekend&targets-hint=&default-sum=500&button-text=14&payment-type-choice=on&fio=on&hint=&successURL=&quickpay=shop&account=410015721260448"
                    />
                    <p className={[IndexCSSModule.donate_text, 'test--donate_text'].join(' ')}>
                        Также вы можете поддержать нас постоянной подпиской на&nbsp;<a
                        className={'test--patreon-link gtm--patreon-link'}
                        href="https://www.patreon.com/frontendweekend">Patreon</a>.
                    </p>
                </div>
            </Layout>
        )
    }
}

export default Application

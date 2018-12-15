import React from "react"
import Layout from "../components/layout"
import AboutCSSModule from './about.module.css'

class AboutPage extends React.Component {
    render() {
        return (
            <Layout>
                <div className={[AboutCSSModule.content_wrapper, 'test--content_wrapper'].join(' ')}>
                    <h1>Frontend Weekend podcast</h1>
                    <p className={'test--podcast_description'}>
                        Самые честные интервью с известными людьми из мира web-разработки.
                        Впечатляющие истории успеха, забавные моменты из жизни и полезные советы – мы показываем
                        человеческое лицо frontend’а и не только.
                    </p>
                    <h2>Host</h2>
                    <img className={'test--host_photo'}
                         src={'https://avatars0.githubusercontent.com/u/13529513?s=460&v=4'}
                         rel="sandark7 profile photo"/>
                    <h3>Andrew Smirnov</h3>
                    <p>UI Practice Lead, IPONWEB</p>
                </div>
            </Layout>
        )
    }
}

export default AboutPage
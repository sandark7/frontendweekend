import React, { Component } from 'react'
import Share from './share'
import SupportCSSModule from './support.module.css'

class Support extends Component {
  render () {
    const {
      t,
      siteUrl,
      lng,
    } = this.props
    return (
      <div className={[
        SupportCSSModule.donate_wrapper,
        'test--donate_wrapper'
      ].join(' ')}>
        <h2 id="support" className={[
          SupportCSSModule.donate_title,
          'test--donate_title'
        ].join(' ')}>
          {t('support_title')}
        </h2>
        <p className={[
          SupportCSSModule.donate_text,
          'test--donate_text'
        ].join(' ')}>
          {t('support_text')}
        </p>
        <p className={[
          SupportCSSModule.donate_text,
          'test--donate_text'
        ].join(' ')}>
          {t('patreon_support_text')}&nbsp;<a
            className={'test--patreon-link gtm--patreon-link'}
            href={t('patreon_link')}
          >{t('patreon_support_link')}</a>.
        </p>
        <iframe
          title={t('ya_money_iframe_title')}
          className={
            SupportCSSModule.iframe +
            ' test--yandex-money-embed'
          }
          width="450"
          height="230"
          frameBorder="0"
          allowtransparency="true"
          scrolling="no"
          src={'https://money.yandex.ru/quickpay/shop-widget?' +
          'writer=seller&' +
          'targets=' + t('ya_money_payment_target_text') + '&' +
          'targets-hint=&' +
          'default-sum=500&' +
          'button-text=14&' +
          'payment-type-choice=on&' +
          'fio=on&' +
          'hint=&' +
          'successURL=&' +
          'quickpay=shop&' +
          'account=410015721260448'}
        />
        <p className={[
          SupportCSSModule.donate_text,
          'test--donate_text'
        ].join(' ')}>
          {t('support_share_text')}
        </p>
        <Share noTitle={true} t={t} url={`${ siteUrl }/${ lng }`}/>
      </div>
    )
  }
}

export default Support

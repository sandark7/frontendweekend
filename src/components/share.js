import React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  VKShareButton,
  VKIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon
} from 'react-share'
import ShareCSSModule from './share.module.css'

const Share = ({ url, t }) => {
  const logoFillColor = 'white'
  const size = 32
  const additionalProps = {
    'aria-label': t('share_btn_aria_label')
  }
  return (
    <div className={[
      ShareCSSModule.share_wrapper,
      'test--share_wrapper'
    ].join(' ')}>
      <FacebookShareButton
        className={'gtm--share_btn'}
        additionalProps={additionalProps}
        url={url}>
        <FacebookIcon
          size={size}
          round={false}
          logoFillColor={logoFillColor}
        ></FacebookIcon>
      </FacebookShareButton>
      <TelegramShareButton
        className={'gtm--share_btn'}
        additionalProps={additionalProps}
        url={url}>
        <TelegramIcon
          size={size}
          round={false}
          logoFillColor={logoFillColor}
        ></TelegramIcon>
      </TelegramShareButton>
      <VKShareButton
        className={'gtm--share_btn'}
        additionalProps={additionalProps}
        url={url}>
        <VKIcon
          size={size}
          round={false}
          logoFillColor={logoFillColor}
        ></VKIcon>
      </VKShareButton>
      <TwitterShareButton
        className={'gtm--share_btn'}
        additionalProps={additionalProps}
        url={url}>
        <TwitterIcon
          size={size}
          round={false}
          logoFillColor={logoFillColor}
        ></TwitterIcon>
      </TwitterShareButton>
      <WhatsappShareButton
        className={'gtm--share_btn'}
        additionalProps={additionalProps}
        url={url}>
        <WhatsappIcon
          size={size}
          round={false}
          logoFillColor={logoFillColor}
        ></WhatsappIcon>
      </WhatsappShareButton>
      <RedditShareButton
        className={'gtm--share_btn'}
        additionalProps={additionalProps}
        url={url}>
        <RedditIcon
          size={size}
          round={false}
          logoFillColor={logoFillColor}
        ></RedditIcon>
      </RedditShareButton>
      <EmailShareButton
        className={'gtm--share_btn'}
        additionalProps={additionalProps}
        url={url}>
        <EmailIcon
          size={size}
          round={false}
          logoFillColor={logoFillColor}
        ></EmailIcon>
      </EmailShareButton>
    </div>
  )
}
export default Share

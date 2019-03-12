import React from 'react'
import * as PropTypes from 'prop-types'
import EpisodeCSSModule from './episode.module.css'

export default function CommentForm ({ t, episode, returnUrl }) {
  const INPUTS = [
    {
      tag: 'input',
      name: 'options[redirect]',
      type: 'hidden',
      value: returnUrl
    },
    {
      tag: 'input',
      name: 'options[slug]',
      type: 'hidden',
      value: episode.frontmatter.name
    },
    {
      tag: 'input',
      name: 'fields[slug]',
      type: 'hidden',
      value: episode.frontmatter.name
    },
    {
      tag: 'input',
      name: 'fields[name]',
      className: [
        EpisodeCSSModule.comment_form_name_input,
        'test--comment_form_name_input'
      ].join(' '),
      ariaLabel: t('comment_form_name'),
      placeholder: t('comment_form_name')
    },
    {
      tag: 'textarea',
      name: 'fields[message]',
      className: [
        EpisodeCSSModule.comment_form_message_input,
        'test--comment_form_message_input'
      ].join(' '),
      ariaLabel: t('comment_form_message'),
      placeholder: t('comment_form_message'),
      required: true
    },
  ]
  const makeInput = ({
    tag: TagName,
    name,
    type,
    value,
    className,
    ariaLabel,
    placeholder,
    required
  }) => {
    return <TagName
      name={name}
      type={type}
      value={value}
      className={className}
      aria-label={ariaLabel}
      placeholder={placeholder}
      required={required}
      disabled={true}
    ></TagName>
  }
  return <form
    className={ [
      EpisodeCSSModule.comment_form,
      'test--comment_form'
    ].join(' ') }
    method="POST"
    action={ 'https://staticman-fw.herokuapp.com/v2/entry/' +
    'nuxdie/frontendweekend/master/comment' }
  >
    {INPUTS.map(makeInput)}
    <button
      className={ [
        EpisodeCSSModule.comment_form_submit_btn,
        'test--comment_form_submit_btn'
      ].join(' ') }
      type="submit">
      { t('comment_form_submit_btn_cta') }
    </button>
  </form>
}

CommentForm.propTypes = {
  episode: PropTypes.any,
  t: PropTypes.func,
  returnUrl: PropTypes.string
}

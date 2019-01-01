const feedRead = require('davefeedread')
const path = require('path')
const fetch = require('node-fetch')
const fs = require('fs')
const moment = require('moment')

const FEED_URL = 'https://feeds.feedburner.com/frontendweekend'
const TIMEOUT = 30
const EPISODE_DIR = 'content/episode'
const CLIENT_ID = process.env['SOUNDCLOUD_CLIENT_ID']

const feedParse = (FEED_URL, TIMEOUT) => new Promise((resolve, reject) => {
  feedRead.parseUrl(FEED_URL, TIMEOUT, (err, feed) => {
    err ? reject(err) : resolve(feed)
  })
})

init()

async function init () {
  const feed = await feedParse(FEED_URL, TIMEOUT)
  const fullFeedInfo = await Promise.all(
    feed.items
      .map(getApiInfo)
  ).catch(console.error.bind(console))
  fullFeedInfo
    .map(template)
    .map(save)
}

function fullpath (filename) {
  return path.join(__dirname, EPISODE_DIR, filename)
}

function save (item) {
  console.log(`writing to ${ item.filename }`)
  fs.writeFileSync(fullpath(item.filename), item.body)
}

async function getApiInfo (feedItem) {
  const { enclosures: [{ url: podcastUrl }] } = feedItem
  const scTrackId = getScTrackId(podcastUrl)
  try {
    const apiResponse = await (fetch(`https://api.soundcloud.com/tracks/${ scTrackId }?client_id=${ CLIENT_ID }`)
      .then(res => res.json()))
    const {
      tag_list,
      license,
      playback_count,
      download_count,
      favoritings_count,
      reposts_count,
      comment_count,
      waveform_url,
    } = apiResponse
    feedItem.tag_list = tag_list
    feedItem.license = license
    feedItem.playback_count = playback_count
    feedItem.download_count = download_count
    feedItem.favoritings_count = favoritings_count
    feedItem.reposts_count = reposts_count
    feedItem.comment_count = comment_count
    feedItem.waveform_url = waveform_url

  } catch (e) {
    console.error(e)
  }
  feedItem.scTrackId = scTrackId
  return feedItem
}

function template (feedItem) {
  let {
    title,
    description,
    date,
    pubdate,
    link: scLink,
    guid,
    author,
    scTrackId,
    tag_list,
    license,
    playback_count,
    download_count,
    favoritings_count,
    reposts_count,
    comment_count,
    waveform_url,
    image: { url: image },
    enclosures: [{ url: podcastUrl, type: podcastType, length: podcastLength }],
    'itunes:duration': { '#': duration },
    'itunes:explicit': { '#': explicit },
    'itunes:subtitle': { '#': subtitle },
  } = feedItem
  const { name, num } = parseSCLink(scLink)
  image = https(image)
  podcastUrl = https(podcastUrl)
  explicit = explicit === 'no' ? 'false' : 'true'
  date = parseDate(date)
  description = sanitizeDescr(description)
  subtitle = constructSubtitle(description, subtitle)
  return {
    filename: `${ name }.md`,
    body: `---
title: ${ JSON.stringify(title) }
name: '${ name }'
num: '${ num }'
date: '${ date }'
scLink: '${ scLink }'
author: '${ author }'
image: '${ image }'
podcastUrl: '${ podcastUrl }'
scTrackId: '${ scTrackId }'
explicit: ${ explicit }
tag_list: '${ tag_list }'
license: '${ license }'
playback_count: '${ playback_count }'
download_count: '${ download_count }'
favoritings_count: '${ favoritings_count }'
reposts_count: '${ reposts_count }'
comment_count: '${ comment_count }'
waveform_url: '${ waveform_url }'
subtitle: ${ JSON.stringify(subtitle) }
---
${ description }`
  }
}

function getScTrackId (link) {
  return link.match(/stream\/(\d+)-/)[1]
}

function sanitizeDescr (description) {
  return description
    .replace('Хочешь поддержать Frontend Weekend, переходи на http://frontendweekend.ml ;)', '')
    .replace(/\d*:?\d\d:\d\d/gm, time => {
      let [, hours, minutes, seconds] = time.match(/(\d?\d?):?(\d\d):(\d\d)/)
      let sec = moment.duration({ hours, minutes, seconds }).asSeconds()
      return `<timecode sec="${ sec }">${ time }</timecode>`
    })
}

function constructSubtitle (description, subtitle) {
  var matched
  try {
    matched = description.match(/(.+)\r/)[1]
  } catch (e) {
    matched = subtitle
  }
  return matched
}

function https (link) {
  return link.replace('http', 'https')
}

function parseDate (date) {
  return moment(date).format()
}

function parseSCLink (link) {
  let name = ''

  let num = ''
  try {
    name = path.parse(new URL(link).pathname).name
    num = name.match(/(\d+)$/)[1]
  } catch (e) {
    console.warn('Couldnt parse scLink for name and num')
  }

  return {
    name,
    num
  }
}

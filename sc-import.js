const feedRead = require('davefeedread')
const path = require('path')
const fetch = require('node-fetch')
const fs = require('fs')
const moment = require('moment')
/* global URL */
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
    .map(normalize)
    .map(sanitize)
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
    const apiUrl = `https://api.soundcloud.com/tracks/` +
      `${ scTrackId }?client_id=${ CLIENT_ID }`
    await (
      fetch(apiUrl)
        .then(res => res.json())
        .then(parseApiResponse.bind(null, feedItem))
    )
  } catch (e) {
    console.error(e)
  }
  feedItem.scTrackId = scTrackId
  return feedItem
}

function parseApiResponse (feedItem, {
  tag_list: tagList,
  license,
  playback_count: playbackCount,
  download_count: downloadCount,
  favoritings_count: favoritingsCount,
  reposts_count: repostsCount,
  comment_count: commentCount,
  waveform_url: waveformUrl,
}) {
  feedItem.tag_list = tagList
  feedItem.license = license
  feedItem.playback_count = playbackCount
  feedItem.download_count = downloadCount
  feedItem.favoritings_count = favoritingsCount
  feedItem.reposts_count = repostsCount
  feedItem.comment_count = commentCount
  feedItem.waveform_url = waveformUrl
}

function normalize ({
  title,
  description,
  date,
  link: scLink,
  author,
  scTrackId,
  tag_list: tagList,
  license,
  playback_count: playbackCount,
  download_count: downloadCount,
  favoritings_count: favoritingsCount,
  reposts_count: repostsCount,
  comment_count: commentCount,
  waveform_url: waveformUrl,
  image: { url: image },
  enclosures: [{ url: podcastUrl }],
  'itunes:explicit': { '#': explicit },
  'itunes:subtitle': { '#': subtitle },
}) {
  return {
    title,
    description,
    date,
    scLink,
    author,
    scTrackId,
    tagList,
    license,
    playbackCount,
    downloadCount,
    favoritingsCount,
    repostsCount,
    commentCount,
    waveformUrl,
    image,
    podcastUrl,
    explicit,
    subtitle,
  }
}

function sanitize (item) {
  const { name, num } = parseSCLink(item.scLink)
  item.image = https(item.image)
  item.podcastUrl = https(item.podcastUrl)
  item.explicit = item.explicit === 'no' ? 'false' : 'true'
  item.date = parseDate(item.date)
  item.description = sanitizeDescr(item.description)
  item.subtitle = constructSubtitle(item.description, item.subtitle)
  item.name = name
  item.num = num
  return item
}

function template ({
  name,
  num,
  title,
  description,
  date,
  scLink,
  author,
  scTrackId,
  tagList,
  license,
  playbackCount,
  downloadCount,
  favoritingsCount,
  repostsCount,
  commentCount,
  waveformUrl,
  image,
  podcastUrl,
  explicit,
  subtitle,
}) {
  return {
    filename: `${ name }.md`,
    body: `---
title: ${ JSON.stringify(title) }
name: "${ name }"
num: "${ num }"
date: "${ date }"
scLink: "${ scLink }"
author: "${ author }"
image: "${ image }"
podcastUrl: "${ podcastUrl }"
scTrackId: "${ scTrackId }"
explicit: ${ explicit }
tag_list: "${ tagList }"
license: "${ license }"
playback_count: "${ playbackCount }"
download_count: "${ downloadCount }"
favoritings_count: "${ favoritingsCount }"
reposts_count: "${ repostsCount }"
comment_count: "${ commentCount }"
waveform_url: "${ waveformUrl }"
subtitle: ${ JSON.stringify(subtitle) }
---
${ description }`
  }
}

function getScTrackId (link) {
  return link.match(/stream\/(\d+)-/)[1]
}

function sanitizeDescr (description) {
  const bannerText = 'Хочешь поддержать Frontend Weekend, ' +
    'переходи на http://frontendweekend.ml ;)'
  description = description
    .replace(bannerText, '')
    .replace(/\d*:?\d\d:\d\d/gm, time => {
      let [, hours, minutes, seconds] = time.match(/(\d?\d?):?(\d\d):(\d\d)/)
      let sec = moment.duration({ hours, minutes, seconds }).asSeconds()
      return `<timecode sec="${ sec }">${ time }</timecode>`
    })
    if (description.match(/^<timecode/mg)) {
        description = description // fix YouTube style list codes
            .replace(/<timecode/gm, '<br><timecode')
            .replace('<br>', '') // remove 1st br tag
    }
  return description
}


function constructSubtitle (description, subtitle) {
  let matched
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

const feedRead = require('davefeedread')
const path = require('path')
const fs = require('fs')
const moment = require('moment')

const FEED_URL = 'https://feeds.feedburner.com/frontendweekend'
const TIMEOUT = 30
const EPISODE_DIR = 'content/episode'

feedRead.parseUrl(FEED_URL, TIMEOUT, function (err, feed) {
  if (err) {
    return console.error(err.message)
  }
  feed.items.map(template)
    .filter(exist)
    .forEach(save)
})

function exist({filename}) {
  let file = fullpath(filename)
  let exists = false
  try {
    fs.accessSync(file, fs.constants.F_OK)
    exists = true
  } catch (e) {
  }
  return !exists
}

function fullpath(filename) {
  return path.join(__dirname, EPISODE_DIR, filename)
}

function save(item) {
  console.log(`writing to ${item.filename}`)
  fs.writeFileSync(fullpath(item.filename), item.body)
}

function template({
                    title,
                    description,
                    date,
                    pubdate,
                    link: scLink,
                    guid,
                    author,
                    image: {url: image},
                    enclosures: [{url: podcastUrl, type: podcastType, length: podcastLength}],
                    'itunes:duration': {'#': duration},
                    'itunes:explicit': {'#': explicit},
                    'itunes:subtitle': {'#': subtitle},
                  }) {
  const {name, num} = parseSCLink(scLink)
  image = https(image)
  podcastUrl = https(podcastUrl)
  explicit = explicit === 'no' ? 'false' : 'true'
  date = parseDate(date)
  description = sanitizeDescr(description)
  subtitle = constructSubtitle(description, subtitle)
  const scTrackId = getScTrackId(podcastUrl)
  return {
    filename: `${name}.md`,
    body: `---
title: ${JSON.stringify(title)}
name: '${name}'
num: '${num}'
date: '${date}'
scLink: '${scLink}'
author: '${author}'
image: '${image}'
podcastUrl: '${podcastUrl}'
scTrackId: '${scTrackId}'
explicit: ${explicit}
subtitle: ${JSON.stringify(subtitle)}
---
${description}`
  }
}

function getScTrackId (link) {
  return link.match(/stream\/(\d+)-/)[1]
}

function sanitizeDescr(description) {
  return description
    .replace('Хочешь поддержать Frontend Weekend, переходи на http://frontendweekend.ml ;)', '')
    .replace(/\d*:?\d\d:\d\d/gm, time => {
      let [, hours, minutes, seconds] = time.match(/(\d?\d?):?(\d\d):(\d\d)/)
      let sec = moment.duration({ hours, minutes, seconds }).asSeconds()
      return `<timecode sec="${sec}">${time}</timecode>`
    })
}

function constructSubtitle(description, subtitle) {
  var matched
  try {
    matched = description.match(/(.+)\r/)[1]
  } catch (e) {
    matched = subtitle
  }
  return matched
}

function https(link) {
  return link.replace('http', 'https')
}

function parseDate(date) {
  return moment(date).format()
}

function parseSCLink(link) {
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

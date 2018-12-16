const feedRead = require('davefeedread')
const path = require('path')
const fs = require('fs')

const FEED_URL = 'http://feeds.feedburner.com/frontendweekend'
const TIMEOUT = 30

feedRead.parseUrl(FEED_URL, TIMEOUT, function (err, feed) {
  if (err) {
    return console.error(err.message)
  }
  feed.items.map(template)
    .filter(exist)
    .forEach(save)
})

function exist ({ filename }) {
  let file = fullpath(filename)
  let exists = false
  try {
    fs.accessSync(file, fs.constants.F_OK)
    exists = true
  } catch (e) {}
  return !exists
}

function fullpath (filename) {
  return path.join(__dirname, 'src/pages/episode', filename)
}

function save (item) {
  console.log(`writing to ${ item.filename }`)
  fs.writeFileSync(fullpath(item.filename), item.body)
}

function template ({
  title,
  description,
  date,
  pubdate,
  link: scLink,
  guid,
  author,
  image: { url: image },
  enclosures: [ { url: podcastUrl, type: podcastType, length: podcastLength } ],
  'itunes:duration': { '#': duration },
  'itunes:explicit': { '#': explicit },
  'itunes:subtitle': { '#': subtitle },
}) {
  const { name, num } = parseSCLink(scLink)

  return {
    filename: `${ name }.md`,
    body: `---
title: "${ title }"
name: "${ name }"
num: "${ num }"
date: "${ date }"
pubdate: "${ pubdate }"
scLink: "${ scLink }"
guid: "${ guid }"
author: "${ author }"
image: "${ image }"
podcastUrl: "${ podcastUrl }"
podcastType: "${ podcastType }"
podcastLength: "${ podcastLength }"
duration: "${ duration }"
explicit: "${ explicit }"
subtitle: "${ subtitle }"
---
${ description }`
  }
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
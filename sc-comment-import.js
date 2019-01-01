const path = require('path')
const fetch = require('node-fetch')
const fs = require('fs-extra')
const moment = require('moment')
const { readEpisodeFile } = require('./import/helpers')

const EPISODE_MD_DIR = path.join(__dirname, './content/episode')
const COMMENT_DIR = path.join(__dirname, './content/comment')
const CLIENT_ID = process.env['SOUNDCLOUD_CLIENT_ID']

async function init () {
  const episodes = await fs.readdir(EPISODE_MD_DIR)
  const contents = await Promise.all(
    episodes
      .map(readEpisodeFile)
  )

  await Promise.all(contents.map((f) => {
    f.contents += ''
    return f
  })
    .map( async ({file, contents}) => {
      const scTrackId = contents.match(/scTrackId: '(.+)'/)[1]
      const name = contents.match(/name: '(.+)'/)[1]
      let comments
      try {
        comments = await getComments(scTrackId)
        comments
          .map(template.bind(null, name))
          .map(writeToFile)
      } catch (e) {
        console.error(e)
      }
    }))
}

function template (slug, {
                     id,
                     created_at,
                     timestamp,
                     track_id,
                     body: message,
  user: {
    username,
    avatar_url
  }
                   }) {
  const date = moment(created_at, 'YYYY/MM/DD HH:mm:ss Z').unix()
  return {file: `sc-entry${date}.yml`,
    body:`_id: '${id}'
slug: ${slug}
message: ${JSON.stringify(message)}
timestamp: ${(timestamp/1000|0)}
created_at: '${created_at}'
date: ${date}
username: ${username}
avatar: ${avatar_url}
`}
}

function getComments(scTrackId) {
  return fetch(`https://api.soundcloud.com/tracks/${scTrackId}/comments?client_id=${CLIENT_ID}`)
    .then(res => res.json())
}

function writeToFile({body, file}) {
  const destPath = path.join(COMMENT_DIR, file)
  console.log(`comment ${file} downloaded to ${destPath}`)
  try {
    fs.writeFileSync(destPath, body)
  } catch (e) {
    console.error(e)
  }
}

try {
  init()
} catch (e) {
  console.log(e)
}

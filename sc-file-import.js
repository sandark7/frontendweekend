const path = require('path')
const fs = require('fs-extra')
const cp = require('child_process')
const { readEpisodeFile } = require('./import/helpers')

const EPISODE_MD_DIR = path.join(__dirname, './content/episode')
const ASSET_FILE_DIR = path.join(__dirname, './static/assets')

async function init () {
  const episodes = await fs.readdir(EPISODE_MD_DIR)
  const contents = await Promise.all(
    episodes
      .map(readEpisodeFile)
  )

  contents.map((f) => {
    f.contents += ''
    return f
  })
    .filter(({file, contents}) => {
      let podcastFile
      try {
        podcastFile = contents.match(/podcastFile: (.+)/)[1]
      } catch (e) {
        return true
      }
      return !podcastFile || !podcastFile.length
    })
    .map( ({file, contents}) => {
      const podcastUrl = contents.match(/podcastUrl: '(.+)'/)[1]
      try {
        downloadFile(podcastUrl, ASSET_FILE_DIR)
        writeToFile(
          path.join(EPISODE_MD_DIR, file),
          contents,
          path.join('/assets/', path.parse(new URL(podcastUrl).pathname).base)
        )
      } catch (e) {
        console.error(e)
      }
    })
}

function downloadFile(url, dest) {
  try {
    console.log(`downloading ${url}`)
    cp.execSync(`cd ${dest} && wget --no-check-certificate ${url}`)
  } catch (e) {
    console.error(e)
  }
}

function writeToFile(file, originalContents, downloadedPath) {
  console.log(`file ${file} downloaded to ${downloadedPath}`)
  const array = originalContents.toString().split("\n")
  array.splice(4, 0, `podcastFile: ${downloadedPath}`)
  fs.writeFileSync(file, array.join('\n'))
}

try {
  init()
} catch (e) {
  console.log(e);
}

const fs = require('fs-extra')
const path = require('path')

const EPISODE_MD_DIR = path.join(__dirname, '../content/episode')

const readEpisodeFile = async file => {
  return {
    contents: await fs.readFile(path.join(EPISODE_MD_DIR, file)),
    file
  }
}

module.exports = {
  readEpisodeFile
}

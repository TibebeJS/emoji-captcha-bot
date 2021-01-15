const fs = require('fs')
const chunk = require('lodash.chunk')
const shuffle = require('./shuffle')

module.exports = function () {
  const emojis = shuffle(fs.readdirSync('./emojis')).slice(0, 9)

  return emojis.map(emoji => ({
    char: emoji,
    hex: chunk(emoji.slice(0, emoji.length - 4), 8)
      .map(
        part => String.fromCodePoint(parseInt(part.join(''), 16))
      )
      .join('')
  }))
}

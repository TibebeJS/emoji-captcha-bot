// *** DO NOT MODIFY FILE CONTENT ***
// This file is used to load the other config files.
// You don't need to edit this file for configuration.
// To change configuration - modify the json5 files in the "developement" folder

const fs = require('fs');
const JSON5 = require('json5')

module.exports = {
  bot: JSON5.parse(fs.readFileSync(__dirname + '/development/bot.json5'))
}
const { Markup } = require('telegraf')
const chunk = require('lodash.chunk');

module.exports = (emojis) => {
    return Markup.inlineKeyboard(
        chunk(emojis.map(emoji => Markup.button.callback(emoji, 'something')), 4)
    )
}
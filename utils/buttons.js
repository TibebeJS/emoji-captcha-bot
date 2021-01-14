const { Markup } = require('telegraf')
const chunk = require('lodash.chunk');

module.exports = (emojis) => {
    return {
        ...Markup.inlineKeyboard(
            chunk(emojis.map(emoji => Markup.button.callback(emoji.hex, emoji.char)), 3)
        ), parse_mode: "HTML",
    }
}
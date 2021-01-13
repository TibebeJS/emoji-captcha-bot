const { Telegraf } = require('telegraf')
const { config } = require('dotenv')
config()

const { pickRandomEmojis, generateBtns } = require('./utils')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('message', async (ctx) => {
    const emojis = await pickRandomEmojis()
    await bot.telegram.sendMessage(700867545, 'solve this:', generateBtns(emojis))
})

bot.launch()

const { Telegraf } = require('telegraf')
const { config } = require('dotenv')
config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.launch()
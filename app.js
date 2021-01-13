const { Telegraf } = require('telegraf')
const { config } = require('dotenv')
config()

const { generateBtns } = require('./utils')
const { EmojiCaptcha } = require('./core')

const bot = new Telegraf(process.env.BOT_TOKEN)

const captcha = new EmojiCaptcha()

bot.action(/([a-fA-F0-9]{8,16})\.png/, async ctx => {
    try {
        const isCorrect = captcha.check(ctx.match[0])
        if (isCorrect) {
            await ctx.answerCbQuery(`✅ That's correct!`)
        }
        else {
            await ctx.editMessageText(
                `
Please select the emojis you see here:

${captcha.presentedEmojis.map(x => x.hex).join('-')}

<b>Attempts left:</b> ${captcha.attemptsLeft}
`,
                {
                    reply_markup: ctx.callbackQuery.message.reply_markup,
                    parse_mode: "HTML"
                }
            )
            await ctx.answerCbQuery(`❌ That's incorrect! focus!`)
        }
    } catch (error) {
        if (error.message == 'no attempts left') {
            await ctx.editMessageText(`You have failed the captcha.`)
        } else {
            console.error(error)
        }
    }
})

bot.launch()

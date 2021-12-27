const { Telegraf } = require('telegraf')

const config = require("./config");

const LocalSession = require('telegraf-session-local')

const { generateBtns } = require('./utils')
const { EmojiCaptcha, CaptchaStatus } = require('./core')

const bot = new Telegraf(config.core.botToken)

bot.use((new LocalSession({
  database: 'captcha_db.json',
  property: 'session',
  getSessionKey: (ctx) => {
    if (ctx.callbackQuery) {
      return `${ctx.callbackQuery.from.id}:${ctx.callbackQuery.message.chat.id}`
    } else if (ctx.from && ctx.chat) {
      return `${ctx.from.id}:${ctx.chat.id}`
    }
    return undefined
  }
})).middleware())

// bot.use(async (ctx, next) => {
//   ctx.state.captcha = Object.keys(ctx.session).length === 0 ? new EmojiCaptcha() : EmojiCaptcha.from(ctx.session)
//   const result = await next()
//   ctx.session = JSON.parse(JSON.stringify(ctx.state.captcha))
//   return result
// })

bot.on('message', async (ctx) => {
  if (ctx.message && ctx.message.new_chat_members && ctx.message.new_chat_members.length) {
    for (const newMember of ctx.message.new_chat_members) {
      try {
        if (newMember.is_bot) {
          await ctx.replyWithHTML(`@${newMember.username} is a bot.`)
        } else {
          await ctx.telegram.restrictChatMember(ctx.message.chat.id, newMember.id)
          await ctx.replyWithHTML(`Dear &lt;${newMember.first_name}&gt;, new members are automatically muted.
Please solve the following captcha to be unmuted.
      `)

          ctx.state.captcha = Object.keys(ctx.session).length === 0 ? new EmojiCaptcha() : EmojiCaptcha.from(ctx.session)
          ctx.session = JSON.parse(JSON.stringify(ctx.state.captcha))

          if (ctx.state.captcha.status === CaptchaStatus.PASS) {
            await ctx.reply('You have already passed the captcha.')
          } else if (ctx.state.captcha.status === CaptchaStatus.FAILED) {
            await ctx.reply('You have failed the captcha.')
          } else if (ctx.state.captcha.status === CaptchaStatus.EXPIRED) {
            await ctx.reply('The captcha has expired.')
          } else {
            await ctx.reply(
              `
Please select the emojis you see here:

${ctx.state.captcha.presentedEmojis.map(x => x.hex).join('-')}

<b>Attempts left:</b> ${ctx.state.captcha.attemptsLeft}
`,

              generateBtns(ctx.state.captcha.choices)
            )
          }

        }
      } catch (err) {
        console.error(err)
      }
    }
  }
})

// bot.on('message', async (ctx) => {
//   if (ctx.state.captcha.status === CaptchaStatus.PASS) {
//     await ctx.reply('You have already passed the captcha.')
//   } else if (ctx.state.captcha.status === CaptchaStatus.FAILED) {
//     await ctx.reply('You have failed the captcha.')
//   } else if (ctx.state.captcha.status === CaptchaStatus.EXPIRED) {
//     await ctx.reply('The captcha has expired.')
//   } else {
//     await ctx.reply(
//       `
// Please select the emojis you see here:

// ${ctx.state.captcha.presentedEmojis.map(x => x.hex).join('-')}

// <b>Attempts left:</b> ${ctx.state.captcha.attemptsLeft}
// `,

//       generateBtns(ctx.state.captcha.choices)
//     )
//   }
// })

bot.action(/([a-fA-F0-9]{8,16})\.png/, async ctx => {
  try {
    const isCorrect = ctx.state.captcha.check(ctx.match[0])
    if (isCorrect) {
      await ctx.answerCbQuery('✅ That\'s correct!')
    } else {
      await ctx.editMessageText(
        `
Please select the emojis you see here:

${ctx.state.captcha.presentedEmojis.map(x => x.hex).join('-')}

<b>Attempts left:</b> ${ctx.state.captcha.attemptsLeft}
`,
        {
          reply_markup: ctx.callbackQuery.message.reply_markup,
          parse_mode: 'HTML'
        }
      )
      await ctx.answerCbQuery('❌ That\'s incorrect! focus!')
    }
  } catch (error) {
    if (error.message === 'no attempts left') {
      await ctx.editMessageText('You have failed the captcha.')
    } else {
      console.error(error)
    }
  }
})

// await ctx.reply(
//   `
// Please select the emojis you see here:

// ${ctx.state.captcha.presentedEmojis.map(x => x.hex).join('-')}

// <b>Attempts left:</b> ${ctx.state.captcha.attemptsLeft}
// `,

//   generateBtns(ctx.state.captcha.choices)
// )

bot.launch()
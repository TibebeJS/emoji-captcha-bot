const { pickRandomEmojis, shuffle } = require('../utils')

exports.EmojiCaptcha = class {
  constructor () {
    const emojis = pickRandomEmojis(15)

    this.correctlyAnswered = []
    this.correctSolutions = emojis.slice(0, 5)
    this.presentedEmojis = this.correctSolutions.concat(emojis.slice(12, 15))
    this.choices = shuffle(emojis.slice(0, 12))

    this.attemptsLeft = 3

    this.status = false
  }

  check (answer) {
    if (this.haveFailed || this.attemptsLeft < 1) {
      this.haveFailed = true
      throw new Error('no attempts left')
    }

    const isCorrect = this.correctSolutions.map(x => x.char).includes(answer)

    if (!isCorrect) this.attemptsLeft--
    else this.correctlyAnswered.push(answer)

    return isCorrect
  }

  static from (json) {
    const captcha = new exports.EmojiCaptcha()
    captcha.correctlyAnswered = json.correctlyAnswered
    captcha.correctSolutions = json.correctSolutions
    captcha.presentedEmojis = json.presentedEmojis
    captcha.choices = json.choices
    captcha.attemptsLeft = json.attemptsLeft
    captcha.haveFailed = json.haveFailed
    return captcha
  }
}

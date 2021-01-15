const { pickRandomEmojis, shuffle } = require('../utils')

const CaptchaStatus = exports.CaptchaStatus = Object.freeze({
  FAILED: 'FAILED',
  PASS: 'PASS',
  ON_PROGRESS: 'ON_PROGRESS',
  EXPIRED: 'EXPIRED'
})

exports.EmojiCaptcha = class {
  constructor () {
    const emojis = pickRandomEmojis(15)

    this.correctlyAnswered = []
    this.correctSolutions = emojis.slice(0, 5)
    this.presentedEmojis = this.correctSolutions.concat(emojis.slice(12, 15))
    this.choices = shuffle(emojis.slice(0, 12))

    this.attemptsLeft = 3

    this.status = CaptchaStatus.ON_PROGRESS
  }

  check (answer) {
    if (this.status === CaptchaStatus.ON_PROGRESS && this.attemptsLeft < 1) {
      this.status = CaptchaStatus.FAILED
      throw new Error('no attempts left')
    }

    if (this.status === CaptchaStatus.PASS) {
      throw new Error('you have already passed the captcha')
    } else if (this.status === CaptchaStatus.FAILED) {
      throw new Error('you have failed the captcha')
    } else if (this.status === CaptchaStatus.EXPIRED) {
      throw new Error('the captcha has expired.')
    }

    const isCorrect = this.correctSolutions.map(x => x.char).includes(answer)

    if (!isCorrect) this.attemptsLeft--
    else this.correctlyAnswered.push(answer)

    return isCorrect
  }

  static from (obj) {
    const captcha = new exports.EmojiCaptcha()
    captcha.correctlyAnswered = obj.correctlyAnswered
    captcha.correctSolutions = obj.correctSolutions
    captcha.presentedEmojis = obj.presentedEmojis
    captcha.choices = obj.choices
    captcha.attemptsLeft = obj.attemptsLeft
    captcha.status = obj.status
    return captcha
  }
}

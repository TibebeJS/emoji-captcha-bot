const { pickRandomEmojis, shuffle } = require('../utils')

exports.EmojiCaptcha = class {
    constructor() {
        const emojis = pickRandomEmojis(15)

        this.correctlyAnswered = []
        this.correctSolutions = emojis.slice(0, 5)
        this.presentedEmojis = this.correctSolutions.concat(emojis.slice(12, 15))
        this.choices = shuffle(emojis.slice(0, 12))

        this.attemptsLeft = 3
    }

    check(answer) {

        if (this.attemptsLeft <= 1) throw new Error('no attempts left')

        const isCorrect = this.correctSolutions.map(x => x.char).includes(answer)

        if (!isCorrect) this.attemptsLeft--;
        else this.correctlyAnswered.push(answer)

        return isCorrect
    }

}
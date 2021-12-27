process.env["NODE_CONFIG_DIR"] = __dirname

const config = require("config");


function makeSureTheseConfigsExist(requiredConfigs) {
    for (const c of requiredConfigs) {
        if (!config.has(c)) {
            console.log(`[config error] ${c} not found`)
            process.exit(1)
        }
    }    
}
makeSureTheseConfigsExist([
    "core.botToken",
    "core.challenge"
])

if (config.core.challenge === 'text-emoji') {
    makeSureTheseConfigsExist([
        "textEmojiChallenge.challengeEmojisCount",
        "textEmojiChallenge.answerEmojisColumns",
        "textEmojiChallenge.answerEmojisRows",
        "textEmojiChallenge.emojiSeparator",
        "textEmojiChallenge.numberOfAttempts",
        "textEmojiChallenge.timeout",
        "textEmojiChallenge.emojiBlacklist",
        "textEmojiChallenge.showCountryFlags",
    ])
}

module.exports = config;
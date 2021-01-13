const fs = require('fs').promises
const chunk = require('lodash.chunk');
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

module.exports = async function () {
    const emojis = shuffle(await fs.readdir('./emojis')).slice(0, 9)

    return emojis.map(emoji => ({
        char: emoji,
        hex: chunk(
            emoji
                .slice(0, emoji.length - 4), 8)
                .map(
                    part => String.fromCodePoint(parseInt(part.join(''), 16))
                )
                .join('')
    }))
}
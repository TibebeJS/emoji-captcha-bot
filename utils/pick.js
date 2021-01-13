const fs = require('fs').promises

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

    return emojis.map(emoji => String.fromCodePoint(parseInt(emoji, 16)))
}
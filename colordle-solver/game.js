const { colors, maxGuesses, hiddenColorCount } = require("./config.js");

class Game {
    constructor() {
        this.colors = colors;
        this.maxGuessCount = maxGuesses;
        this.hiddenColorCount = hiddenColorCount;

        // 'initial' | 'initialized' | 'won' | 'lost'
        this.state = 'initial';

        this.hiddenColors = null;
        this.currentGuessCount = 0;
        Game.game = this;
    }

    init() {
        this.hiddenColors = [];
        for (let i = 0; i < this.hiddenColorCount; i++) {
            const hiddenColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.hiddenColors.push(hiddenColor);
        }
        this.state = 'initialized';
    }

    respondToGuess(guessColors) {
        if (this.state !== 'initialized') {
            throw new Error("Game either not initialized or is over");
        }
        if (guessColors.length !== this.hiddenColorCount) {
            throw new Error("Guess colors count does not match hidden color count");
        }
        const response = {
            correctColorCount: 0,
            correctPositionCount: 0,
        }

        const freqMap = {};
        this.hiddenColors.forEach((color) => {
            if (freqMap[color]) {
                freqMap[color]++;
            } else {
                freqMap[color] = 1;
            }
        });

        for (let i = 0; i < guessColors.length; i++) {
            // if (this.hiddenColors.includes(guessColors[i])) {
            //     response.correctColorCount += 1;
            // }
            if (freqMap[guessColors[i]] && freqMap[guessColors[i]] > 0) {
                freqMap[guessColors[i]]--;
                response.correctColorCount += 1;
            }

            if (this.hiddenColors[i] === guessColors[i]) {
                response.correctPositionCount += 1;
            }
        }

        this.currentGuessCount += 1;
        if (this.currentGuessCount === this.maxGuessCount) {
            this.state = 'lost';
        }
        if (response.correctPositionCount === this.hiddenColorCount) {
            this.state = 'won';
        }
        return response;
    }
}

module.exports = {
    Game,
}
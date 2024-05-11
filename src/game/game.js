import { colors, maxGuesses, hiddenColorCount } from "../config.js"

export class Game {
    constructor() {
        this.colors = colors;
        this.maxGuesses = maxGuesses;
        this.hiddenColorCount = hiddenColorCount;

        this.hiddenColors = null;
    }

    init() {
        console.log('Setting hidden colors');
        this.hiddenColors = [];
        for (let i = 0; i < this.hiddenColorCount; i++) {
            const hiddenColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.hiddenColors.push(hiddenColor);
        }
    }

    respondToGuess(guessColors) {
        if (guessColors.length !== this.hiddenColorCount) {
            throw new Error("Guess colors count does not match hidden color count");
        }
        const response = {
            correctColorCount: 0,
            correctPositionCount: 0,
        }
        for (let i = 0; i < guessColors.length; i++) {
            if (this.hiddenColors.includes(guessColors[i])) {
                response.correctColorCount += 1;
            }

            if (this.hiddenColors[i] === guessColors[i]) {
                response.correctPositionCount += 1;
            }
        }
        return response;
    }
}
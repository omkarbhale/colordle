const { colors, hiddenColorCount, maxGuesses } = require("./config");
const { Game } = require('./game');

class Constraint {
    constructor(resolver) {
        this.resolver = resolver;
    }

    satisfies(guess) {
        const satisfies = this.resolver(guess);
        return satisfies;
    }

    static createConstraints(originalGuess, response) {
        const resolverColorCount = (guess) => {
            const originalGuessMap = {};
            const newGuessMap = {};

            for (const i of originalGuess) {
                originalGuessMap[i] = originalGuessMap[i] ? originalGuessMap[i] + 1 : 1;
            }
            for (const i of guess) {
                newGuessMap[i] = newGuessMap[i] ? newGuessMap[i] + 1 : 1;
            }

            // If less than response.correctColorCount are moved from originalGuess to guess, then
            // guess is 100% incorrect
            let count = 0;
            for (const i in originalGuessMap) {
                count += Math.min(originalGuessMap[i], newGuessMap[i] || 0);
                originalGuessMap[i] = 0;
            }
            for (const i in newGuessMap) {
                count += Math.min(originalGuessMap[i] || 0, newGuessMap[i]);
                newGuessMap[i] = 0;
            }
            return count >= response.correctColorCount;
        };

        const resolverPositionCount = (guess) => {
            let matchedPositionCount = 0;
            for (let i = 0; i < hiddenColorCount; i++) {
                if (guess[i] === originalGuess[i]) {
                    matchedPositionCount++;
                }
            }
            return matchedPositionCount === response.correctPositionCount;
        }

        return [new Constraint(resolverColorCount), new Constraint(resolverPositionCount)];
    }
}

class Solver {
    constructor(game) {
        this.game = game;
        this.constraints = [];
    }

    listPossibleGuesses() {
        const guesses = Solver.generateSequences(4);
        return guesses.filter(guess => {
            // Guess should satisfy all constraints
            return this.constraints.length === 0 || this.constraints.every(constraint => constraint.satisfies(guess));
        });
    }

    makeGuess() {
        const possibleGuesses = this.listPossibleGuesses();
        console.log(`Possible guesses: ${possibleGuesses.length}`);
        // const guess = possibleGuesses[0];
        const guess = possibleGuesses[Math.floor(Math.random() * possibleGuesses.length)];
        const guessValues = guess.map((guessIndex) => {
            return colors[guessIndex]
        });

        const response = this.game.respondToGuess(guessValues);
        this.constraints.push(...Constraint.createConstraints(guess, response));
        console.log(guessValues);
        console.log(response);
    }

    static generateSequences(sequenceLength, currentSequence = [], allSequences = []) {
        const maxNumber = 8;

        if (currentSequence.length === sequenceLength) {
            allSequences.push([...currentSequence]);
            return allSequences;
        }

        for (let i = 0; i < maxNumber; i++) {
            currentSequence.push(i);
            Solver.generateSequences(sequenceLength, currentSequence, allSequences);
            currentSequence.pop();
        }

        return allSequences;
    }
}

module.exports = {
    Solver,
}

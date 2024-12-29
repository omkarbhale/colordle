const { Game } = require("./game");
const { Solver } = require("./solver");

console.log("Main.js!");

const main = async () => {
    const numGames = 1;
    let guesses = 0;
    for (let i = 0; i < numGames; i++) {
        const game = new Game();
        game.init();
        
        console.log('--------------------------------------------------------');
        const solver = new Solver(game);
        while (game.state === 'initialized') solver.makeGuess();
        console.log(game.state.toUpperCase() + ': Took ' + game.currentGuessCount + ' guesses');
        console.log('--------------------------------------------------------');
        guesses += game.currentGuessCount;
    }
    console.log(`Average guess: ${guesses / numGames}`);
};

main();
import { Game } from "./game/game.js";
import { Game as GameBoard } from "./ui/game.js";

console.log("Main.js!");

const main = async () => {
    window.game = new Game();
    window.game.init();

    const gameContainer = document.querySelector("#game-container");
    window.board = new GameBoard(gameContainer);
};

main();
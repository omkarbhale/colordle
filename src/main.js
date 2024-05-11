import { Game } from "./game/game.js";

console.log("Main.js!");

const main = async () => {
    window.game = new Game();
    window.game.init();
};

main();
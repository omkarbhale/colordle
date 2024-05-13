import { Board } from "./board.js";

// Consists of game response, game board, and color palette
export class Game {
    constructor(parentContainer) {
        this.root = parentContainer;

        this.board = new Board();

        this.root.appendChild(this.board.root);
    }
}
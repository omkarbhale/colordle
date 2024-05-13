import { hiddenColorCount, maxGuesses } from "../config.js";

export class Board {
    constructor() {
        this.root = document.createElement('div');
        this.init();
    }

    init() {
        this.root.classList.add('board');
        const top = document.createElement('div');
        const grid = document.createElement('div');
        top.classList.add('top');
        grid.classList.add('grid');

        for (let i = 0; i < hiddenColorCount; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle', 'hidden');
            top.appendChild(circle);
        }
        for (let i = 0; i < hiddenColorCount * maxGuesses; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            if (Math.floor(i / 4) === maxGuesses - 1) {
                circle.classList.add('next-up');
            }
            grid.appendChild(circle);
        }

        this.root.appendChild(top);
        this.root.appendChild(grid);
    }
}
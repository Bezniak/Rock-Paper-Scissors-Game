const Game = require('./Game');
const HelpTable = require('./HelpTable');
const moves = process.argv.slice(2);


if (moves.length < 3 || moves.length % 2 === 0 || new Set(moves).size !== moves.length) {
    console.error("Invalid input. Please provide an odd number (≥ 3) of unique moves.");
    console.error("Example usage: node index.js Rock Paper Scissors");
    process.exit(1);
}

const helpTable = new HelpTable(moves);
helpTable.printTable();

const game = new Game(moves);
game.play();

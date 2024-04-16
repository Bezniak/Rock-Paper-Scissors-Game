const readline = require('readline');
const CryptoHelper = require("./CryptoHelper");
const {GameRules} = require("./GameRules");

class Game {
    constructor(moves) {
        this.moves = moves;
        this.gameRules = new GameRules(moves);
        this.key = CryptoHelper.generateKey(256);
        this.computerMove = this.moves[Math.floor(Math.random() * this.moves.length)];
    }

    async play() {
        console.log(`HMAC: ${CryptoHelper.calculateHMAC(this.computerMove, this.key)}`);
        console.log("Available moves:");
        this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
        console.log("0 - Exit");

        const playerMoveIndex = await this.getPlayerMove();
        if (playerMoveIndex === 0) {
            console.log("Exiting the game.");
            return;
        }

        const playerMove = this.moves[playerMoveIndex - 1];
        console.log(`Player move: ${playerMove}`);
        console.log(`Computer move: ${this.computerMove}`);

        const winner = this.gameRules.determineWinner(playerMove, this.computerMove);
        console.log(`Winner: ${winner}`);
        console.log(`Key: ${this.key}`);
    }

    async getPlayerMove() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question("Enter your move: ", (answer) => {
                rl.close();
                const moveIndex = parseInt(answer);
                if (moveIndex >= 0 && moveIndex <= this.moves.length) {
                    resolve(moveIndex);
                } else {
                    console.log("Invalid move. Please enter a valid move.");
                    resolve(this.getPlayerMove());
                }
            });
        });
    }
}

module.exports = Game;

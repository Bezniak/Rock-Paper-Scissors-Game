class GameRules {
    constructor(moves) {
        this.moves = moves;
        this.rules = this.generateRules();
    }

    generateRules() {
        const numMoves = this.moves.length;
        const rules = {};
        for (let i = 0; i < numMoves; i++) {
            const currentMove = this.moves[i];
            const beats = [];
            for (let j = 1; j <= numMoves / 2; j++) {
                beats.push(this.moves[(i + j) % numMoves]);
            }
            rules[currentMove] = beats;
        }
        return rules;
    }

    determineWinner(playerMove, computerMove) {
        if (playerMove === computerMove) return "Draw";

        // Проверяем, является ли ход компьютера "слабым" для хода игрока
        if (this.rules[playerMove].includes(computerMove)) return "Computer";

        // В противном случае, ход компьютера является "сильным", и игрок побеждает
        return "Player";
    }
}

module.exports.GameRules = GameRules;
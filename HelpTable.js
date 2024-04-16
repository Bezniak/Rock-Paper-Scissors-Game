class HelpTable {
    constructor(moves) {
        this.moves = moves;
        this.table = this.generateTable();
    }

    generateTable() {
        const numMoves = this.moves.length;
        const table = [['Moves', ...this.moves]];
        for (let i = 0; i < numMoves; i++) {
            const row = [this.moves[i]];
            for (let j = 0; j < numMoves; j++) {
                row.push(this.getWinnerText(this.moves[i], this.moves[j]));
            }
            table.push(row);
        }
        return table;
    }

    getWinnerText(move1, move2) {
        const winner = this.moves.indexOf(move2) - this.moves.indexOf(move1);
        if (winner === 0) return "Draw";
        if (winner % 2 === 1 || winner === -(this.moves.length - 1)) return "Win";
        return "Lose";
    }

    printTable() {
        console.log("Help Table:");
        this.table.forEach(row => console.log(row.join('\t')));
    }
}

module.exports = HelpTable;

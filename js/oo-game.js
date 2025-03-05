class Board {
    #cells;  // private field

    constructor() {
        this.#cells = Array(9).fill(null);
    }

    getCells() {
        return [...this.#cells]; // Return copy to prevent direct mutation
    }

    makeMove(index, symbol) {
        if (this.isValidMove(index)) {
            this.#cells[index] = symbol;
            return true;
        }
        return false;
    }

    isValidMove(index) {
        return this.#cells[index] === null;
    }

    getWinner() {
        const winPatterns = this.#getWinPatterns();
        return winPatterns.reduce((winner, pattern) => {
            if (winner) return winner;
            const [a, b, c] = pattern;
            if (this.#cells[a] && 
                this.#cells[a] === this.#cells[b] && 
                this.#cells[a] === this.#cells[c]) {
                return this.#cells[a];
            }
            return null;
        }, null);
    }

    #getWinPatterns() {
        return [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
    }

    isFull() {
        return !this.#cells.includes(null);
    }
}

class GameUI {
    #boardElement;
    #statusElement;
    #restartButton;

    constructor() {
        this.#boardElement = document.getElementById('board');
        this.#statusElement = document.getElementById('status');
        this.#restartButton = document.getElementById('restart');
    }

    renderBoard(cells, clickHandler) {
        this.#boardElement.innerHTML = '';
        cells.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = index;
            cell.textContent = value || '';
            cell.addEventListener('click', () => clickHandler(cell));
            this.#boardElement.appendChild(cell);
        });
    }

    updateStatus(message) {
        this.#statusElement.textContent = message;
    }

    onRestart(handler) {
        this.#restartButton.addEventListener('click', handler);
    }
}

class Game {
    #board;
    #ui;
    #currentPlayer;
    #gameActive;

    constructor() {
        this.#board = new Board();
        this.#ui = new GameUI();
        this.#currentPlayer = 'X';
        this.#gameActive = true;

        this.#initialize();
    }

    #initialize() {
        this.#ui.renderBoard(this.#board.getCells(), cell => this.#handleCellClick(cell));
        this.#ui.onRestart(() => this.#restart());
        this.#updateStatus();
    }

    #handleCellClick(cell) {
        if (!this.#gameActive) return;
        
        const index = cell.dataset.index;
        if (this.#board.makeMove(index, this.#currentPlayer)) {
            this.#ui.renderBoard(this.#board.getCells(), cell => this.#handleCellClick(cell));
            this.#checkGameState();
            this.#currentPlayer = this.#currentPlayer === 'X' ? 'O' : 'X';
            this.#updateStatus();
        }
    }

    #checkGameState() {
        const winner = this.#board.getWinner();
        if (winner) {
            this.#gameActive = false;
            this.#ui.updateStatus(`Player ${winner} wins!`);
        } else if (this.#board.isFull()) {
            this.#gameActive = false;
            this.#ui.updateStatus("It's a draw!");
        }
    }

    #updateStatus() {
        if (this.#gameActive) {
            this.#ui.updateStatus(`Player ${this.#currentPlayer}'s turn`);
        }
    }

    #restart() {
        this.#board = new Board();
        this.#currentPlayer = 'X';
        this.#gameActive = true;
        this.#initialize();
    }
}

// Start the game
new Game();

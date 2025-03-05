// Immutable game state
const createGameState = () => Object.freeze({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    gameActive: true,
    status: "Player X's turn"
});

// Pure functions for game logic
const makeMove = (state, index) => {
    if (!isValidMove(state, index)) {
        return state;
    }

    return Object.freeze({
        ...state,
        board: updateBoard(state.board, index, state.currentPlayer),
        currentPlayer: switchPlayer(state.currentPlayer)
    });
};

const isValidMove = (state, index) => 
    state.gameActive && state.board[index] === null;

const updateBoard = (board, index, symbol) =>
    board.map((cell, i) => i === index ? symbol : cell);

const switchPlayer = player => 
    player === 'X' ? 'O' : 'X';

const getWinner = board => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return pipe(
        winPatterns,
        patterns => patterns.find(pattern => isWinningPattern(board, pattern)),
        maybePattern => maybePattern ? board[maybePattern[0]] : null
    );
};

const isWinningPattern = (board, [a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c];

const isBoardFull = board => 
    board.every(cell => cell !== null);

// Function composition utility
const pipe = (value, ...fns) => 
    fns.reduce((result, fn) => fn(result), value);

// Game state updates
const updateGameStatus = state => {
    const winner = getWinner(state.board);
    if (winner) {
        return Object.freeze({
            ...state,
            gameActive: false,
            status: `Player ${winner} wins!`
        });
    }
    if (isBoardFull(state.board)) {
        return Object.freeze({
            ...state,
            gameActive: false,
            status: "It's a draw!"
        });
    }
    return Object.freeze({
        ...state,
        status: `Player ${state.currentPlayer}'s turn`
    });
};

// Pure UI rendering functions
const createCell = (value, index, clickHandler) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = index;
    cell.textContent = value || '';
    cell.addEventListener('click', () => clickHandler(index));
    return cell;
};

const renderBoard = (state, boardElement, clickHandler) => {
    const newBoard = document.createElement('div');
    newBoard.className = 'board';
    newBoard.id = 'board';
    
    state.board.forEach((value, index) => {
        newBoard.appendChild(createCell(value, index, clickHandler));
    });
    
    boardElement.replaceWith(newBoard);
    return newBoard;
};

const updateStatus = (state, statusElement) => {
    statusElement.textContent = state.status;
};

// Event handling with state updates
const createGameController = (initialState = createGameState()) => {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    
    let state = initialState;

    const updateState = newState => {
        state = updateGameStatus(newState);
        renderBoard(state, boardElement, handleCellClick);
        updateStatus(state, statusElement);
    };

    const handleCellClick = index => {
        updateState(makeMove(state, index));
    };

    const handleRestart = () => {
        updateState(createGameState());
    };

    // Event bindings
    restartButton.addEventListener('click', handleRestart);

    // Initial render
    updateState(state);

    return {
        getState: () => state,
        restart: handleRestart
    };
};

// Start the game
const game = createGameController();

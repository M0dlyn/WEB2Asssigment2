# Tic-Tac-Toe Game Implementation

This project implements two versions of the classic Tic-Tac-Toe game using different programming paradigms:
1. Object-Oriented Programming (OOP)
2. Functional Programming

## Project Structure

The project consists of two standalone HTML files:
- `oo.html`: Object-oriented implementation with embedded styles and scripts
- `fun.html`: Functional implementation with embedded styles and scripts

## Features

Both implementations include:
- Interactive 3x3 game board
- Turn-based gameplay (X and O players)
- Win detection (horizontal, vertical, diagonal)
- Draw detection
- Game status messages
- Restart functionality
- Identical user interface and experience

## Implementation Details

### Object-Oriented Version (oo.html)
- Uses ES6 classes for game logic
- Implements proper encapsulation using private fields
- Separates concerns between Board, Game, and UI classes
- Maintains game state through class properties
- Uses class methods for game operations

### Functional Version (fun.html)
- Uses pure functions for game logic
- Implements immutable state management
- Uses function composition
- Separates pure functions from side effects
- Uses higher-order functions for event handling

## How to Play

1. Open either `oo.html` or `fun.html` in a web browser
2. Players take turns clicking empty cells to place their symbol (X or O)
3. The game indicates whose turn it is
4. The game announces when a player wins or if it's a draw
5. Click "Restart Game" to start a new game

## Technical Requirements

- No external libraries or frameworks required
- Works in modern web browsers
- Uses only HTML, CSS, and JavaScript
- All code is embedded within the HTML files

## Learning Objectives

This project demonstrates:
- Different programming paradigms (OOP vs Functional)
- Clean code organization
- Separation of concerns
- Modern JavaScript features
- Responsive web design
- Event handling
- State management
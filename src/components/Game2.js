import React, { useState, useEffect, useRef } from 'react';
import './Board.css';
import Cell from './Cell.js';

const CELL_SIZE = 25;
const WIDTH = 800;
const HEIGHT = 650;

const Game2 = () => {
    let rows = HEIGHT / CELL_SIZE;
    let cols = WIDTH / CELL_SIZE;

    // set state
    const [board, setBoard] = useState([]);
    const [cells, setCells] = useState([]);
    // const [interval, setInterval] = useState(100);
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // set ref
    const boardRef = useRef(null);

    // make an empty board
    const makeEmptyBoard = () => {
        for (let y=0; y<rows; y++) {
            board[y] = [];

            for (let x=0; x<cols; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }

    // make cells array for rendering
    const makeCells = () => {
        let cells = []
        for (let y=0; y<rows; y++) {
            for (let x=0; x<cols; x++) {
                if (board[y][x]) {
                    cells.push({ x, y });
                }
            }
        } 
        console.log(`Cells(in makeCells): ${cells}`)
        return cells
    }

    // set board to a board of dead cells at page load
    useEffect(() => {
        setBoard(makeEmptyBoard());
        makeCells();
    }, [])

    // determine where board is on the users screen
    const getElementOffset = () => {
        const rect = boardRef.current.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop
        };
    }

    // handle when user clicks on the board
    const handleClick = (e) => {
        console.log(`Board: ${board}`)
        const elemOffset = getElementOffset();
        const offsetX = e.clientX - elemOffset.x;
        const offsetY = e.clientY - elemOffset.y;
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);
        if (x>=0 && x<=cols && y>=0 && y<=rows) {
            board[y][x] = !board[y][x];
        }
        setCells(makeCells());
    }

    // run the game
    const runGame = () => {
        setIsRunning(true);
        // TODO: run generations
        runIteration();
    }

    // stop the game
    const stopGame = () => {
        setIsRunning(false);
        // TODO: timeout or other function to stop game!
    }

    // run an iteration of the game
    const runIteration = () => {
        console.log('Running Iteration');
        console.log(count);
        setCount(count + 1)

        let boardCopy = board;

        for (let y=0; y<rows; y++) {
            for (let x=0; x<cols; x++) {
                let neighbors = calculateNeighbors(boardCopy, x, y);
                if (boardCopy[y][x]) {
                    switch (neighbors) {
                        case 2 || 3:
                            board[y][x] = true;
                            break;
                        default:
                            board[y][x] = false;
                            break;
                    }
                } else {
                    if (!boardCopy[y][x]) {
                        switch (neighbors) {
                            case 3:
                                board[y][x] = true;
                                break;
                            default:
                                board[y][x] = false;
                                break;
                        }
                    }
                }
            }
        }
        setCells(makeCells());
    }

    // calculate neighbors for game logic
    const calculateNeighbors = (board, x, y) => {
        let neighbors = 0;
        const sides = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i=0; i<sides.length; i++) {
            const side = sides[i];
            let y1 = y + side[0];
            let x1 = x + side[1];

            if (x1>=0 && x1<cols && y1>=0 && y1<rows && board[y1][x1]) {
                neighbors++;
            }
        }
        return neighbors;
    }

    // clear board
    const handleClear = () => {
        if (isRunning === false) {
            for (let y=0; y<rows; y++) {
                for (let x=0; x<cols; x++) {
                    board[y][x] = false;
                }
            }
            setBoard(board);
            setCells([]);
            setCount(0);
        } else {
            alert("Hey! You can't clear the game board while the simulation is running!")
        }
        
    }
    
    // set a random design of live cells
    const handleRandom = () => {
        for (let y=0; y<rows; y++) {
            for (let x=0; x<cols; x++) {
                board[y][x] = (Math.random() >= 0.5);
            }
        }
        setBoard(board);
        setCells(makeCells());
    }

    return (
        <div>
            <div
                className="Board"
                style={{
                    width: WIDTH,
                    height: HEIGHT,
                    backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                onClick={handleClick}
                ref={boardRef}
            >
                {cells && cells.map(cell => (
                    <Cell
                        x={cell.x}
                        y={cell.y}
                        key={`${cell.x},${cell.y}`}
                    />
                ))}
            </div>
            <div className="Controls">
                Generation: {count}
                {isRunning ?
                <button
                    className="button"
                    onClick={stopGame}
                >STOP</button>
            :
                <button
                    className="button"
                    onClick={runGame}
                >RUN</button>
            }
                <button
                    className="button"
                    onClick={handleRandom}
                >Random</button>
                <button
                    className="button"
                    onClick={handleClear}
                >Clear</button>
            </div>
        </div>
    )
}

export default Game2;
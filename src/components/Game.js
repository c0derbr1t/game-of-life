import React, { useState, useEffect, useRef } from 'react';
// useMemo
import './Board.css';
// import Cell from './Cell.js';

// Set global variables (can be used with user input later)
const CELL_SIZE = 25;
const WIDTH = 800;
const HEIGHT = 650;


const Game = () => {
    let rows = HEIGHT / CELL_SIZE;
    let cols = WIDTH / CELL_SIZE;

    // const [cells, setCells] = useState();
    const [interval, setInterval] = useState(100);
    const [isRunning, setIsRunning] = useState(false);
    const [board, setBoard] = useState();
    // const [nextBoard, setNextBoard] = useState([]);
    // const [gridA, setGridA] = useState([]);
    // const [gridB, setGridB] = useState([]);
    const [count, setCount] = useState(0);
    const [checkTimeout, setCheckTimeout] = useState(null);
    const [timeoutHandler, setTimeoutHandler] = useState();
    const boardRef = useRef(null)

    const makeEmptyBoard = () => {
        let board = []
        for (let y=0; y<rows; y++) {
            board[y] = [];

            for (let x=0; x<cols; x++) {
                board[y][x] = false;
            }
        }
        console.log(board)
        return board;
    }

    // const makeCells = () => {
    //     let cellsArr = [];

    //     for (let y=0; y<rows; y++) {
    //         for (let x=0; x<cols; x++) {
    //             if (board[y][x]) {
    //                 cellsArr.push({ x, y });
    //             }
    //         }
    //     }
    //     setCells(cellsArr);
    // }

    useEffect(() => {
        setBoard(makeEmptyBoard());
    }, [])
    

    // setGridA(makeEmptyBoard());
    // setBoard(gridA);
    // setGridB(makeEmptyBoard());
    // setNextBoard(gridB);

    const getElementOffset = (e) => {
        const rect = boardRef.current.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop
        };
    }

    const handleClick = (e) => {
        const elemOffset = getElementOffset();
        const offsetX = e.clientX - elemOffset.x;
        const offsetY = e.clientY - elemOffset.y;
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        // console.log(board)

        if (x>=0 && x<=cols && y>=0 && y<=rows) {
            
            board[y][x] = !board[y][x];
        }
        // setCells(makeCells());
    }

    // useEffect(() => {
    //     const tempTimeoutHandler = setTimeout(() => {
    //         runIteration();
    //         setCheckTimeout(true);

    //         setTimeoutHandler(tempTimeoutHandler);
    //     }, interval);
    // }, [interval])

    const runGame = () => {
        setIsRunning(true);
        runIteration();
    }

    const stopGame = () => {
        setIsRunning(false);

        if (checkTimeout) {
            clearTimeout(timeoutHandler);
            setCheckTimeout(null)
        }
    }

    // const switchBoard = (board) => {
    //     if (gridA === board) {
    //         setBoard(gridB);
    //         setNextBoard(gridA);
    //     } else if (gridB === board) {
    //         setBoard(gridA);
    //         setNextBoard(gridB);
    //     }
    // }

    // const doubleBuffer = useMemo(() => makeEmptyBoard(), [count]);

    const runIteration = () => {
        console.log('Running Iteration')
        console.log(count)

        // let tempBoard = []
        // for (let y=0; y<rows; y++) {
        //     board[y] = [];
        //     for (let x=0; x<cols; x++) {
        //         board[y][x] = false;
        //     }
        // }
        // console.log(board)
        // return board;


        for (let y=0; y<rows; y++) {
            for(let x=0; x<cols; x++) {
                let neighbors = calculateNeighbors(board, x, y);
                if (board[y][x]) {
                    if (neighbors === 2 || neighbors === 3){
                        newBoard[y][x] = true;        
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        // switchBoard(board);
        setCells(makeCells());
        setCount(count + 1);
    }
    

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

    const handleIntervalChange = (e) => {
        setInterval(e.target.value);
    }

    const handleClear = () => {
        setBoard(makeEmptyBoard())
        // if (board === gridA) {
        //     setGridA(makeEmptyBoard());
        //     setCells(makeCells());
        //     setBoard(gridA);
        // } else if (board === gridB) {
        //     setGridB(makeEmptyBoard());
        //     setCells(makeCells());
        //     setBoard(gridB);
        // }
    }

    const handleRandom = () => {
        for (let y=0; y<rows; y++) {
            for (let x=0; x<cols; x++) {
                board[y][x] = (Math.random() >= 0.5);
            }
        }
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
                ref={boardRef}            >
                {console.log("grid")}
                {cells.map(cell => (
                    <Cell
                        x={cell.x}
                        y={cell.y}
                        key={`${cell.x},${cell.y}`}
                    />
                ))}
            </div>
            <div className="Controls">
                {console.log("controls")}
                Update Every: 
                <input
                    value={interval}
                    onChange={handleIntervalChange}
                />
                msec {isRunning ?
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
                Generation: {count}
            </div>
        </div>
    )
}

export default Game;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Game.css';
import Cell from './Cell.js';

const CELL_SIZE = 25;
let WIDTH = 800;
let HEIGHT = 650;

// let a = prompt("What size cell would you like to play with? Choose from 10-50; standard is 25.")
// if (parseInt(a)>=10 && parseInt(a)<=50) {
//     CELL_SIZE = parseInt(a);
// } else {
//     alert("Invalid Cell Size chozen. We'll use the standard size of 25.")
//     CELL_SIZE = 25;
// }

let b = prompt("What board width would you like to have? Choose from 300-1250; standard is 800.")
if (parseInt(b)>=300 && parseInt(b)<=1250) {
    WIDTH = parseInt(b);
} else {
    alert("Invalid Width chosen. We'll use the standard width of 800.")
    WIDTH = 800;
}

let c = prompt("What board height would you like? Choose from 250-1000; standard is 650.")
if (parseInt(c)>=250 && parseInt(c)<=1000) {
    HEIGHT = parseInt(c)
} else {
    alert("Invalid Height chosen. We'll usethe s tandard height of 650.")
    HEIGHT = 650;
}

const Game = () => {
    let rows = HEIGHT / CELL_SIZE;
    let cols = WIDTH / CELL_SIZE;

    // set state
    const [board, setBoard] = useState([]);
    const [cells, setCells] = useState([]);
    // const [interval, setInterval] = useState(1000);
    const [timeoutHandler, setTimeoutHandler] = useState(null);
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
        if (isRunning === false) {
            const elemOffset = getElementOffset();
            const offsetX = e.clientX - elemOffset.x;
            const offsetY = e.clientY - elemOffset.y;
            const x = Math.floor(offsetX / CELL_SIZE);
            const y = Math.floor(offsetY / CELL_SIZE);
            if (x>=0 && x<=cols && y>=0 && y<=rows) {
                board[y][x] = !board[y][x];
            }
            setCells(makeCells());
        } else {
            alert("The game board isn't clickable while the simulation is running!")
        }  
    }

    // set up timehandler
    // useEffect(() => {
    //     // const tempTimeoutHandler = 
    //     setInterval(() => {   
    //         if (isRunning) {
    //             stepGame();
    //             console.log("***")

    //             // setTimeoutHandler(tempTimeoutHandler);
    //             // setTimeout(run, interval);  
    //         } else {
    //             stopGame();
    //             console.log("STOPPED");
    //             // clearTimeout(timeoutHandler);
    //         }   
    //     }, 1000);
    // }, [isRunning])

    function useInterval(callback, delay) {
        const savedCallback = useRef();
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

    useInterval(() => {    
        if (isRunning) stepGame();
        console.log("in useInterval")  
    }, 3000);

    // run the game
    const runGame = () => {
        setIsRunning(true);
        // runIteration();
        // setTimeoutHandler();
        // playLoop();
    }

    // const playLoop = () => {
    //     // let timerId = 
        
    //     // setTimeoutHandler(timerId);
    // }

    setInterval(() => {
        console.log(isRunning)
        if (isRunning) {
            console.log("In playLoop")
            runIteration();
        }
    }, 1000)
    
    // step forward one generation at a time
    const stepGame = () => {
        runIteration();
    }

    // stop the game
    const stopGame = () => {
        setIsRunning(false);
        console.log(isRunning);
        // clearInterval(timeoutHandler)
    }

    // run an iteration of the game
    const runIteration = () => {
        console.log('Running Iteration');
        console.log(count);     

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
        setCount(count + 1)
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
        if (isRunning === false) {
            for (let y=0; y<rows; y++) {
                for (let x=0; x<cols; x++) {
                    board[y][x] = (Math.random() >= 0.5);
                }
            }
            setBoard(board);
            setCells(makeCells());
        } else {
            alert("Hey! You can't randomize your live cells while the simulation is running!")
        }
    }

    return (
        <>
            <Link to={`/info`}>Info</Link>
            <div className="Game">
                
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
                <div className='Controls'>
                    <div className="generation">
                        Generation: {count}
                    </div>
                    {isRunning === true ?
                    <button
                        className="button"
                        onClick={stopGame}
                    >Stop</button>
                :
                    <button
                        className="button"
                        onClick={runGame}
                    >Run</button>
                }
                    <button
                        className="button"
                        onClick={stepGame}
                    >Step</button>
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
        </>
    )
}

export default Game;
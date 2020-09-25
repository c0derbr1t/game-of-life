import React from 'react';
import { Link } from 'react-router-dom';
import './Info.css';

const Info = () => {

    return (
        <>
            <Link to={`/`}>Game</Link>
            <div className="Info">
                <div className="Rules">
                    <h3>The Rules</h3>
                    <hr></hr>
                    <p>The rules that each cell lives and dies by are incredibly simple. In fact, there are just 2!</p>
                    <ul>
                        <li>If the cell is <b>ALIVE</b> & has <b>2 or 3</b> living neighbors ➡️ <b>Then it stays alive!</b> Otherwise it dies.</li>
                        <li>If the cell is <b>DEAD</b> & has <b>exactly 3</b> neighbors ➡️ <b>Then it comes to life!</b> Otherwise it remains dead.</li>
                    </ul>
                    <p>That's it! From those two rules, all kinds of things can be created and move around the board.</p>
                </div>
                <div className="About">
                    <h3>The Game</h3>
                    <hr></hr>
                    <p>John Conway created this 'Game' in 1970. It take's zero players, which means you don't do anything when it's running. It play's itself! However, it can be made (like this one) to be able to manipulate the board before hand, and see what your patterns create!</p>
                    <p>The Game of Life is a cellular automaton. Its a grid with defined size and rules. Each cell has a neighborhood, and it's state and the state's of the cells in it's neighborhood rely on functions to be passed on each. The function and rules should be the same for all the cells. </p>
                    <p>Conway's Game of Life is Turing Complete. This means it has the ability to simulate any Turing Machine. It can simulate the computational aspects of any other computer. </p>
                </div>
            </div>
        </>
    )
}

export default Info;
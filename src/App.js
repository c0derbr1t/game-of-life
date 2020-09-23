import React from 'react';
import './App.css';
import Board from './components/Board.js';

function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <h3>Implemented by Brittani Luce</h3>
      <Board />
    </div>
  );
}

export default App;

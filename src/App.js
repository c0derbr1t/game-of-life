import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
// import Game2 from './components/Game2.js';
import Game from './components/Game.js';
import Info from './components/Info.js';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <h3>Implemented by Brittani Luce</h3>
        <Route exact path="/" component={Game} />
        <Route exact path="/info" component={Info} />
      </div>
    </Router>
    
  );
}

export default App;

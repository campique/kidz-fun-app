import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import GameSelection from './components/GameSelection';
import GameMode from './components/GameMode';
import Lobby from './components/Lobby';
import TicTacToe from './components/games/TicTacToe';
import ConnectFour from './components/games/ConnectFour';
import Pictionary from './components/games/Pictionary';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Multiplayer Games Platform</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GameSelection />} />
            <Route path="/game/:gameName/mode" element={<GameMode />} />
            <Route path="/game/:gameName/lobby" element={<Lobby />} />
            <Route path="/game/tictactoe/:mode" element={<TicTacToe />} />
            <Route path="/game/connectfour/:mode" element={<ConnectFour />} />
            <Route path="/game/pictionary/:mode" element={<Pictionary />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>&copy; 2023 Multiplayer Games Platform. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

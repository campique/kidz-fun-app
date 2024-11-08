import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Lobby from './components/Lobby';
import Games from './components/Games';
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
            <Route path="/" element={<Navigate to="/lobby" />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/games" element={<Games />} />
            <Route path="/game/tictactoe" element={<TicTacToe />} />
            <Route path="/game/connectfour" element={<ConnectFour />} />
            <Route path="/game/pictionary" element={<Pictionary />} />
            <Route path="/game/:roomId" element={<Games />} />
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

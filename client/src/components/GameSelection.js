import React from 'react';
import { Link } from 'react-router-dom';
import './GameSelection.css'; // Zorg ervoor dat je een bijpassend CSS-bestand maakt

const GameSelection = () => {
  const games = [
    { name: 'Tic Tac Toe', emoji: '❌⭕', path: 'tictactoe' },
    { name: 'Connect Four', emoji: '🔴🟡', path: 'connectfour' },
    { name: 'Pictionary', emoji: '🎨', path: 'pictionary' }
  ];

  return (
    <div className="game-selection">
      <h2>Choose a Game</h2>
      <div className="games-grid">
        {games.map((game, index) => (
          <div key={index} className="game-card">
            <h3>{game.name}</h3>
            <div className="game-emoji">{game.emoji}</div>
            <Link to={`/game/${game.path}/mode`} className="play-button">
              Select
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;

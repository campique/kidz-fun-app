import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  return (
    <div className="games-container">
      <h1>Spelletjes</h1>
      <div className="games-grid">
        <div className="game-card">
          <h2>4 op een rij</h2>
          <div className="game-emoji">🔴🟡</div>
          <Link to="/games/connect-four/lobby" className="play-button">Spelen</Link>
        </div>
        <div className="game-card">
          <h2>Boter, kaas en eieren</h2>
          <div className="game-emoji">❌⭕</div>
          <Link to="/games/tic-tac-toe/lobby" className="play-button">Spelen</Link>
        </div>
        <div className="game-card">
          <h2>Pictionary</h2>
          <div className="game-emoji">🎨✏️</div>
          <Link to="/games/pictionary/lobby" className="play-button">Spelen</Link>
        </div>
      </div>
    </div>
  );
};

export default Games;

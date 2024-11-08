import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './GameMode.css'; // Zorg ervoor dat je een bijpassend CSS-bestand maakt

const GameMode = () => {
  const { gameName } = useParams();

  const gameModes = [
    { name: 'Single Player', description: 'Play against the computer', path: 'single' },
    { name: 'Local Multiplayer', description: 'Play with a friend on the same device', path: 'local' },
    { name: 'Online Multiplayer', description: 'Play with others online', path: 'online' }
  ];

  return (
    <div className="game-mode">
      <h2>{gameName} - Choose Game Mode</h2>
      <div className="mode-grid">
        {gameModes.map((mode, index) => (
          <div key={index} className="mode-card">
            <h3>{mode.name}</h3>
            <p>{mode.description}</p>
            <Link 
              to={mode.path === 'online' ? `/game/${gameName}/lobby` : `/game/${gameName}/${mode.path}`} 
              className="select-button"
            >
              Select
            </Link>
          </div>
        ))}
      </div>
      <Link to="/games" className="back-button">Back to Game Selection</Link>
    </div>
  );
};

export default GameMode;

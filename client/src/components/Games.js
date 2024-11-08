import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicTacToe from './games/TicTacToe';
import ConnectFour from './games/ConnectFour';
import Pictionary from './games/Pictionary';
import './games.css';

const Games = () => {
  const [gameMode, setGameMode] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [currentGame, setCurrentGame] = useState(null);
  const navigate = useNavigate();

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    if (mode === 'computer') {
      setDifficulty('');
    } else {
      startGame();
    }
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    startGame();
  };

  const startGame = () => {
    // Logic to start the game based on selected options
    // This is where you would initialize the game component
  };

  const handleGameEnd = (result) => {
    // Logic to handle game end
    // You can show a modal with the result and options to play again or return to lobby
  };

  const renderGameSelection = () => (
    <div className="game-container">
      <h2 className="game-title">Kies een spel</h2>
      <button className="game-button" onClick={() => setCurrentGame('tictactoe')}>Boter-Kaas-Eieren</button>
      <button className="game-button" onClick={() => setCurrentGame('connectfour')}>Vier op een rij</button>
      <button className="game-button" onClick={() => setCurrentGame('pictionary')}>Pictionary</button>
    </div>
  );

  const renderModeSelection = () => (
    <div className="game-container">
      <h2 className="game-title">Kies een spelmodus</h2>
      <button className="game-button" onClick={() => handleModeSelect('computer')}>Tegen de computer</button>
      <button className="game-button" onClick={() => handleModeSelect('local')}>Tegen elkaar</button>
      <button className="game-button" onClick={() => handleModeSelect('online')}>Online Multiplayer</button>
    </div>
  );

  const renderDifficultySelection = () => (
    <div className="game-container">
      <h2 className="game-title">Kies moeilijkheidsgraad</h2>
      <button className="game-button" onClick={() => handleDifficultySelect('easy')}>Makkelijk</button>
      <button className="game-button" onClick={() => handleDifficultySelect('medium')}>Gemiddeld</button>
      <button className="game-button" onClick={() => handleDifficultySelect('hard')}>Moeilijk</button>
    </div>
  );

  const renderGame = () => {
    switch (currentGame) {
      case 'tictactoe':
        return <TicTacToe mode={gameMode} difficulty={difficulty} onGameEnd={handleGameEnd} />;
      case 'connectfour':
        return <ConnectFour mode={gameMode} difficulty={difficulty} onGameEnd={handleGameEnd} />;
      case 'pictionary':
        return <Pictionary mode={gameMode} difficulty={difficulty} onGameEnd={handleGameEnd} />;
      default:
        return null;
    }
  };

  if (!currentGame) return renderGameSelection();
  if (!gameMode) return renderModeSelection();
  if (gameMode === 'computer' && !difficulty) return renderDifficultySelection();
  return renderGame();
};

export default Games;

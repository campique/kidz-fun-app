import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ConnectFour = () => {
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('🔴');
  const location = useLocation();
  const { players } = location.state || { players: ['Player 1', 'Player 2'] };

  const handleMove = (col) => {
    const newBoard = board.map(row => [...row]);
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === '🔴' ? '🟡' : '🔴');
        break;
      }
    }
  };

  return (
    <div className="connect-four">
      <h2>4 op een rij</h2>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell" onClick={() => handleMove(colIndex)}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p>Current turn: {currentPlayer === '🔴' ? players[0] : players[1]} ({currentPlayer})</p>
    </div>
  );
};

export default ConnectFour;

import React, { useState, useEffect, memo } from 'react';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  cell: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  red: {
    backgroundColor: 'red',
  },
  yellow: {
    backgroundColor: 'yellow',
  },
}));

const Cell = memo(({ cell, rowIndex, colIndex, handleColumnClick }) => {
  const classes = useStyles();
  const cellAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div style={cellAnimation}>
      <Paper 
        className={`${classes.cell} ${cell ? classes[cell] : ''}`} 
        onClick={() => handleColumnClick(colIndex)}
      />
    </animated.div>
  );
});

const ConnectFour = ({ mode, difficulty, onGameEnd, socket }) => {
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (mode === 'online' && socket) {
      socket.on('updateGame', (newBoard) => {
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
      });
    }
  }, [mode, socket, currentPlayer]);

  const checkWinner = (board, row, col) => {
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (let [dx, dy] of directions) {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;
        if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7 || board[newRow][newCol] !== board[row][col]) break;
        count++;
      }
      for (let i = 1; i < 4; i++) {
        const newRow = row - i * dx;
        const newCol = col - i * dy;
        if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7 || board[newRow][newCol] !== board[row][col]) break;
        count++;
      }
      if (count >= 4) return board[row][col];
    }
    return null;
  };

  const handleColumnClick = (col) => {
    if (winner) return;
    let newBoard = board.map(row => [...row]);
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        const newWinner = checkWinner(newBoard, row, col);
        if (newWinner) {
          setWinner(newWinner);
          onGameEnd(newWinner);
        } else {
          setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
        }
        setBoard(newBoard);
        if (mode === 'online' && socket) {
          socket.emit('makeMove', newBoard);
        }
        break;
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Vier op een Rij
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {winner ? `Winnaar: ${winner}` : `Huidige speler: ${currentPlayer}`}
      </Typography>
      <Grid container justifyContent="center">
        {board.map((row, rowIndex) => (
          <Grid container item key={rowIndex} justifyContent="center">
            {row.map((cell, colIndex) => (
              <Cell 
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
                handleColumnClick={handleColumnClick}
              />
            ))}
          </Grid>
        ))}
      </Grid>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => onGameEnd(null)} 
        style={{ marginTop: '20px' }}
      >
        Terug naar lobby
      </Button>
    </div>
  );
};

export default ConnectFour;

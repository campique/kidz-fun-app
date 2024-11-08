// TicTacToe.js
import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  cell: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const TicTacToe = ({ mode, difficulty, onGameEnd, socket }) => {
  const classes = useStyles();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (mode === 'online' && socket) {
      socket.on('updateGame', (newBoard) => {
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      });
    }
  }, [mode, socket, currentPlayer]);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    if (mode === 'online' && socket) {
      socket.emit('makeMove', newBoard);
    } else {
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      onGameEnd(newWinner);
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner('draw');
      onGameEnd('draw');
    }

    if (mode === 'computer' && !newWinner && currentPlayer === 'X') {
      setTimeout(() => makeComputerMove(newBoard), 500);
    }
  };

  const makeComputerMove = (currentBoard) => {
    let index;
    if (difficulty === 'easy') {
      index = getRandomEmptyCell(currentBoard);
    } else if (difficulty === 'medium') {
      index = Math.random() < 0.5 ? getBestMove(currentBoard) : getRandomEmptyCell(currentBoard);
    } else {
      index = getBestMove(currentBoard);
    }
    handleClick(index);
  };

  const getRandomEmptyCell = (board) => {
    const emptyCells = board.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index);
      return acc;
    }, []);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  const getBestMove = (board) => {
    // Implementeer hier het minimax algoritme voor de beste zet
    // Dit is een vereenvoudigde versie die de eerste lege cel kiest
    return board.findIndex(cell => cell === null);
  };

  const renderCell = (index) => {
    const cellAnimation = useSpring({
      from: { opacity: 0, transform: 'scale(0.5)' },
      to: { opacity: 1, transform: 'scale(1)' },
      config: { tension: 300, friction: 10 },
    });

    return (
      <animated.div style={cellAnimation}>
        <Paper className={classes.cell} onClick={() => handleClick(index)}>
          {board[index]}
        </Paper>
      </animated.div>
    );
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Boter-Kaas-Eieren
      </Typography>
      <Grid container spacing={2}>
        {board.map((_, index) => (
          <Grid item xs={4} key={index}>
            {renderCell(index)}
          </Grid>
        ))}
      </Grid>
      {winner && (
        <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>
          {winner === 'draw' ? 'Gelijkspel!' : `Winnaar: ${winner}`}
        </Typography>
      )}
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

export default TicTacToe;

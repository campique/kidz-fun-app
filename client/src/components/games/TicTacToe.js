import React, { useState, useEffect, memo } from 'react';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  cell: {
    width: '100px',
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

const Cell = memo(({ value, onClick }) => {
  const classes = useStyles();
  const cellAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div style={cellAnimation}>
      <Paper className={classes.cell} onClick={onClick}>
        {value}
      </Paper>
    </animated.div>
  );
});

const TicTacToe = ({ mode, difficulty, onGameEnd, socket }) => {
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
    const player = 'O';
    const opponent = 'X';

    const isMovesLeft = (board) => {
      return board.includes(null);
    };

    const evaluate = (board) => {
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
          if (board[a] === player) return 10;
          if (board[a] === opponent) return -10;
        }
      }
      return 0;
    };

    const minimax = (board, depth, isMax) => {
      const score = evaluate(board);

      if (score === 10) return score - depth;
      if (score === -10) return score + depth;
      if (!isMovesLeft(board)) return 0;

      if (isMax) {
        let best = -1000;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = player;
            best = Math.max(best, minimax(board, depth + 1, !isMax));
            board[i] = null;
          }
        }
        return best;
      } else {
        let best = 1000;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = opponent;
            best = Math.min(best, minimax(board, depth + 1, !isMax));
            board[i] = null;
          }
        }
        return best;
      }
    };

    let bestMove = -1;
    let bestVal = -1000;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = player;
        const moveVal = minimax(board, 0, false);
        board[i] = null;

        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }

    return bestMove;
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Boter-Kaas-Eieren
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {winner 
          ? (winner === 'draw' ? 'Gelijkspel!' : `Winnaar: ${winner}`) 
          : `Huidige speler: ${currentPlayer}`}
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        {board.map((value, index) => (
          <Grid item key={index}>
            <Cell value={value} onClick={() => handleClick(index)} />
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

export default TicTacToe;

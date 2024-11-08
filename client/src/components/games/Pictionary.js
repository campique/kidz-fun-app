import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  canvas: {
    border: '1px solid black',
    cursor: 'crosshair',
  },
  guessInput: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Pictionary = ({ mode, difficulty, onGameEnd, socket }) => {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isDrawer, setIsDrawer] = useState(mode !== 'online');

  useEffect(() => {
    if (mode === 'online' && socket) {
      socket.on('startGame', ({ word, isDrawer }) => {
        setCurrentWord(word);
        setIsDrawer(isDrawer);
      });
      socket.on('draw', drawLine);
      socket.on('guessResult', ({ correct, message }) => {
        setMessage(message);
        if (correct) {
          onGameEnd('Correct guess!');
        }
      });
    } else {
      // For local game, set a random word
      setCurrentWord(getRandomWord());
    }
  }, [mode, socket, onGameEnd]);

  const getRandomWord = () => {
    const words = ['apple', 'banana', 'cat', 'dog', 'elephant', 'frog', 'guitar', 'house'];
    return words[Math.floor(Math.random() * words.length)];
  };

  const startDrawing = ({ nativeEvent }) => {
    if (!isDrawer) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !isDrawer) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    if (mode === 'online' && socket) {
      socket.emit('draw', { x: offsetX, y: offsetY });
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const drawLine = ({ x, y }) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (mode === 'online' && socket) {
      socket.emit('guess', guess);
    } else {
      if (guess.toLowerCase() === currentWord.toLowerCase()) {
        setMessage('Correct guess!');
        onGameEnd('Correct guess!');
      } else {
        setMessage('Wrong guess, try again!');
      }
    }
    setGuess('');
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Pictionary
      </Typography>
      {isDrawer ? (
        <Typography variant="h6" align="center" gutterBottom>
          Draw: {currentWord}
        </Typography>
      ) : (
        <Typography variant="h6" align="center" gutterBottom>
          Guess the word!
        </Typography>
      )}
      <Paper elevation={3}>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className={classes.canvas}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </Paper>
      {!isDrawer && (
        <form onSubmit={handleGuess}>
          <TextField
            fullWidth
            variant="outlined"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            className={classes.guessInput}
          />
          <Button type="submit" variant="contained" color="primary">
            Guess
          </Button>
        </form>
      )}
      <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
        {message}
      </Typography>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => onGameEnd(null)} 
        style={{ marginTop: '20px' }}
      >
        Terug naar lobby
      </Button>
    </div>
  );
};

export default Pictionary;

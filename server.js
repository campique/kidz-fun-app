const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;

const games = {
  'connect-four': {},
  'tic-tac-toe': {},
  'pictionary': {}
};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join_lobby', (data) => {
    const { game, name } = data;
    socket.join(game);
    socket.to(game).emit('player_joined', { name });
  });

  socket.on('start_game', (data) => {
    const { game, players } = data;
    games[game][socket.id] = { players, currentTurn: players[0] };
    io.to(game).emit('game_started', { players, currentTurn: players[0] });
  });

  socket.on('make_move', (data) => {
    const { game, move } = data;
    const gameState = games[game][socket.id];
    // Implement game logic here
    io.to(game).emit('move_made', { move, currentTurn: gameState.currentTurn });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

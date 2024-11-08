import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Lobby = () => {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);
  const { game } = useParams();
  const history = useHistory();

  useEffect(() => {
    socket.on('player_joined', (data) => {
      setPlayers(prevPlayers => [...prevPlayers, data.name]);
    });

    socket.on('game_started', (data) => {
      history.push(`/games/${game}/play`, { players: data.players, currentTurn: data.currentTurn });
    });

    return () => {
      socket.off('player_joined');
      socket.off('game_started');
    };
  }, [game, history]);

  const handleJoinLobby = () => {
    if (name) {
      socket.emit('join_lobby', { game, name });
      setPlayers(prevPlayers => [...prevPlayers, name]);
    }
  };

  const handleStartGame = () => {
    socket.emit('start_game', { game, players });
  };

  return (
    <div>
      <h2>{game} Lobby</h2>
      {players.length === 0 ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleJoinLobby}>Join Lobby</button>
        </div>
      ) : (
        <div>
          <h3>Players:</h3>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
          {players.length >= 2 && (
            <button onClick={handleStartGame}>Start Game</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Lobby;

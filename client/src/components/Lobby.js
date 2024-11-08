import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Lobby = () => {
  const [rooms, setRooms] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('roomsList', (roomsList) => {
      setRooms(roomsList);
    });

    return () => newSocket.close();
  }, []);

  const createRoom = () => {
    const roomId = Math.random().toString(36).substr(2, 9);
    socket.emit('createRoom', roomId);
    navigate(`/game/${roomId}`);
  };

  const joinRoom = (roomId) => {
    socket.emit('joinRoom', roomId);
    navigate(`/game/${roomId}`);
  };

  return (
    <div className="lobby-container">
      <h2 className="lobby-title">Online Lobby</h2>
      <button className="lobby-button" onClick={createRoom}>Nieuwe kamer maken</button>
      <div className="room-list">
        {rooms.map((room) => (
          <div key={room.id} className="room-item">
            <span>Kamer {room.id}</span>
            <span>Spelers: {room.players}/2</span>
            <button onClick={() => joinRoom(room.id)} disabled={room.players === 2}>
              Deelnemen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;

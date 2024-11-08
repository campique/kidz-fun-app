import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to the Multiplayer Games Platform</h2>
      <p>Choose from a variety of exciting games to play!</p>
      <Link to="/games" className="button">
        View Games
      </Link>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pawIcon from '../img/paw.png';
import pawSelectedIcon from '../img/paw_selected.png';
import './HomeScreen.css'; // Import the CSS file
import CatButton from './CatButton'; // Import the CatButton component

const HomeScreen = () => {
  const [players, setPlayers] = useState(2);
  const navigate = useNavigate();

  const handlePlayerChange = (num) => {
    // Ensure that the number of players is at least 2
    if (num < 2) {
      num = 2;
    }
    setPlayers(num);
  };

  const handleStartGame = () => {
    navigate('/game', { state: { players } });
  };

  return (
    <div className="home-screen-container">
      <div className="title">Select Number of Players</div>
      <div className="paws-container">
        {[1, 2, 3, 4, 5].map(num => (
          <div className='paw'
            key={num}
            style={{
              backgroundImage: `url(${num <= players ? pawSelectedIcon : pawIcon})`,
            }}
            onClick={() => handlePlayerChange(num)}
          />
        ))}
      </div>
      <div className="cat-button-container">
        <CatButton onClick={handleStartGame} />
      </div>
    </div>
  );
};

export default HomeScreen;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GameScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUsers, faUserPlus, faUserMinus, faBomb, faFileCirclePlus, faFileCircleMinus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const GameScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { players } = location.state || {};
  const initialPlayers = players || 2;
  const [cards, setCards] = useState(0);
  const [alivePlayers, setAlivePlayers] = useState(initialPlayers);
  const [bombs, setBombs] = useState(0);

  useEffect(() => {
    const updateGameSettings = () => {
      switch (initialPlayers) {
        case 2:
          setCards(9);
          setBombs(1);
          break;
        case 3:
          setCards(11);
          setBombs(2);
          break;
        case 4:
          setCards(29);
          setBombs(4);
          break;
        case 5:
          setCards(21);
          setBombs(4);
          break;
        default:
          setCards(9);
          setBombs(1);
      }
    };

    updateGameSettings();
    setAlivePlayers(initialPlayers);
  }, [initialPlayers]);

  const maxCards = {
    2: 9,
    3: 11,
    4: 29,
    5: 21,
  }[initialPlayers] || 9;

  // Calculate bombChance and cap it at 100%
  const bombChance = Math.min(((bombs / cards) * 100).toFixed(2), 100);

  const handleCardIncrease = () => {
    if (cards < maxCards) setCards(cards + 1);
  };

  const handleCardDecrease = () => {
    if (cards > 0) setCards(cards - 1);
  };

  const handlePlayerIncrease = () => {
    if (alivePlayers < initialPlayers) {
      setAlivePlayers(prev => prev + 1);
      setBombs(prev => prev + 1); // Add a bomb when a player is added
    }
  };

  const handlePlayerDecrease = () => {
    if (alivePlayers > 2) {
      setAlivePlayers(prev => prev - 1);
      setBombs(prev => prev - 1); // Remove a bomb when a player is removed
    }
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the HomeScreen
  };

  const handleButtonClick = (event, action) => {
    const button = event.currentTarget;
    button.classList.add('clicked');
    
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 500); // Match the animation duration

    action(); // Call the specific action
  };

  return (
    <div className="game-screen-container">
      <ul className="game-stats-list">
        <li>
          <div className="square-container">
            <div className="icon-square">
              <FontAwesomeIcon icon={faFile} className="icon" />
            </div>
            <div className="value-square">
              <div className="value">{cards}</div>
            </div>
          </div>
        </li>
        <li>
          <div className="square-container">
            <div className="icon-square alive-players">
              <FontAwesomeIcon icon={faUsers} className="icon" />
            </div>
            <div className="value-square">
              <div className="value">{alivePlayers}</div>
            </div>
          </div>
        </li>
        <li>
          <div className="square-container">
            <div className="icon-square">
              <FontAwesomeIcon icon={faBomb} className="icon" />
            </div>
            <div className="value-square">
              <div className="value">{bombChance}%</div>
            </div>
          </div>
        </li>
      </ul>
      <div className="buttons-container">
        <button
          className="control-button"
          onClick={(event) => handleButtonClick(event, handlePlayerDecrease)}
          disabled={alivePlayers <= 2}
        >
          <FontAwesomeIcon icon={faUserMinus} />
        </button>
        <button
          className="control-button"
          onClick={(event) => handleButtonClick(event, handlePlayerIncrease)}
          disabled={alivePlayers >= initialPlayers}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
        <button
          className="control-button"
          onClick={(event) => handleButtonClick(event, handleCardDecrease)}
          disabled={cards === 1}
        >
          <FontAwesomeIcon icon={faFileCircleMinus} />
        </button>
        <button
          className="control-button"
          onClick={(event) => handleButtonClick(event, handleCardIncrease)}
          disabled={cards >= maxCards}
        >
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </button>
        <button className="back-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
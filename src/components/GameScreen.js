import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
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
    setAlivePlayers(initialPlayers);
  }, [initialPlayers]);

  const maxCards = {
    2: 9,
    3: 11,
    4: 29,
    5: 21,
  }[initialPlayers] || 9;

  const bombChance = ((bombs / cards) * 100).toFixed(2);

  const handleCardIncrease = () => {
    if (cards < maxCards) setCards(cards + 1);
  };

  const handleCardDecrease = () => {
    if (cards > 0) setCards(cards - 1);
  };

  const handlePlayerIncrease = () => {
    if (alivePlayers < initialPlayers) {
      setAlivePlayers(alivePlayers + 1);
      setBombs(bombs + 1);
    }
  };

  const handlePlayerDecrease = () => {
    if (alivePlayers > 2) setAlivePlayers(alivePlayers - 1);
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the HomeScreen
  };

  return (
    <div className="game-screen-container">
      <h1 className="game-screen-title">Game Stats</h1>
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
            <div className="icon-square">
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
          onClick={handlePlayerDecrease}
          disabled={alivePlayers <= 2}
        >
          <div className="icon-container"><FontAwesomeIcon icon={faUserMinus} /></div>
        </button>
        <button
          className="control-button"
          onClick={handlePlayerIncrease}
          disabled={alivePlayers >= initialPlayers}
        >
          <div className="icon-container"><FontAwesomeIcon icon={faUserPlus} /></div>
        </button>
        <button
          className="control-button"
          onClick={handleCardDecrease}
          disabled={cards === 1}
        >
          <div className="icon-container"><FontAwesomeIcon icon={faFileCircleMinus} /></div>
        </button>
        <button
          className="control-button"
          onClick={handleCardIncrease}
          disabled={cards >= maxCards}
        >
          <div className="icon-container"><FontAwesomeIcon icon={faFileCirclePlus} /></div>
        </button>
      </div>
      <button className="back-button" style={{ position: 'fixed', top: 43, left: 20 }} onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
};

export default GameScreen;

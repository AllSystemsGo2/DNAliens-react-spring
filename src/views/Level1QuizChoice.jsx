import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../store/slices/pageSlice';
import Scene from '../components/Scene';
import PlayerShip from '../components/characters/PlayerShip';
import Lop from '../components/characters/Lop';
import Player from '../components/characters/Player';
import Sprinkles from '../components/characters/Sprinkles';
import starryBackground from '../assets/starry-background.jpg';
import planetForeground from '../assets/planet-foreground.png';
import './Level1QuizChoice.css';

const defaultAttributes = {
  showUIOverlay: false
};

const Level1QuizChoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showUIOverlay } = useSelector(state => selectPageAttributes(state, 'level1quizchoice', defaultAttributes));

  useEffect(() => {
    dispatch(initializePageAttributes({ pageId: 'level1quizchoice', props: defaultAttributes }));
  }, [dispatch]);


  const handleFightChoice = () => {
    navigate('/level1-fight');
  };

  const handleEscapeChoice = () => {
    navigate('/level1-escape');
  };

  return (
    <div className="quiz-choice-container">
      <Scene skyImage={starryBackground} terrainImage={planetForeground} transformTerrain="scaleX(-1)" />
      <div className="characters-group">
        <PlayerShip left="55vh" bottom="25vh" size="55vh" zIndex={1} character="cellina-spaceship" state="landed" />
        <Player left="10vh" bottom="5vh" zIndex={2} state="idle" />
        <Lop left="35vh" bottom="12vh" zIndex={2} state="idle" />
        <Sprinkles left="60vh" bottom="10vh" zIndex={2} state="idle" />
      </div>
      {showUIOverlay && (
        <div id="challenge-choice" className="ui-overlay">
          <h1>Choose Your Challenge</h1>
          <div className="choice-buttons">
            <button className="choice-button fight" onClick={handleFightChoice}>
              <h2>Fight</h2>
              <p>Face off against the aliens in combat!</p>
            </button>
            <button className="choice-button escape" onClick={handleEscapeChoice}>
              <h2>Escape</h2>
              <p>Try to outrun the alien ships!</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level1QuizChoice;

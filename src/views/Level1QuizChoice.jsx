import React, { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../store/slices/pageSlice';
import Scene from '../components/Scene';
import PlayerShip from '../components/characters/PlayerShip';
import Lop from '../components/characters/Lop';
import Player from '../components/characters/Player';
import Sprinkles from '../components/characters/Sprinkles';
import Enemy from '../components/characters/Enemy';
import SpeechBubble from '../components/SpeechBubble';
import starryBackground from '../assets/starry-background.jpg';
import planetForeground from '../assets/planet-foreground.png';
import './Level1QuizChoice.css';

const defaultAttributes = {
  showEnemies: false,
  showUIOverlay: false,
  showThreaten: false
};

const Level1QuizChoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showEnemies, showUIOverlay, showThreaten } = useSelector(state => selectPageAttributes(state, 'level1quizchoice', defaultAttributes));


  useEffect(() => {
    dispatch(initializePageAttributes({ pageId: 'level1quizchoice', props: defaultAttributes }));

    // Trigger enemy animations after 1.5 seconds
    const timer = setTimeout(() => {
      dispatch(setShowEnemies(true));
      setTimeout(() => {
        dispatch(setShowThreaten(true))
      }, 1000);

      setTimeout(() => {
        dispatch(setShowUIOverlay(true))
      }, 3000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const setShowEnemies = (value) => setPageAttribute({pageId: "level1quizchoice", key: "showEnemies", value})
  const setShowUIOverlay = (value) => setPageAttribute({pageId: "level1quizchoice", key: "showUIOverlay", value})
  const setShowThreaten = (value) => setPageAttribute({pageId: "level1quizchoice", key: "showThreaten", value})

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
        <PlayerShip left="25vw" bottom="25vh" size="45vh" zIndex={1} character="cellina-spaceship" state="landed" />
        <Player left="5vw" bottom="5vh" zIndex={2} state="idle" />
        <Lop left="15vw" bottom="12vh" zIndex={2} state="idle" />
        <Sprinkles left="30vw" bottom="10vh" zIndex={2} state="idle" />
        <Enemy id="baddies1" right={showEnemies ? '5vw' : '-30vw'} bottom="5vh" zIndex={2} state="idle" character="baddies1">
          {showThreaten && <SpeechBubble subText={"Hey! That's a cute creature you have there. Be a shame if anyone tried to take it."} />}
        </Enemy>
        <Enemy id="baddies2" right={showEnemies ? '1vw' : '-40vw'} bottom="1vh" zIndex={2} state="idle" character="baddies2" />
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

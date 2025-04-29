import React, { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice';
import Scene from '../../components/Scene';
import PlayerShip from '../../components/characters/PlayerShip';
import Lop from '../../components/characters/Lop';
import Player from '../../components/characters/Player';
import Sprinkles from '../../components/characters/Sprinkles';
import Enemy from '../../components/characters/Enemy';
import SpeechBubble from '../../components/SpeechBubble';
import starryBackground from '../../assets/starry-background.jpg';
import planetForeground from '../../assets/planet-foreground.png';
import './Level1QuizChoice.css';

const defaultAttributes = {
  showEnemies: false,
  showUIOverlay: false,
  showThreaten: false,
  showFightText: false,
  showEscapeText: false,
  gotoFightStance: false,
  gotoEscapeStance: false,
  showReadyButton: false
};

const Level1QuizChoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showEnemies, showUIOverlay, showThreaten, showFightText, showEscapeText, gotoEscapeStance, gotoFightStance, showReadyButton } = useSelector(state => selectPageAttributes(state, 'level1quizchoice', defaultAttributes));


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

  useEffect(() => {
    if (showFightText) {
      setTimeout(() => {
        dispatch(setGotoFightStance(true));
      }, 1500);
    }
    if (showEscapeText) {
      setTimeout(() => {
        dispatch(setGotoEscapeStance(true));
      }, 1500);
    }
  }, [showFightText, showEscapeText, dispatch]);

  useEffect(() => {
    if (gotoFightStance || gotoEscapeStance) {
      setTimeout(() => {
        dispatch(setShowReadyButton(true));
      }, 1500);
    }
  }, [gotoFightStance, gotoEscapeStance, dispatch]);

  const setShowEnemies = (value) => setPageAttribute({pageId: "level1quizchoice", key: "showEnemies", value})
  const setShowUIOverlay = (value) => setPageAttribute({pageId: "level1quizchoice", key: "showUIOverlay", value})
  const setShowThreaten = (value) => setPageAttribute({pageId: "level1quizchoice", key: "showThreaten", value})
  const setShowFightText = (value) => setPageAttribute({pageId: "level1quizchoice", key: "showFightText", value})
  const setShowEscapeText = (value) => setPageAttribute({pageId: "level1quizchoice", key: "showEscapeText", value})
  const setGotoFightStance = (value) => setPageAttribute({pageId: "level1quizchoice", key: "gotoFightStance", value})
  const setGotoEscapeStance = (value) => setPageAttribute({pageId: "level1quizchoice", key: "gotoEscapeStance", value})
  const setShowReadyButton = (value) => setPageAttribute({pageId: "level1quizchoice", key: "showReadyButton", value})

  const handleFightChoice = () => {
    dispatch(setShowUIOverlay(false))
    dispatch(setShowThreaten(false))
    dispatch(setShowFightText(true))
  };

  const handleEscapeChoice = () => {
    dispatch(setShowUIOverlay(false))
    dispatch(setShowThreaten(false))
    dispatch(setShowEscapeText(true))
  };

  const handleReady = (choice) => {
    if (choice === 'fight') {
      navigate('/Level1/Level1Fight');
    } else if (choice === 'escape') {
      navigate('/Level1/Level1Escape');
    }
  };

  return (
    <div className="view quiz-choice-container">
      <Scene skyImage={starryBackground} terrainImage={planetForeground} transformTerrain="scaleX(-1)" />
      <div className="characters-group">
        <PlayerShip left="25vw" bottom="25vh" size="45vh" zIndex={1} character="cellina-spaceship" state="landed" />
        <Player left={!gotoFightStance ? "5vw" : "25vw"} faceDirection='right' bottom={!gotoFightStance ? "5vh" : "12vh"} zIndex={2} state="idle">
          {showFightText && <SpeechBubble subText={"I’d like to see you try!"} />}
          {showEscapeText && <SpeechBubble subText={"Quick everyone on the ship!"} />}
        </Player>
        <Lop left={!gotoFightStance ? "15vw" : "15vw"} faceDirection='right' bottom={!gotoFightStance ? "12vh" : "10vh"} zIndex={2} state="idle" />
        <Sprinkles left={!gotoFightStance ? "30vw" : "5vw"} faceDirection='right' bottom={!gotoFightStance ? "10vh" : "5vh"} zIndex={2} state="idle" />
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
      {setShowReadyButton && gotoFightStance && (
        <div id="challenge-choice" className="ui-overlay">
          <div className="choice-buttons">
            <button className="choice-button fight" onClick={() => handleReady('fight')}>
              <h2>Ready?</h2>
              <p>Fight!</p>
            </button>
          </div>
        </div>
      )}
      {setShowReadyButton && gotoEscapeStance && (
        <div id="challenge-choice" className="ui-overlay">
          <div className="choice-buttons">
            <button className="choice-button escape" onClick={() => handleReady('escape')}>
              <h2>Ready?</h2>
              <p>Run!</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level1QuizChoice;

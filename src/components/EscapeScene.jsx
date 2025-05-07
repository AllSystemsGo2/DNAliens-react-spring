import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import PlayerShip from './characters/PlayerShip';
import EnemyShip from './characters/EnemyShip';
import PopEffect from './PopEffect';
import './EscapeScene.css';
import MultipleChoicePrompt from './MultipleChoicePrompt';
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../store/slices/pageSlice'
/**
 * PageId - is the prefix under which component attributes will be stored in the pageSlice
*/

const defaultAttributes = {
  questionIndex: 0
}

const EscapeScene = ({ pageId, player, enemy, questionBank, playerHealth, enemyHealth, maxHealth = 10, onPlayerStall, onPlayerBoost, onEscapeStateEnd}) => {
  const dispatch = useDispatch()  
  const [escapeState, setEscapeState] = useState("init")
  const [_playerHeath, set_PlayerHealth] = useState(playerHealth)
  const [_enemyHealth, set_EnemyHealth] = useState(enemyHealth)
  const [playerState, setPlayerState] = useState("idle")
  const [enemyState, setEnemyState] = useState("idle")
  const [playerPopEffect, setPlayerPopEffect] = useState(null)
  const [enemyPopEffect, setEnemyPopEffect] = useState(null)
  
  const setQuestionIndex = (value) => setPageAttribute({pageId: pageId, key: "questionIndex", value})
  const {
    questionIndex,
  } = useSelector((state) => selectPageAttributes(state, pageId, defaultAttributes))

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: pageId, props: defaultAttributes}))
  }, [dispatch, pageId])

  useEffect(() => {
    if(escapeState == "init") {
      setTimeout(() => { 
        setEscapeState("question")
      }, 2000)
    }
    else if(escapeState == "question") {
      if(questionIndex >= questionBank?.questions?.length) {
        setEscapeState("end")
      }
    }

    // Animate the Escape. Replace later with an event system?
    else if(escapeState == "playerBoost") {
      // setPlayerState("fuel")
      setTimeout(() => {
        // setPlayerState("boost")
        setTimeout(() => {
          setEscapeState("reinit")        
        }, 1000)
      }, 1000)
    }
    else if(escapeState == "enemyBoost") {
      // setPlayerState("fuel")
      setTimeout(() => {
        // setPlayerState("stall")
        // setEnemyState("gain")
        setTimeout(() => {
          setEscapeState("reinit")        
        }, 1000)
      }, 1000)
    }
    else if(escapeState == "reinit") {
      setPlayerState("idle")
      setEnemyState("idle")
      set_PlayerHealth(playerHealth)
      set_EnemyHealth(enemyHealth)

      if(questionIndex < questionBank?.questions?.length) {
        setEscapeState("question")
      }
      else {
        setEscapeState("end")
      }
    }
    else if(escapeState == "end") {
      const totalHealth = _playerHeath + (maxHealth - _enemyHealth)
      
      if(totalHealth / questionBank?.questions?.length >= .8) {
        setPlayerState("win")
        setEnemyState("faint")
        onEscapeStateEnd("win")
      }
      else {
        setPlayerState("faint")
        setEnemyState("win")
        onEscapeStateEnd("lose")
      }
    }

  }, [escapeState])

  const handleQuestion = (answer) => {
    const right = answer === questionBank?.questions[questionIndex]?.correct;
    if(right) {
      onPlayerBoost(true);
      setEscapeState("playerBoost")
    } else {
      onPlayerStall(true);
      setEscapeState("enemyBoost");
    }

    dispatch(setQuestionIndex(questionIndex + 1));
  };

  const showMCPrompt = () => {
    return escapeState === "question" && questionIndex < questionBank?.questions?.length
  }

  return (
    <div className="escape-scene">
      {showMCPrompt() && <MultipleChoicePrompt responseKey={questionIndex} style={{ position: 'absolute', top: '5vh', left: '25%', width: '50%' }} prompt={questionBank?.questions[questionIndex]?.question} choices={questionBank?.questions[questionIndex]?.answers} onSubmit={handleQuestion} submitText='Submit'/>}      
      <div className="escape-container">
          <PlayerShip left={`${(25+5*_playerHeath)}vh`} bottom="25vh" size="10vh" zIndex={3} character={player}state={playerState}/>
          <EnemyShip left={`${(10+5*_enemyHealth)}vh`} bottom="10vh" size="15vh" zIndex={3} character={enemy} state={enemyState}/>
      </div>
      <div className="effects-container">
        {<PopEffect type={playerPopEffect} left="12vh" /> }
        {<PopEffect type={enemyPopEffect} right="12vh" /> }
      </div>
      {escapeState == "end" && <div className="end-screen">
        
      </div>}
    </div>
  );
};

EscapeScene.propTypes = {
  pageId: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  enemy: PropTypes.string.isRequired,
  questionBank: PropTypes.object.isRequired,
  playerHealth: PropTypes.number.isRequired,
  enemyHealth: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  onEscapeStateEnd: PropTypes.func.isRequired,
};

export default EscapeScene;

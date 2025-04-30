import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import Player from './characters/Player';
import Lop from './characters/Lop';
import Enemy from './characters/Enemy';
import PopEffect from './PopEffect';
import './FightScene.css';
import MultipleChoicePrompt from './MultipleChoicePrompt';
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../store/slices/pageSlice'
/**
 * PageId - is the prefix under which component attributes will be stored in the pageSlice
*/

const defaultAttributes = {
  questionIndex: 0
}

const FightScene = ({ pageId, players, enemies, questionBank, playerHealth, enemyHealth, maxHealth = 10, onEnemyStun, onPlayerStun, onFightStateEnd, turn="enemy"}) => {
  const dispatch = useDispatch()  
  const [fightState, setFightState] = useState("init")
  const [_playerHeath, set_PlayerHealth] = useState(playerHealth)
  const [_enemyHealth, set_EnemyHealth] = useState(enemyHealth)
  const [_turn, set_Turn] = useState(turn)
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
    if(fightState == "init") {
      setTimeout(() => { 
        setFightState("question")
      }, 2000)
    }
    else if(fightState == "question") {
      if(questionIndex >= questionBank?.questions?.length) {
        setFightState("end")
      }
    }

    // Animate the Fight. Replace later with an event system?
    else if(fightState == "enemyStun" && _turn == 'enemy') {
      setEnemyState("attack")
      setTimeout(() => {
        setPlayerState("deflect")
        setEnemyPopEffect("miss")
        setTimeout(() => {
          setEnemyState("stun")
          setEnemyPopEffect("hit")
          setTimeout(() => {
            setFightState("reinit")        
          }, 1000)
        }, 1000)
      }, 1000)
    }
    else if(fightState == "playerStun" && _turn == 'player') {
      setPlayerState("attack")
      setTimeout(() => {
        setEnemyState("deflect")
        setPlayerPopEffect("miss")
        setTimeout(() => {
          setPlayerState("stun")
          setPlayerPopEffect("hit")
          setTimeout(() => {
            setFightState("reinit")        
          }, 1000)
        }, 1000)
      }, 1000)
    }
    else if(fightState == "enemyStun" && _turn == 'player') {
      setPlayerState("attack")
      setTimeout(() => {
        setEnemyState("stun")
        setEnemyPopEffect("hit")
        setTimeout(() => {
          setFightState("reinit")        
        }, 1000)
      }, 1000)
    }
    else if(fightState == "playerStun" && _turn == 'enemy') {
      setEnemyState("attack")
      setTimeout(() => {
        setPlayerState("stun")
        setPlayerPopEffect("hit")
        setTimeout(() => {
          setFightState("reinit")        
        }, 1000)
      }, 1000)
    }
    else if(fightState == "reinit") {
      setPlayerState("idle")
      setEnemyState("idle")
      set_PlayerHealth(playerHealth)
      set_EnemyHealth(enemyHealth)
      set_Turn(turn)

      if(questionIndex < questionBank?.questions?.length) {
        setFightState("question")
      }
      else {
        setFightState("end")
      }
    }
    else if(fightState == "end") {
      const totalHealth = _playerHeath + (maxHealth - _enemyHealth)
      
      if(totalHealth / questionBank?.questions?.length >= .8) {
        setPlayerState("win")
        setEnemyState("faint")
        onFightStateEnd("win")
      }
      else {
        setPlayerState("faint")
        setEnemyState("win")
        onFightStateEnd("lose")
      }
    }

  }, [fightState])

  const handleQuestion = (answer) => {
    const right = answer === questionBank?.questions[questionIndex]?.correct;
    if(right) {
      onEnemyStun(true);
      setFightState("enemyStun")
    } else {
      onPlayerStun(true);
      setFightState("playerStun");
    }

    dispatch(setQuestionIndex(questionIndex + 1));
  };

  const showMCPrompt = () => {
    return fightState === "question" && questionIndex < questionBank?.questions?.length
  }

  return (
    <div className="fight-scene">
      {showMCPrompt() && <MultipleChoicePrompt prompt={questionBank?.questions[questionIndex]?.question} responseKey={questionBank?.questions[questionIndex]?.responseKey} choices={questionBank?.questions[questionIndex]?.answers} onSubmit={handleQuestion} submitText='Submit'/>}
      <div className="health-row">
        <div className="health-container">
          <div className="health-bar">
            <div className="health-fill" style={{ width: `${(_playerHeath / maxHealth) * 100}%` }}></div>
          </div>
        </div>
        <div className="health-container">
          <div className="health-bar">
            <div className="health-fill" style={{ width: `${(_enemyHealth / maxHealth) * 100}%` }}></div>
          </div>
        </div>
      </div>
      <div className="fight-container">
        <div className="characters-container">
          {players.map((player, index) => {
            switch (player) {
              case 'player':
                return <Player key={index} left={`${10*index+5}vh`} zIndex={players.length-index} state={playerState}/>;
              case 'lop':
                return <Lop key={index} left={`${10*index+5}vh`} zIndex={players.length-index} state={playerState} />;
            default:
              return null;
          }
        })}
        </div>
        <div className="enemies-container">
          {enemies.map((enemy, index) => (
          <Enemy id={`baddies${index+1}`} key={index} character={enemy} right={`${10*index+5}vh`} zIndex={enemies.length-index} state={enemyState} />
        ))}
        </div>
      </div>
      <div className="effects-container">
        {<PopEffect type={playerPopEffect} left="12vh" /> }
        {<PopEffect type={enemyPopEffect} right="12vh" /> }
      </div>
      {fightState == "end" && <div className="end-screen">
        
      </div>}
    </div>
  );
};

FightScene.propTypes = {
  pageId: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  enemies: PropTypes.arrayOf(PropTypes.string).isRequired,
  questionBank: PropTypes.object.isRequired,
  playerHealth: PropTypes.number.isRequired,
  enemyHealth: PropTypes.number.isRequired,
  onFightStateEnd: PropTypes.func.isRequired,
  maxHealth: PropTypes.number.isRequired,
  turn: PropTypes.string
};

export default FightScene;

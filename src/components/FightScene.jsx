import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import Player from './Character/Player';
import Lop from './Character/Lop';
import Enemy from './Character/Enemy';
import { useSpring, animated } from '@react-spring/web';
import './FightScene.css';
import MultipleChoicePrompt from './MultipleChoicePrompt';
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../store/slices/pageSlice'
/**
 * PageId - is the prefix under which component attributes will be stored in the pageSlice
*/

const defaultAttributes = {
  questionIndex: 0
}

const FightScene = ({ pageId, players, enemies, questionBank, playerHealth, enemyHealth, maxHealth = 10, onEnemyStun, onPlayerStun, turn}) => {
  const dispatch = useDispatch()  
  const [fightState, setFightState] = useState("init")
  const [_playerHeath, set_PlayerHealth] = useState(playerHealth)
  const [_enemyHealth, set_EnemyHealth] = useState(enemyHealth)
  const [playerState, setPlayerState] = useState("idle")
  const [enemyState, setEnemyState] = useState("idle")
  
  const setQuestionIndex = (value) => setPageAttribute({pageId: pageId, key: "questionIndex", value})
  const {
    questionIndex,
  } = useSelector((state) => selectPageAttributes(state, pageId, defaultAttributes))

  useEffect(() => {
    if(fightState == "reinit") {
      set_PlayerHealth(playerHealth)
      set_EnemyHealth(enemyHealth)
    }
  }, [fightState, playerHealth, enemyHealth])

  // useEffect(() => {
  //   //run state machine check??

  // }, [])

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: pageId, props: defaultAttributes}))
  }, [dispatch, pageId])

  useEffect(() => {
    if(fightState == "init") {
      setTimeout(() => { 
        setFightState("question")
      }, 2000)
    }
    if(fightState == "question") {
      if(questionIndex >= questionBank?.questions?.length) {
        setFightState("end")
      }
    }

    // Animate the Fight. Replace later with an event system?
    if(fightState == "enemyStun" && turn == 'enemy') {
      setEnemyState("attack")
      setTimeout(() => {
        setPlayerState("deflect")
        setTimeout(() => {
          setEnemyState("stun")
          setTimeout(() => {
            setFightState("reinit")        
          }, 1000)
        }, 1000)
      }, 1000)
    }
    if(fightState == "playerStun" && turn == 'player') {
      setPlayerState("attack")
      setTimeout(() => {
        setEnemyState("deflect")
        setTimeout(() => {
          setPlayerState("stun")
          setTimeout(() => {
            setFightState("reinit")        
          }, 1000)
        }, 1000)
      }, 1000)
    }
    if(fightState == "enemyStun" && turn == 'player') {
      setPlayerState("attack")
      setTimeout(() => {
        setEnemyState("stun")
        setTimeout(() => {
          setFightState("reinit")        
        }, 1000)
      }, 1000)
    }
    if(fightState == "playerStun" && turn == 'enemy') {
      setEnemyState("attack")
      setTimeout(() => {
        setPlayerState("stun")
        setTimeout(() => {
          setFightState("reinit")        
        }, 1000)
      }, 1000)
    }

    if(fightState == "reinit") {
      if(questionIndex < questionBank?.questions?.length) {
        setFightState("question")
      }
      else {
        setFightState("end")
      }
    }

    if(fightState == "end") {
      // do nothing
    }
  }, [fightState, turn, questionIndex, questionBank])

  const handleQuestion = (answer) => {
    const right = answer === questionBank?.questions[questionIndex]?.correct;
    console.log("handleQuestion", right)
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
      {showMCPrompt() && <MultipleChoicePrompt key={questionIndex} style={{ position: 'absolute', top: '5vh', left: '25%', width: '50%' }} question={questionBank?.questions[questionIndex]?.question} responseKey={questionBank?.questions[questionIndex]?.responseKey} choices={questionBank?.questions[questionIndex]?.answers} onSubmit={handleQuestion} submitText='Submit'/>}
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
          <Enemy key={index} character={enemy} right={`${10*index+5}vh`} zIndex={enemies.length-index} state={enemyState} />
        ))}
        </div>
      </div>
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
  maxHealth: PropTypes.number.isRequired,
  turn: PropTypes.string
};

export default FightScene;

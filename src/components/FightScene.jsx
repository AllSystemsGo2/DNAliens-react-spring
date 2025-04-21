import React, { useEffect } from 'react';
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

const FightScene = ({ pageId, players, enemies, questionBank, playerHealth, enemyHealth, maxHealth = 10, turn = "enemy", onEnemyStun, onPlayerStun}) => {
  const dispatch = useDispatch()  
  const setQuestionIndex = (value) => setPageAttribute({pageId: pageId, key: "questionIndex", value})
  const {
    questionIndex,
  } = useSelector((state) => selectPageAttributes(state, pageId, defaultAttributes))

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: pageId, props: defaultAttributes}))
  }, [dispatch, pageId])

  useEffect( () => {
    console.log("questionIndex", questionIndex)
  }, [questionIndex])

  const handleQuestion = (answer) => {
    const right = answer === questionBank?.questions[questionIndex]?.correct;
    console.log("handleQuestion", right)
    if(right) {
      onEnemyStun(true);
    } else {
      onPlayerStun(true);
    }
    dispatch(setQuestionIndex(questionIndex + 1));
  };

  return (
    <div className="fight-scene">
      <MultipleChoicePrompt key={questionIndex} style={{ position: 'absolute', top: '5vh', left: '25%', width: '50%' }} question={questionBank?.questions[questionIndex]?.question} responseKey={questionBank?.questions[questionIndex]?.responseKey} choices={questionBank?.questions[questionIndex]?.answers} onSubmit={handleQuestion} submitText='Submit'/>
      <div className="health-row">
        <div className="health-container">
          <div className="health-bar">
            <div className="health-fill" style={{ width: `${(playerHealth / maxHealth) * 100}%` }}></div>
          </div>
        </div>
        <div className="health-container">
          <div className="health-bar">
            <div className="health-fill" style={{ width: `${(enemyHealth / maxHealth) * 100}%` }}></div>
          </div>
        </div>
      </div>
      <div className="fight-container">
        <div className="characters-container">
          {players.map((player, index) => {
            switch (player) {
              case 'player':
                return <Player key={index} left={`${10*index+5}vh`} zIndex={players.length-index}/>;
              case 'lop':
                return <Lop key={index} left={`${10*index+5}vh`} zIndex={players.length-index} />;
            default:
              return null;
          }
        })}
        </div>
        <div className="enemies-container">
          {enemies.map((enemy, index) => (
          <Enemy key={index} character={enemy} right={`${10*index+5}vh`} zIndex={enemies.length-index} />
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

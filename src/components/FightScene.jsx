import React from 'react';
import PropTypes from 'prop-types';
import Player from './Character/Player';
import Lop from './Character/Lop';
import Enemy from './Character/Enemy';
import { useSpring, animated } from '@react-spring/web';
import './FightScene.css';
import MultipleChoicePrompt from './MultipleChoicePrompt';


const FightScene = ({ players, enemies, questionBank, playerHealth, enemyHealth, maxHealth, turn = "enemy" }) => {

  const handleQuestion1 = (answer) => {
    console.log('Answer:', answer);
  };

  return (
    <div className="fight-scene">
      <MultipleChoicePrompt style={{ position: 'absolute', top: '5vh', left: '25%', width: '50%' }} question={questionBank?.questions[0]?.question} responseKey={questionBank?.questions[0]?.responseKey} choices={questionBank?.questions[0]?.answers} onSubmit={handleQuestion1} />
      <div className="health-container">
        <div className="health-bar">
          <div className="health-fill" style={{ width: `${(playerHealth / maxHealth) * 100}%` }}></div>
        </div>
      </div>
      <div className="enemy-health-container">
        <div className="health-bar">
          <div className="health-fill" style={{ width: `${(enemyHealth / maxHealth) * 100}%` }}></div>
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
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  enemies: PropTypes.arrayOf(PropTypes.string).isRequired,
  questionBank: PropTypes.object.isRequired,
  playerHealth: PropTypes.number.isRequired,
  enemyHealth: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  turn: PropTypes.string,
};

export default FightScene;

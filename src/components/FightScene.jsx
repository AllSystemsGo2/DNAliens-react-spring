import React from 'react';
import PropTypes from 'prop-types';
import Player from './Character/Player';
import Lop from './Character/Lop';
import Enemy from './Character/Enemy';
import { useSpring, animated } from '@react-spring/web';
import './FightScene.css';

const FightScene = ({ players, enemies, questionBank, playerHealth, enemyHealth, maxHealth, turn = "enemy" }) => {
  return (
    <div className="fight-scene">
      {/* Component content will go here */}
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

      <div className="characters-container">
      {players.map((player, index) => {
        switch (player) {
          case 'player':
            return <Player key={index} />;
          case 'lop':
            return <Lop key={index} />;
          default:
            return null;
        }
      })}
      </div>
      <div className="enemies-container">
      {enemies.map((enemy, index) => (
        <Enemy key={index} characterImage={enemy} />
      ))}
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

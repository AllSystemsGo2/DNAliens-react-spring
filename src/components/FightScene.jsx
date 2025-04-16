import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';

const FightScene = ({ player1, player2, player3, enemies, questionBank, playerHealth, enemyHealth, maxHealth, turn = "enemy" }) => {
  return (
    <div className="fight-scene">
      {/* Component content will go here */}
    </div>
  );
};

FightScene.propTypes = {
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  player3: PropTypes.string.isRequired,
  enemies: PropTypes.arrayOf(PropTypes.string).isRequired,
  questionBank: PropTypes.object.isRequired,
  playerHealth: PropTypes.number.isRequired,
  enemyHealth: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  turn: PropTypes.string,
};

export default FightScene;

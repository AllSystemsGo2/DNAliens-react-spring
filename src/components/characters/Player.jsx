import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/player-character-2.png'
import MovableCharacter from './MovableCharacter';

const Player = ({ bottom = '10vh', left = '5vh', right, zIndex = 2, state }) => {
  const [showDebugState, setShowDebugState] = useState(false)

  useEffect(() => {
    console.error("Player state", state)
    setShowDebugState(true)
    setTimeout( () => {
      setShowDebugState(false)
    }, 1000)
  },[state])

  const characterStyle = {
    position: 'block',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${characterImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transform: 'scaleX(-1)',
  };

  return (
    <MovableCharacter id="player-character" bottom={bottom} left={left} right={right} zIndex={zIndex}>
      <div style={characterStyle}></div>
      {showDebugState && <span id="state-debug">{state}</span>}
    </MovableCharacter>
  );
};

Player.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string
};

export default Player;

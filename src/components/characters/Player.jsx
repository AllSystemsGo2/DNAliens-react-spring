import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/player-character-2.png'
import MovableCharacter from './MovableCharacter';

const Player = ({ bottom = '10vh', left = '5vh', right, faceDirection = 'right', zIndex = 2, state, children }) => {
  const [showDebugState, setShowDebugState] = useState(false)

  useEffect(() => {
    setShowDebugState(true)
    setTimeout( () => {
      setShowDebugState(false)
    }, 1000)
  },[state])

  const blockStyle = {
    position: 'block',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'characterBounce 2s ease-in-out infinite'
  };

  const characterStyle = {
    position: 'block',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${characterImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transform: faceDirection === 'left' ? 'scaleX(-1)' : faceDirection === 'right' ? 'scaleX(1)' : '',
  };

  return (
    <MovableCharacter id="player-character" bottom={bottom} left={left} right={right} zIndex={zIndex}>
      <div style={blockStyle}>
        <div style={characterStyle}></div>
      </div>
      {showDebugState && <span id="state-debug">{state}</span>}
      {children}
    </MovableCharacter>
  );
};

Player.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string,
  faceDirection: PropTypes.string,
  children: PropTypes.node
};

export default Player;

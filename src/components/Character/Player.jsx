import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/player-character-2.png'

const Player = ({ bottom = '10vh', left = '5vh', right, zIndex = 2, state }) => {
  const [showDebugState, setShowDebugState] = useState(false)

  useEffect(() => {
    console.error("Player state", state)
    setShowDebugState(true)
    setTimeout( () => {
      setShowDebugState(false)
    }, 1000)
  },[state])

  const style = {
    position: 'absolute',
    bottom,
    ...(right ? { right } : {left}),
    width: '30vh',
    height: '30vh',
    backgroundImage: `url(${characterImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    animation: 'lopBounce 2s ease-in-out infinite',
    zIndex
  };

  return (
    <div id="player-character" style={style}>
      {showDebugState && <span id="state-debug">{state}</span>}
    </div>
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

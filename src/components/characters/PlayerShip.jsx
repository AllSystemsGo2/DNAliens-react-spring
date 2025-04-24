import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/cellina-spaceship.png'

// EscapeScene states: idle, boost, fuel, stall, win, faint
// State: landed - No bounce animation

const PlayerShip = ({ bottom = '10vh', left = '5vh', right, size = '30vh', character, zIndex = 2, state }) => {
  const [showDebugState, setShowDebugState] = useState(false)

  useEffect(() => {
    console.error("PlayerShip state", state)
    setShowDebugState(true)
    setTimeout( () => {
      setShowDebugState(false)
    }, 1000)
  },[state])

  const style = {
    position: 'absolute',
    bottom,
    ...(right ? { right } : {left}),
    width: size,
    height: size,
    ...(state === 'landed' ? { animation: 'none' } : { animation: 'characterBounce 2s ease-in-out infinite' }),
    zIndex
  };

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
    <div id="player-ship" style={style}>
      <div style={characterStyle}></div>
      {showDebugState && <div id="state-debug">{state}</div>}
    </div>
  );
};

PlayerShip.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string
};

export default PlayerShip;

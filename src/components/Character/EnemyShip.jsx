import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';

// state: idle, boost, fuel, stall, win, faint

const EnemyShip = ({ bottom = '10vh', left = '5vh', size = '30vh', right, zIndex = 2, character, state }) => {
  const [showDebugState, setShowDebugState] = useState(false)

  const characterUrl = ()=> {
    if(character === 'enemy1') {
      return false;
    }
    return false
  };

  useEffect(() => {
    console.error("EnemyShip state", state)
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
    animation: 'characterBounce 2s ease-in-out infinite',
    zIndex
  };

  const characterStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
    ...(characterUrl() ? {
      backgroundImage: `url(${characterUrl()})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    } : {
      backgroundColor: '#FF00FF' // Fuchsia fallback
    }),
  }

  return (
    <div id="enemy-ship" style={style}>
      <div style={characterStyle}></div>
      {showDebugState && <div id="state-debug">{state}</div>}
    </div>
  );
};

EnemyShip.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string
};

export default EnemyShip;

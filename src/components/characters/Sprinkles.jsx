import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/sprinkles1.png'

const Sprinkles = ({ bottom = '10vh', left = '5vh', right, zIndex = 2, state }) => {
  const [showDebugState, setShowDebugState] = useState(false)

  useEffect(() => {
    console.error("Sprinkles state", state)
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
  };

  return (
    <div id="player-character" style={style}>
      <div style={characterStyle}></div>
      {showDebugState && <span id="state-debug">{state}</span>}
    </div>
  );
};

Sprinkles.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string
};

export default Sprinkles;

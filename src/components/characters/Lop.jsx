import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/lop.png'


const LopCharacter = ({ bottom = '20vh', left = '5vh', right, zIndex = 2, state, children}) => {
  const [showDebugState, setShowDebugState] = useState(false)

  useEffect(() => {
    console.error("Lop state", state)
    setShowDebugState(true)
    setTimeout( () => {
      setShowDebugState(false)
    }, 1000)
  },[state])

  const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom,
    ...(right ? { right } : {left}),
    width: '30vh',
    height: '30vh',
    zIndex,
  };

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
    transform: 'scaleX(-1)',
  };

  return (
    <div id="lop-character" style={style}>
      <div style={blockStyle}>
        <div style={characterStyle}></div>
      </div>
      {showDebugState && <span id="state-debug">{state}</span>}
      {children}
    </div>
  );
};

LopCharacter.propTypes = {
  bottom: PropTypes.string,
  right: PropTypes.string,
  left: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string
};

export default LopCharacter;

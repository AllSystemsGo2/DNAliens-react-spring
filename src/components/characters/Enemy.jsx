import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import baddies1 from '../../assets/baddies1.png'
import baddies2 from '../../assets/baddies2.png'
import MovableCharacter from './MovableCharacter';

const Enemy = ({ id, character, bottom = '10vh', left = '5vh', right, faceDirection = 'left', zIndex = 2, state, children }) => {
  const characterUrl = ()=> {
    if(character === 'baddies1') {
      return baddies1;
    }
    if(character === 'baddies2') {
      return baddies2;
    }
    return false
  };


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
    ...(characterUrl() ? {
      backgroundImage: `url(${characterUrl()})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    } : {
      backgroundColor: '#FF00FF' // Fuchsia fallback
    }),   
    transform: faceDirection === 'left' ? 'scaleX(-1)' : faceDirection === 'right' ? 'scaleX(1)' : '',
  };

  return (
    <MovableCharacter id={`${id}-character`} bottom={bottom} left={left} right={right} zIndex={zIndex}>
      <div style={blockStyle}>
        <div style={characterStyle}/>
      </div>
      {showDebugState && <div id="state-debug">{state}</div>}
      {children}
    </MovableCharacter>
  );
};

Enemy.propTypes = {
  id: PropTypes.string.isRequired,
  character: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  faceDirection: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string,
  children: PropTypes.node
};

export default Enemy;

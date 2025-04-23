import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import baddies1 from '../../assets/baddies1.png'
import baddies2 from '../../assets/baddies2.png'


const Enemy = ({ character, bottom = '10vh', left = '5vh', right, zIndex = 2, state}) => {
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
    console.error("Enemy state", state)
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
    zIndex,
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
    transform: 'scaleX(-1)',
  };

  return (
    <div id="enemy-character" style={style}>
      <div style={characterStyle}></div>
      {showDebugState && <div id="state-debug">{state}</div>}
    </div>
  );
};

Enemy.propTypes = {
  characterImage: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string
};

export default Enemy;

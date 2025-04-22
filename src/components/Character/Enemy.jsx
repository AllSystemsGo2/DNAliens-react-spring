import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';



const Enemy = ({ character, bottom = '10vh', left = '5vh', right, zIndex = 2, state}) => {
  const characterUrl = ()=> {
    if(character === 'enemy1') {
      return false;
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
    ...(characterUrl() ? {
      backgroundImage: `url(${characterUrl()})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    } : {
      backgroundColor: '#FF00FF' // Fuchsia fallback
    }),
    zIndex,
    animation: 'lopBounce 2s ease-in-out infinite'
  };

  return (
    <div id="enemy-character" style={style}>
      {showDebugState && <div id="state-debug" style={{transform:"scaleX(-1)"}}>{state}</div>}
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

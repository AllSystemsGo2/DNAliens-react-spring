import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import baddies1 from '../../assets/baddies1.png'
import baddies2 from '../../assets/baddies2.png'


const Enemy = ({ character, bottom = '10vh', left = '5vh', right, zIndex = 2, state, children}) => {
  const characterUrl = ()=> {
    if(character === 'baddies1') {
      return baddies1;
    }
    if(character === 'baddies2') {
      return baddies2;
    }
    return false
  };

  const [_prevLeft, setPrevLeft] = useState(left);
  const [_left, setLeft] = useState(left);

  const [_prevRight, setPrevRight] = useState(right);
  const [_right, setRight] = useState(right);

  useEffect(() => {
    setPrevRight(_right);
    setRight(right);
  }, [right]);

  useEffect(() => {
    setPrevLeft(_left);
    setLeft(left);
  }, [left]);

  const translateSpring = useSpring({
    position: 'absolute',
    ...(right? {right: (right != _prevRight) ? _right : _prevRight} : { left: (left != _prevLeft) ? left : _prevLeft} ),
    config: { tension: 60, friction: 14 }
  });

  const [showDebugState, setShowDebugState] = useState(false)

  useEffect(() => {
    setShowDebugState(true)
    setTimeout( () => {
      setShowDebugState(false)
    }, 1000)
  },[state])
     
  const style = {
    position: 'absolute',
    bottom,
    width: '30vh',
    height: '30vh',
    zIndex,
    ...translateSpring
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
    <animated.div id="enemy-character" style={style}>
      <div style={blockStyle}>
        <div style={characterStyle}/>
      </div>
      {showDebugState && <div id="state-debug">{state}</div>}
      {children}
    </animated.div>
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

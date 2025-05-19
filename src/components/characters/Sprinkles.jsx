import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/sprinkles1.png'
import MovableCharacter from './MovableCharacter';


// STATES: hidden, idle
const sprinklesReducer = (state, action) => {
  switch (action.type) {
    case 'HIDDEN':
      return { ...state, currentState: 'hidden' };
    case 'IDLE':
      return { ...state, currentState: 'idle' };
    default:
      return state;
  }
};

/* Returns what character image to use when the character is first rendered */
const initImgUrlMapper = (state, previousState=undefined) => {
  if (state === 'idle') {
    return characterImage
  }
  else if (state === 'hidden') {
    return null
  }
  else {
    return characterImage
  }
}



/**
 * 
 * @param {*} state : "idle", "hidden" 
 * @returns 
 */
const Sprinkles = ({ bottom = '10vh', left = '5vh', right, faceDirection = 'left', zIndex = 2, state, children }) => {
  const [showDebugState, setShowDebugState] = useState(false)
  const [imgUrl, setImgUrl] = useState(initImgUrlMapper(state))
  const [sprinklesState, dispatchSprinkles] = useReducer(sprinklesReducer, { currentState: state })

  useEffect(() => {
    setShowDebugState(true)
    setTimeout( () => {
      setShowDebugState(false)
    }, 1000)
  },[state])

  useEffect(() => {
    if (state === 'hidden') {
      dispatchSprinkles({ type: 'HIDDEN' })
      setImgUrl(initImgUrlMapper(state));
    }
    else if (state === 'idle') {
      dispatchSprinkles({ type: 'IDLE' })
      setImgUrl(initImgUrlMapper(state));
    }
  }, [state])

  useEffect(() => {
    setImgUrl(initImgUrlMapper(sprinklesState.currentState))
  }, [sprinklesState])

  const blockStyle = {
    position: 'block',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const characterStyle = {
    position: 'block',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transform: faceDirection === 'left' ? 'scaleX(-1)' : faceDirection === 'right' ? 'scaleX(1)' : '',
  };

  return (
    <MovableCharacter id="sprinkles-character" bottom={bottom} left={left} right={right} zIndex={zIndex}>
      <div style={blockStyle}>
        <div style={characterStyle}></div>
        {children}
      </div>
      {showDebugState && <span id="state-debug">{state}</span>}
    </MovableCharacter>
  );
};

Sprinkles.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string,
  faceDirection: PropTypes.string,
  children: PropTypes.node
};

export default Sprinkles;

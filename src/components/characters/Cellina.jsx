import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import characterImage from '../../assets/cellina1.png'
import microscopeImage from '../../assets/cellina-microscope-2.png'
import MovableCharacter from './MovableCharacter';
import '../../styles/warpEffect.css';
import { characterChildrenHelper } from '../../helpers/characterChildrenHelper';

// state: idle, warp, microscope
const cellinaReducer = (state, action) => {
  switch (action.type) {
    // case 'WARP':
    //   return { ...state, currentState: 'warp' };
    case 'MICROSCOPE':
      return { ...state, currentState: 'microscope' };
    case 'IDLE':
      return { ...state, currentState: 'idle' };
    default:
      return state;
  }
};

/* Returns what character image to use when the character is first rendered */
const initImgUrlMapper = (state, previousState=undefined) => {
  if (state === 'warp') {
    return previousState ? initImgUrlMapper(previousState) : characterImage
  }
  else if (state === 'microscope') {
    return microscopeImage
  }
  else if (state === 'idle') {
    return characterImage
  }
  else {
    return characterImage
  }
}

const Cellina = ({ bottom = '20vh', left = '5vh', right, faceDirection = 'right', zIndex = 2, state, children }) => {
  const { speechBubbles, itemChildren, otherChildren } = characterChildrenHelper(children)
  
  const [showDebugState, setShowDebugState] = useState(false);
  const [isWarping, setIsWarping] = useState(true);
  const [imgUrl, setImgUrl] = useState(initImgUrlMapper(state))
  const [cellinaState, dispatchCellina] = useReducer(cellinaReducer, { currentState: state })

  const warpSpring = useSpring({
    from: { opacity: 0, scale: 0, rotate: 0 },
    to: { opacity: 1, scale: 1, rotate: 360 },
    config: { tension: 60, friction: 7 },
    onRest: () => { setIsWarping(false) }
  })

  useEffect(() => {
    if(cellinaState.currentState !== state) {
      // Handle state changes
      let timeoutId = undefined
      setIsWarping(true)
      if (state === 'microscope') {
        timeoutId = setTimeout(() => {setImgUrl(microscopeImage); setIsWarping(false)}, 2000)
      }
      else if (state === 'idle') {
        timeoutId = setTimeout(() => { console.log("goto idle") ; setImgUrl(characterImage); setIsWarping(false)}, 2000)
      }
      else if (state === 'warp') {
        setIsWarping(true)
      }
      dispatchCellina({ type: state.toUpperCase() })
      return ()=> {console.log("cancel timeout") ; clearTimeout(timeoutId)}
    }
  }, [state])

  useEffect(() => {
    setShowDebugState(true)
    setTimeout(() => {
      setShowDebugState(false)
    }, 1000)
  }, [state])

  const blockStyle = {
    position: 'block',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // animation: 'characterBounce 2s ease-in-out infinite'
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
    <MovableCharacter id="cellina-character" bottom={bottom} left={left} right={right} zIndex={zIndex} width="45vh" height="45vh">
      <div className="warp-container">
        <animated.div style={{
          ...blockStyle,
          opacity: warpSpring.opacity,
          transform: warpSpring.scale.to(s => `scale(${s}) rotate(${warpSpring.rotate.get()}deg)`)
        }}>
          <div style={characterStyle}></div>
          {itemChildren}
        </animated.div>
        {isWarping && (
          <div className="warp-effect" />
        )}
      </div>
      {speechBubbles}
      {otherChildren}
      {showDebugState && <span id="state-debug">{state}</span>}
    </MovableCharacter>
  );
};

Cellina.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  faceDirection: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string,
  children: PropTypes.node
};

export default Cellina;

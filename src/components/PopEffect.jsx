import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import hitImage from '../assets/hit-effect-1.png'
import missImage from '../assets/miss-effect-1.png'

// type= 'miss' | 'hit'

const PopEffect = ({ type='miss', bottom = '10vh', left = '5vh', right, zIndex = 2 }) => {

  const [_type, setType] = useState(type)
  
  const imageSrc = () => {
    switch (_type) {
      case 'miss':
        return missImage
      case 'hit':
        return hitImage
      default: return null
    } 
  }

  useEffect(() => {
    if(type != undefined) {
      setType(type)
      setTimeout(() => {
        setType(undefined)
      }, 1000)
    }
  }, [type])

  const style = {
    display: _type ? 'block' : 'none',
    position: 'absolute',
    bottom,
    ...(right ? { right } : {left}),
    width: '15vh',
    height: '15vh',
    backgroundImage: `url(${imageSrc()})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex
  };

  return (
    <div id="splash-effect" style={style} />
  );
};

PopEffect.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  type: PropTypes.string
};

export default PopEffect;

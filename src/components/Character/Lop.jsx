import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/lop.png'


const LopCharacter = ({ bottom = '20vh', left = '5vh', right, zIndex = 2 }) => {
  const style = {
    position: 'absolute',
    bottom,
    ...(right ? { right } : {left}),
    width: '30vh',
    height: '30vh',
    backgroundImage: `url(${characterImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex,
    animation: 'lopBounce 2s ease-in-out infinite'
  };

  return (
    <div id="lop-character" style={style} />
  );
};

LopCharacter.propTypes = {
  bottom: PropTypes.string,
  right: PropTypes.string,
  left: PropTypes.string,
  zIndex: PropTypes.number
};

export default LopCharacter;

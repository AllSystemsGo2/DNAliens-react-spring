import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/lop.png'


const LopCharacter = ({ bottom = '20vh', right = '5vh' }) => {
  const style = {
    position: 'absolute',
    bottom,
    right,
    width: '30vh',
    height: '30vh',
    backgroundImage: `url(${characterImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 2,
    animation: 'lopBounce 2s ease-in-out infinite'
  };

  return (
    <div id="lop-character" style={style} />
  );
};

LopCharacter.propTypes = {
  bottom: PropTypes.string,
  right: PropTypes.string
};

export default LopCharacter;

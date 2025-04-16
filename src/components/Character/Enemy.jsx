import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';

const Enemy = ({ characterImage, bottom = '10vh', left = '5vh' }) => {
  const style = {
    position: 'absolute',
    bottom,
    left,
    width: '30vh',
    height: '30vh',
    ...(characterImage ? {
      backgroundImage: `url(${characterImage})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    } : {
      backgroundColor: '#FF00FF' // Fuchsia fallback
    }),
    zIndex: 2,
    animation: 'lopBounce 2s ease-in-out infinite'
  };

  return (
    <div id="enemy-character" style={style} />
  );
};

Enemy.propTypes = {
  characterImage: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string
};

export default Enemy;

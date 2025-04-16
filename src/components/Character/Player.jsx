import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/player-character-2.png'

const Player = ({ bottom = '10vh', left = '5vh' }) => {
  const style = {
    position: 'absolute',
    bottom,
    left,
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
    <div id="player-character" style={style} />
  );
};

Player.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string
};

export default Player;

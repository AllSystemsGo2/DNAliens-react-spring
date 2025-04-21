import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import characterImage from '../../assets/player-character-2.png'

const Player = ({ bottom = '10vh', left = '5vh', right, zIndex = 2, state }) => {
  useEffect(() => {
    console.error("Player state", state)
  },[state])

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
    animation: 'lopBounce 2s ease-in-out infinite',
    zIndex
  };

  return (
    <div id="player-character" style={style} />
  );
};

Player.propTypes = {
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string
};

export default Player;

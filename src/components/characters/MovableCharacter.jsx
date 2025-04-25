import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';


const MovableCharacter = ({ bottom = '10vh', left = '5vh', right, zIndex = 2, style, children}) => {  

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
     
  const blockStyle = {
    position: 'absolute',
    bottom,
    width: '30vh',
    height: '30vh',
    zIndex,
    ...style,
    ...translateSpring
  };

  return (
    <animated.div id="movable-character" style={blockStyle}>
      {children}
    </animated.div>
  );
};

MovableCharacter.propTypes = {
  characterImage: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  state: PropTypes.string
};

export default MovableCharacter;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import { initializeCharacter, updateCharacterPosition, selectCharacterById } from '../../store/slices/movableCharacterSlice';


const MovableCharacter = ({ id, bottom = '10vh', left = '5vh', right, zIndex = 2, width = '30vh', height = '30vh', style, children }) => {  
  const dispatch = useDispatch();
  const character = useSelector(state => selectCharacterById(state, id));

  useEffect(() => {
    dispatch(initializeCharacter({ id, bottom, left, right, zIndex, width, height }));
  }, [dispatch, id, bottom, left, right, zIndex, width, height]);

  useEffect(() => {
    if (right !== undefined) {
      dispatch(updateCharacterPosition({ id, right }));
    }
  }, [dispatch, id, right]);

  useEffect(() => {
    if (left !== undefined) {
      dispatch(updateCharacterPosition({ id, left }));
    }
  }, [dispatch, id, left]);

  useEffect(() => {
    if (bottom !== undefined) {
      dispatch(updateCharacterPosition({ id, bottom }));
    }
  }, [dispatch, id, bottom]);

  useEffect(() => {
    if (zIndex !== undefined) {
      dispatch(updateCharacterPosition({ id, zIndex }));
    }
  }, [dispatch, id, zIndex]);

  const translateSpring = useSpring({
    position: 'absolute',
    ...(right !== undefined 
      ? { right: character?.currentRight !== character?.prevRight ? character?.currentRight : character?.prevRight }
      : { left: character?.currentLeft !== character?.prevLeft ? character?.currentLeft : character?.prevLeft }
    ),
    ...(zIndex !== undefined 
      ? { zIndex: character?.zIndex !== character?.prevZIndex ? character?.zIndex : character?.prevZIndex }
      : {}),
    ...(bottom !== undefined 
      ? { bottom: character?.currentBottom !== character?.prevBottom ? character?.currentBottom : character?.prevBottom }
      : {}),
    config: { tension: 60, friction: 14 }
  });
     
  const blockStyle = {
    position: 'absolute',
    bottom: character?.bottom || bottom,
    width: character?.width || width,
    height: character?.height || height,
    zIndex: character?.zIndex || zIndex,
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
  id: PropTypes.string.isRequired,
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  zIndex: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};

export default MovableCharacter;

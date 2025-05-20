// ConnectionLine.jsx
import React from 'react';
import { animated, useSpring } from '@react-spring/web';

const ConnectionLine = ({ startX, startY, endX, endY, isCorrect, isIncorrect }) => {
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
  
  const styles = useSpring({
    from: { width: 0, opacity: 0 },
    to: { width: length, opacity: 1 },
    config: { tension: 300, friction: 20 }
  });
  
  return (
    <animated.div
      style={{
        ...styles,
        position: 'absolute',
        height: '2px',
        backgroundColor: isCorrect ? '#52c41a' : isIncorrect ? '#f5222d' : '#1890ff',
        transformOrigin: '0 0',
        transform: `translate(${startX}px, ${startY}px) rotate(${angle}deg)`,
        zIndex: 1
      }}
    />
  );
};

export default ConnectionLine;
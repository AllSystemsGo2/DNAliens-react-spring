import React from 'react';
import { animated, useSpring } from '@react-spring/web'

const DriftingText = ({ text, style, direction = 'random', duration = 3000, distance = 100 }) => {
  // Calculate random direction if not specified
  const getRandomDirection = () => {
    const angle = direction === 'random' ? Math.random() * Math.PI * 2 : 0;
    return {
      dx: direction === 'random' ? Math.cos(angle) * distance : 0,
      dy: direction === 'random' ? Math.sin(angle) * distance : distance
    };
  };

  const spring = useSpring({
    from: {
      opacity: 1,
      transform: 'translate(0px, 0px)'
    },
    to: async (next) => {
      while (true) {
        const { dx, dy } = getRandomDirection();
        await next({
          opacity: 0,
          transform: `translate(${dx}px, ${dy}px)`
        });
        await next({
          opacity: 1,
          transform: 'translate(0px, 0px)'
        });
      }
    },
    config: {
      duration: duration
    }
  });

  return (
    <div style={style}>
      <animated.div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: spring.transform,
          opacity: spring.opacity,
          whiteSpace: 'nowrap',
          marginLeft: '-50%',
          marginTop: '-50%'
        }}
      >
        {text}
    </animated.div>
    </div>
  );
};

export default DriftingText;

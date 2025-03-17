import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

const TexturedAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  const springProps = useSpring({
    transform: isAnimating ? 'scale(1.5) rotate(180deg)' : 'scale(1) rotate(0deg)',
    transformOrigin: 'center',
  })

  return (
    <div>
      <button 
        onClick={() => setIsAnimating(prev => !prev)}
        style={{ marginBottom: '20px' }}
      >
        Toggle Animation
      </button>

      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Define patterns for textures */}
        <defs>
          {/* Dots pattern */}
          <pattern
            id="dotsPattern"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="5" cy="5" r="1" fill="#333" />
          </pattern>

          {/* Lines pattern */}
          <pattern
            id="linesPattern"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="10" stroke="#333" strokeWidth="2" />
          </pattern>

          {/* Noise-like pattern */}
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </defs>

        {/* Animated shapes with textures */}
        <animated.rect
          x="50"
          y="50"
          width="80"
          height="80"
          fill="url(#dotsPattern)"
          style={springProps}
        />

        <animated.circle
          cx="200"
          cy="90"
          r="40"
          fill="url(#linesPattern)"
          style={springProps}
        />

        <animated.rect
          x="100"
          y="150"
          width="100"
          height="100"
          style={{
            ...springProps,
            filter: 'url(#noise)',
            fill: '#4dabf7'
          }}
        />
      </svg>
    </div>
  )
}

export default TexturedAnimation

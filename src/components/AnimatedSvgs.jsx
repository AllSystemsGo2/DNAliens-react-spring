import { useSpring } from '@react-spring/web'
import { useState } from 'react'

const AnimatedSvgs = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  // Create multiple spring animations
  const circle1Spring = useSpring({
    transform: isAnimating ? 'translate(100px, 0px)' : 'translate(0px, 0px)',
    fill: isAnimating ? '#ff6b6b' : '#4dabf7',
  })

  const circle2Spring = useSpring({
    transform: isAnimating ? 'translate(0px, 100px)' : 'translate(0px, 0px)',
    fill: isAnimating ? '#4dabf7' : '#ff6b6b',
  })

  const rectSpring = useSpring({
    transform: isAnimating ? 'rotate(180deg)' : 'rotate(0deg)',
    transformOrigin: 'center',
    fill: isAnimating ? '#51cf66' : '#ffd43b',
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
        <animated.circle 
          cx="50" 
          cy="50" 
          r="20" 
          style={circle1Spring}
        />
        <animated.circle 
          cx="50" 
          cy="150" 
          r="20" 
          style={circle2Spring}
        />
        <animated.rect 
          x="150" 
          y="50" 
          width="40" 
          height="40" 
          style={rectSpring}
        />
      </svg>
    </div>
  )
}

export default AnimatedSvgs

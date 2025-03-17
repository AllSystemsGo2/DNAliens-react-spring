import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

const AnimatedImages = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  const springProps = useSpring({
    transform: isAnimating 
      ? 'scale(1.2) rotate(10deg)' 
      : 'scale(1) rotate(0deg)',
    opacity: isAnimating ? 0.8 : 1,
    config: { tension: 120, friction: 14 }
  })

  return (
    <div>
      <button 
        onClick={() => setIsAnimating(prev => !prev)}
        style={{ marginBottom: '20px' }}
      >
        Toggle Animation
      </button>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <animated.img
          src="https://picsum.photos/200"
          alt="Random image 1"
          style={{
            ...springProps,
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px'
          }}
        />

        <animated.img
          src="https://picsum.photos/201"
          alt="Random image 2"
          style={{
            ...springProps,
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px',
            // Add a slight delay to the second image
            transitionDelay: '100ms'
          }}
        />
      </div>
    </div>
  )
}

export default AnimatedImages

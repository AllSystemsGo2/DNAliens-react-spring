import { useSpring, animated } from '@react-spring/web'
import Lottie from 'lottie-react'
import { useState } from 'react'
import animationData from '../assets/animation.json'

const AnimatedLottie = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  const springProps = useSpring({
    scale: isAnimating ? 1.5 : 1,
    rotate: isAnimating ? 45 : 0,
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

      <animated.div
        style={{
          transform: springProps.scale.to(s => `scale(${s}) rotate(${springProps.rotate.get()}deg)`),
          width: '200px',
          margin: '0 auto'
        }}
      >
        <Lottie 
          animationData={animationData}
          loop={true}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </animated.div>
    </div>
  )
}

export default AnimatedLottie

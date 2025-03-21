import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Frisbee.css'
import starryBackground from '../assets/starry-background.jpg'
import planetForeground from '../assets/planet-foreground.png'
import lop from '../assets/lop.png'
import player from '../assets/player-character.png'
import spaceship from '../assets/spaceship-256.png'
import spaceshipSound from '../assets/spaceship-flight-crash.ogg'
import crash from '../assets/crash.png'

const Frisbee = () => {
  const navigate = useNavigate()
  const [isFlying, setIsFlying] = useState(false)
  const [showUfoTimer, setShowUfoTimer] = useState(false)
  const [showUfo, setShowUfo] = useState(false)
  const [showText, setShowText] = useState(true)
  const [showCrash, setShowCrash] = useState(false)
  const audioRef = useRef(new Audio(spaceshipSound))

  useEffect(() => {
    const audio = audioRef.current
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  useEffect(() => {
    if (showUfo) {
      setShowText(false)
      setTimeout(() => {
        setShowCrash(true)
      }, 3250)
    }
  }, [showUfo])

  useEffect(() => {
    const audio = audioRef.current
    if (isFlying && !showUfoTimer) {
      setShowUfoTimer(true)
      setTimeout(() => {
        console.log('showing ufo')
        setShowUfo(true)
        audio.currentTime = 0
        audio.play()
      }, 3000)
    }
  }, [isFlying, showUfoTimer])

  const ufoSpring = useSpring({
    from: { transform: 'translateX(110vw) translateY(0vh) rotate(280deg) scaleX(-1)' },
    to: showUfo  ? { transform: 'translateX(-20vw) translateY(20vh) rotate(280deg) scaleX(-1)' } : { transform: 'translateX(110vw) translateY(0vh) rotate(280deg) scaleX(-1)' },
    config: { duration: 2500 },
    reset: false
  })

  const frisbeeSpring = useSpring({
    transform: isFlying 
      ? 'translateX(60vh) translateY(-20vh) rotate(720deg)' 
      : 'translateX(0vh) translateY(0vh) rotate(0deg)',
    config: {
      tension: 120,
      friction: 14,
      duration: 2000
    },
    onRest: () => {
      if (isFlying) setIsFlying(false)
    }
  })

  return (
    <div className="frisbee-view" style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      {/* Starry background */}
      <div style={{
        backgroundImage: `url(${starryBackground})`,
        backgroundSize: '125% 100%',
        backgroundPosition: '0% 25%',
        backgroundRepeat: 'repeat-x repeat-y',
        minHeight: '100vh',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        animation: 'panBackground 240s linear infinite'
      }} />

      {/* Planet foreground */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '50vh',
        backgroundImage: `url(${planetForeground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
      }} />

      {/* Lop foreground */}
      <div id="lop-character" style={{
        position: 'absolute',
        bottom: '20vh',
        right: '5vh',
        width: '30vh',
        height: '30vh',
        backgroundImage: `url(${lop})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 2,
        animation: 'lopBounce 2s ease-in-out infinite'
      }} />

      {/* Player foreground */}
      <div id="player-character" style={{
        position: 'absolute',
        bottom: '10vh',
        left: '5vh',
        width: '30vh',
        height: '30vh',
        backgroundImage: `url(${player})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 2,
        animation: 'lopBounce 2s ease-in-out infinite'
      }} />

      <animated.div
        id="frisbee"
        style={{
          ...frisbeeSpring,
          position: 'absolute',
          left: '30vh',
          bottom: '20vh',
          width: '10vh',
          height: '10vh',
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.9), rgba(255, 71, 87, 0.9))',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.5)',
          cursor: 'pointer',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          zIndex: 5,
        }}
        onClick={() => setIsFlying(prev => !prev)}
      >
        {/* Inner ring of the frisbee */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 70% 70%, rgba(255, 215, 0, 0.7), rgba(255, 71, 87, 0.7))',
          boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.3)'
        }} />
      </animated.div>

      {/* UFO */}
      <animated.div
      id="spaceship"
        style={{
          ...ufoSpring,
          position: 'absolute',
          top: '0vh',
          width: '15vh',
          height: '15vh',
          backgroundImage: `url(${spaceship})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 4
        }}
      />

      {/* Crash Site */}
      <div 
        className="crash-image"
        style={{
          display: showCrash ? 'block' : 'none',
          position: 'absolute',
          left: '0vh',
          bottom: '40vh',
          width: '45vh',
          height: '45vh',
          backgroundImage: `url(${crash})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 5,
          cursor: 'pointer'
        }}
        onClick={() => navigate('/crash-site')}
      />

      {/* Content container */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        height: '100vh',
        width: '100%',
      }}>
        <h1 style={{ 
          color: '#fff', 
          textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)',
          fontSize: '2.5em',
          fontWeight: '600',
          letterSpacing: '2px',
          marginBottom: '30px'
        }}>Space Frisbee</h1>
      
        <div style={{ 
          position: 'relative', 
          height: '85vh',
          overflow: 'hidden',
          borderRadius: '20px',
          margin: '20px',        
        }}>
          <div style={{
            display: showText ? 'block' : 'none',
            position: 'absolute',
            bottom: '10vh',
            left: '40vh',
            color: '#fff',
            fontSize: '18px',
            textShadow: '0 0 10px rgba(66, 220, 255, 0.7)',
            background: 'rgba(13, 12, 34, 0.6)',
            padding: '15px 20px',
            borderRadius: '15px',
            border: '1px solid rgba(66, 220, 255, 0.2)',
            boxShadow: '0 0 20px rgba(66, 220, 255, 0.1)'
          }}>
            Click the frisbee to throw it!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Frisbee

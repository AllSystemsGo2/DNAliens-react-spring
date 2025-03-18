import React, { useState, useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import './CrashSite.css'
import starryBackground from '../assets/starry-background.jpg'
import planetForeground from '../assets/planet-foreground.png'
import spaceship from '../assets/spaceship-crashed-2048.png'
import lop from '../assets/lop.png'
import player from '../assets/player-character-2.png'
import spaceshipRustling from '../assets/spaceship-rustling.ogg'
import SpeechBubble from '../components/SpeechBubble'
import MultipleChoicePrompt from '../components/MultipleChoicePrompt'
import Paragraph from '../components/Paragraph'

const CrashSite = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [isLoading, setIsLoading] = useState(true)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  const audioRef = useRef(new Audio(spaceshipRustling))

  const lopSpring = useSpring({
    from: { right: '-30vh' },
    to: { right: '5vh' },
    delay: 500,
    config: {
      mass: 2,
      tension: 280,
      friction: 24
    }
  })

  const playerSpring = useSpring({
    from: { right: '-40vh' },
    to: { right: '15vh' },
    delay: 800,
    config: {
      mass: 2,
      tension: 280,
      friction: 24
    }
  })

  useEffect(() => {
    const speechTimer = setTimeout(() => {
      setShowSpeechBubble(true)
    }, 3000)

    const promptTimer = setTimeout(() => {
      setShowPrompt(true)
    }, 6000)

    return () => {
      clearTimeout(speechTimer)
      clearTimeout(promptTimer)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    audio.loop = true
    audio.volume = volume

    const handleCanPlay = () => setIsLoading(false)
    audio.addEventListener('canplay', handleCanPlay)

    const playAudio = async () => {
      try {
        if (isPlaying) {
          await audio.play()
        } else {
          audio.pause()
        }
      } catch (error) {
        console.log('Audio playback error:', error)
        setIsPlaying(false)
      }
    }

    playAudio()

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.pause()
      audio.currentTime = 0
    }
  }, [isPlaying, volume])

  return (
    <div className="crash-site-view" style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #1a1a2e, #16213e)'
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
        transform: "scaleX(-1)",
        backgroundImage: `url(${planetForeground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
      }} />

      {/* Smoke Effect */}
      <div className="smoke-container">
        <div className="smoke-particle" />
        <div className="smoke-particle" />
        <div className="smoke-particle" />
        <div className="smoke-particle" />
        <div className="smoke-particle" />
      </div>

      {/* Spaceship */}
      <div id="spaceship" style={{
        position: 'absolute',
        bottom: '10vh',
        left: '12vh',
        transform: 'rotateZ(185deg)',
        width: '60vh',
        height: '60vh',
        backgroundImage: `url(${spaceship})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 2
      }} />

      {/* Lop speech bubble */}
      {showSpeechBubble && (
        <SpeechBubble
          mainText="Something's in there..."
        subText=""
          style={{
            bottom: '48vh',
            right: '4vh',
            zIndex: 3,
            minWidth: '200px',
            boxShadow: '0 0 20px rgba(66, 220, 255, 0.1)'
          }}
        />
      )}

      {/* Lop foreground */}
      <animated.div id="lop-character" style={{
        position: 'absolute',
        bottom: '15vh',
        width: '30vh',
        height: '30vh',
        backgroundImage: `url(${lop})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 2,
        animation: 'lopBounce 2s ease-in-out infinite',
        ...lopSpring
      }} />

      {/* Player foreground */}
      <animated.div id="player-character" style={{
        position: 'absolute',
        bottom: '5vh',
        width: '30vh',
        height: '30vh',
        backgroundImage: `url(${player})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 2,
        animation: 'lopBounceFlip 2s ease-in-out infinite',
        ...playerSpring
      }} />

      {/* Multiple choice prompt */}
      {showPrompt && (
        <MultipleChoicePrompt
          question="What should we do?"
          choices={[
            "It could be dangerous, we should be careful.",
            "Let’s reach in and find out!",
            "Eh, let’s just leave."
          ]}
          onSubmit={(choice) => {
            console.log('Selected choice:', choice)
            setShowPrompt(false)
            setShowEnd(true)
          }}
          style={{
            top: '5vh',
            left: '50vh',
            transform: 'translateX(-50%)',
            zIndex: 3
          }}
        />
      )}
      {/* End */}
      {showEnd && (
        <Paragraph
          header="The END"
          body="That's the end for now."
          style={{
            top: '20vh',
            right: '40vh',
            zIndex: 3,
            minWidth: '200px',
            boxShadow: '0 0 20px rgba(66, 220, 255, 0.1)'
          }}
        />
      )}

      {/* Audio Control Button */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 10
      }}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{
            width: '100px',
            accentColor: '#42dcff'
          }}
        />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            background: 'rgba(13, 12, 34, 0.8)',
            border: '1px solid rgba(66, 220, 255, 0.4)',
            borderRadius: '8px',
            color: '#fff',
            cursor: isLoading ? 'default' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: isLoading ? 0.5 : 1
          }}
        >
          {isLoading ? 'Loading...' : isPlaying ? 'Sound:Off' : 'Sound:On'}
        </button>
      </div>
    </div>
  )
}

export default CrashSite

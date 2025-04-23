import React, { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useTranslation } from 'react-i18next'
import './CrashSite.css'
import starryBackground from '../assets/starry-background.jpg'
import planetForeground from '../assets/planet-foreground.png'
import spaceship from '../assets/spaceship-crashed-2048.png'

import player from '../assets/player-character-2.png'
import spaceshipRustling from '../assets/spaceship-rustling.ogg'
import Lop from '../components/characters/Lop'
import SpeechBubble from '../components/SpeechBubble'
import MultipleChoicePrompt from '../components/MultipleChoicePrompt'
import Paragraph from '../components/Paragraph'
import { useSelector, useDispatch } from 'react-redux'

import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../store/slices/pageSlice'

const defaultAttributes = {
  isPlaying: false,
  volume: 0.5,
  isLoading: true,
  showPrompt: false,
  shownPrompt: false,
  showSpeechBubble: false,
  showEnd: false,
}

const setIsPlaying = (value) => setPageAttribute({pageId: "crashSite", key: "isPlaying", value})
const setVolume = (value) => setPageAttribute({pageId: "crashSite", key: "volume", value})
const setIsLoading = (value) => setPageAttribute({pageId: "crashSite", key: "isLoading", value})
const setShowPrompt = (value) => setPageAttribute({pageId: "crashSite", key: "showPrompt", value})
const setShownPrompt = (value) => setPageAttribute({pageId: "crashSite", key: "shownPrompt", value})
const setShowSpeechBubble = (value) => setPageAttribute({pageId: "crashSite", key: "showSpeechBubble", value})
const setShowEnd = (value) => setPageAttribute({pageId: "crashSite", key: "showEnd", value})

const CrashSite = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: "crashSite", props: defaultAttributes}))
  }, [dispatch])

  const {
    isPlaying,
    volume,
    isLoading,
    showPrompt,
    shownPrompt,  
    showSpeechBubble,
    showEnd,
  } = useSelector((state) => selectPageAttributes(state, "crashSite", defaultAttributes))

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
    dispatch(setIsPlaying(true))

    const speechTimer = setTimeout(() => {
      dispatch(setShowSpeechBubble(true))
    }, 3000)

    const promptTimer = !shownPrompt ? setTimeout(() => {
      dispatch(setShowPrompt(true))
      dispatch(setShownPrompt(true))
    }, 6000) : null

    return () => {
      clearTimeout(speechTimer)
      clearTimeout(promptTimer)
    }
  }, [dispatch, shownPrompt])

  useEffect(() => {
    if(!isLoading) dispatch(setIsPlaying(true))
  }, [isLoading, dispatch])

  useEffect(() => {
    const audio = audioRef.current
    audio.loop = true
    audio.volume = volume

    const handleCanPlay = () => dispatch(setIsLoading(false))
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
        dispatch(setIsPlaying(false))
      }
    }

    playAudio()

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.pause()
      audio.currentTime = 0
    }
  }, [isPlaying, volume, dispatch])

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


      {/* Lop foreground */}
      <Lop bottom="15vh" right="25vh" zIndex={2} state="idle" >
        {/* Lop speech bubble */}
        {showSpeechBubble && (
          <SpeechBubble
            maxWidth='400px'
            left="-25%"
            top="-30%"
            mainText={t('crashSite.speechBubble.mainText')}
            subText={t('crashSite.speechBubble.subText')}
            style={{
              zIndex: 3,
              minWidth: '200px',
              boxShadow: '0 0 20px rgba(66, 220, 255, 0.1)'
            }}
          />
        )}
      </Lop>

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
          question={t('crashSite.prompt.question')}
          responseKey="crashSite"
          choices={t('crashSite.prompt.choices', { returnObjects: true })}
          onSubmit={(choice) => {
            console.log('Selected choice:', choice)
            dispatch(setShowPrompt(false))
            dispatch(setShowEnd(true))
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
          header={t('crashSite.end.header')}
          body={t('crashSite.end.body')}
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
          onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
          style={{
            width: '100px',
            accentColor: '#42dcff'
          }}
        />
        <button
          onClick={() => dispatch(setIsPlaying(!isPlaying))}
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
          {isLoading ? t('crashSite.audio.loading') : isPlaying ? t('crashSite.audio.soundOff') : t('crashSite.audio.soundOn')}
        </button>
      </div>
    </div>
  )
}

export default CrashSite

import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './Level1_002CrashSite.css'
import starryBackground from '../../assets/starry-background.jpg'
import planetForeground from '../../assets/planet-foreground.png'
import spaceship from '../../assets/spaceship-crashed-2048.png'
import spoon1 from '../../assets/spoon-cookie-dough.png'
import spoon2 from '../../assets/spoon.png'

import player from '../../assets/player-character-2.png'
import spaceshipRustling from '../../assets/spaceship-rustling.ogg'
import Lop from '../../components/characters/Lop'
import SpeechBubble from '../../components/SpeechBubble'
import MultipleChoicePrompt from '../../components/MultipleChoicePrompt'
import Paragraph from '../../components/Paragraph'
import DriftingText from '../../components/DriftingText'

import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice'

const defaultAttributes = {
  isPlaying: false,
  volume: 0.5,
  isLoading: true,
  showRustle: true,
  showMunching: false,
  showPrompt: false,
  shownPrompt: false,
  showLopResponse: false,
  showLopQuestion: false,
  lopResponseNumber: 0,
  showSpoon: false,
  showSpeechBubble: false,
  lopPositionRight: "-25vh",
  spoonImage: spoon1
}

const setIsPlaying = (value) => setPageAttribute({pageId: "crashSite", key: "isPlaying", value})
const setVolume = (value) => setPageAttribute({pageId: "crashSite", key: "volume", value})
const setIsLoading = (value) => setPageAttribute({pageId: "crashSite", key: "isLoading", value})
const setShowRustle = (value) => setPageAttribute({pageId: "crashSite", key: "showRustle", value})
const setShowMunching = (value) => setPageAttribute({pageId: "crashSite", key: "showMunching", value})
const setShowPrompt = (value) => setPageAttribute({pageId: "crashSite", key: "showPrompt", value})
const setShownPrompt = (value) => setPageAttribute({pageId: "crashSite", key: "shownPrompt", value})
const setShowLopResponse = (value) => setPageAttribute({pageId: "crashSite", key: "showLopResponse", value})
const setShowLopResponseNumber = (value) => setPageAttribute({pageId: "crashSite", key: "lopResponseNumber", value})
const setShowSpoon = (value) => setPageAttribute({pageId: "crashSite", key: "showSpoon", value})
const setShowSpeechBubble = (value) => setPageAttribute({pageId: "crashSite", key: "showSpeechBubble", value})
const setLopPositionRight = (value) => setPageAttribute({pageId: "crashSite", key: "lopPositionRight", value})
const setSpoonImage = (value) => setPageAttribute({pageId: "crashSite", key: "spoonImage", value})
const setShowLopQuestion = (value) => setPageAttribute({pageId: "crashSite", key: "showLopQuestion", value})

const CrashSite = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: "crashSite", props: defaultAttributes}))
  }, [dispatch])

  const {
    isPlaying,
    volume,
    isLoading,
    showRustle,
    showPrompt,
    shownPrompt,  
    showLopResponse,
    lopResponseNumber,
    showSpeechBubble,
    showSpoon,
    lopPositionRight,
    spoonImage,
    showMunching,
    showLopQuestion
  } = useSelector((state) => selectPageAttributes(state, "crashSite", defaultAttributes))

  const audioRef = useRef(new Audio(spaceshipRustling))

  const spaceshipSpring = useSpring({
    from: { 
      transform: 'rotateZ(185deg) translate(0px, 0px)'
    },
    to: async (next) => {
      if (showMunching) {
        while (true) {
          await next({ transform: 'rotateZ(185deg) translate(-2px, -2px)' })
          await next({ transform: 'rotateZ(185deg) translate(2px, 2px)' })
          await next({ transform: 'rotateZ(185deg) translate(2px, -2px)' })
          await next({ transform: 'rotateZ(185deg) translate(-2px, 2px)' })
        }
      } else {
        await next({ transform: 'rotateZ(185deg) translate(0px, 0px)' })
      }
    },
    config: {
      duration: 50
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
    if(lopPositionRight === "-25vh") dispatch(setLopPositionRight("25vh"))
  }, [dispatch])

  useEffect(() => {
    dispatch(setIsPlaying(true))

    const speechTimer = !shownPrompt ? setTimeout(() => {
      dispatch(setShowSpeechBubble(true))
    }, 3000) : null

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
    const timer = showLopResponse ? setTimeout(() => { dispatch(setShowSpoon(true)) }, 2000) : null
    return () => clearTimeout(timer)
  }, [dispatch, showLopResponse])

  const makeChoice = (choice, index) => {
    dispatch(setShowSpeechBubble(false))
    dispatch(setShowPrompt(false))
    dispatch(setShowLopResponse(true))
    dispatch(setShowLopResponseNumber(index + 1))            
  }

  const testWithSpoon = () => {
    console.log("testWithSpoon")
    dispatch(setShowLopResponse(false))
    //move lop to ship
    dispatch(setLopPositionRight("50vw"))
    setTimeout(() => { 
      dispatch(setShowSpoon(false)) 
      dispatch(setShowRustle(false))
      dispatch(setShowMunching(true))
    }, 1000)
    setTimeout(() => { 
      dispatch(setShowSpoon(true)) 
      dispatch(setSpoonImage(spoon2))
      dispatch(setShowMunching(false))
    }, 3000)
    setTimeout(() => { 
      dispatch(setShowLopQuestion(true))
    }, 4000)
  }

  const gotoNextPage = () => {
    navigate('/level1-quizchoice');
  }

  useEffect(() => {
    const audio = audioRef.current
    audio.loop = true
    audio.volume = volume

    const handleCanPlay = () => dispatch(setIsLoading(false))
    audio.addEventListener('canplay', handleCanPlay)

    const playAudio = async () => {
      try {
        if (isPlaying && showRustle) {
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
  }, [isPlaying, showRustle, volume, dispatch])

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
      <animated.div id="spaceship" style={{
        position: 'absolute',
        bottom: '10vh',
        left: '15vw',
        width: '60vh',
        height: '60vh',
        backgroundImage: `url(${spaceship})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 2,
        transform: spaceshipSpring.transform
      }} />

      {/* Magnified Spoon View */}
      {showSpoon && spoonImage === spoon2 && (
        <>
          <div
            style={{
              position: 'absolute',
              bottom: '55vh',
              left: '10vw',
              width: '20vh',
              height: '20vh',
              borderRadius: '10vh',
              backgroundImage: `url(${spoon2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid white',
              zIndex: 5
            }}
          />
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 4,
              pointerEvents: 'none'
            }}
          >
          </svg>
        </>
      )}

      {/* Rustle */}
      {showRustle && Array.from({ length: 3 }).map((_, i) => (
        <DriftingText key={i} style={{
          position: 'absolute',
          bottom: '35vh',
          left: `${22 + i }vw`,
          zIndex: 4,
          color: 'white'
        }} distance={20} duration={2000} text="RUSTLE..." />
      ))}
      {/* Rustle */}
      {showMunching && Array.from({ length: 2 }).map((_, i) => (
        <DriftingText key={i} style={{
          position: 'absolute',
          bottom: '35vh',
          left: `${22 + i }vw`,
          zIndex: 4,
          color: 'white'
        }} distance={10} duration={2000} text="MUNCH!!" />
      ))}

      {/* Lop foreground */}
      <Lop bottom="15vh" right={lopPositionRight} zIndex={2} state="idle" >
          {/* Lop speech bubble */}
          {showSpeechBubble && (
            <SpeechBubble
              maxWidth='400px'
              left="-25%"
              bottom="100%"
              mainText={t('crashSite.speechBubble.mainText')}
              subText={t('crashSite.speechBubble.subText')}
              style={{
                zIndex: 3,
                minWidth: '200px',
                boxShadow: '0 0 20px rgba(66, 220, 255, 0.1)'
              }}
            />
          )}
          {/* Lop response */}
          {showLopResponse && (
            <SpeechBubble
              maxWidth='400px'
              left="-25%"
              bottom="100%"
              subText={t(`crashSite.lopResponse${lopResponseNumber}.subText`)}
              showNext={true}
              onClick={testWithSpoon}
              style={{
                zIndex: 4,
                minWidth: '200px',
                boxShadow: '0 0 20px rgba(66, 220, 255, 0.1)'
              }}
            />
          )}
          {/* Lop response */}
          {showLopQuestion && (
            <SpeechBubble
              maxWidth='400px'
              right="-50%"
              bottom="100%"
              subText={t(`crashSite.lopQuestion.subText`)}
              showNext={true}
              onClick={gotoNextPage}
              style={{
                zIndex: 4,
                minWidth: '200px',
                boxShadow: '0 0 20px rgba(66, 220, 255, 0.1)'
              }}
            />
          )}
          {/* Spoon */}
          {showSpoon && (
            <img id="spoon"
              src={spoonImage}
              alt="Spoon"
              style={{
                position: 'absolute',
                top: '0vh',
                left: '0vh',
                width: '10vh',
                height: '10vh',
                zIndex: 4
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
          onSubmit={makeChoice}
          style={{
            top: '5vh',
            left: '50vh',
            transform: 'translateX(-50%)',
            zIndex: 3
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

import { useSpring, animated } from '@react-spring/web'
import { useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice'
import { setBubbleShow as setShowSpeechBubbleHelper } from '../../helpers/bubbleHelper'

import './Level1_001Frisbee.css'
import starryBackground from '../../assets/starry-background.jpg'
import planetForeground from '../../assets/planet-foreground.png'
import spaceship from '../../assets/spaceship-256.png'
import spaceshipSound from '../../assets/spaceship-flight-crash.ogg'
import crash from '../../assets/crash.png'

import Lop from '../../components/characters/Lop'
import Player from '../../components/characters/Player'
import Scene from '../../components/Scene'
import SpeechBubble from '../../components/bubbles/SpeechBubble'
import MultipleChoicePrompt from '../../components/MultipleChoicePrompt'

const defaultAttributes = {
  isFlying: false,
  showUfoTimer: false,
  showUfo: false,
  showText: true,
  showCrash: false,
  showChoice: false,
} 

const setShowUfo = (value) => setPageAttribute({pageId: "frisbee", key: "showUfo", value})
const setIsFlying =  (value) => setPageAttribute({pageId: "frisbee", key: "isFlying", value})
const setShowUfoTimer =  (value) => setPageAttribute({pageId: "frisbee", key: "showUfoTimer", value})
const setShowText =  (value) => setPageAttribute({pageId: "frisbee", key: "showText", value})
const setShowCrash =  (value) => setPageAttribute({pageId: "frisbee", key: "showCrash", value})
const setShowChoice =  (value) => setPageAttribute({pageId: "frisbee", key: "showChoice", value})

const Frisbee = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: "frisbee", 
      props: defaultAttributes
    }))
  }, [dispatch])

  const {
    isFlying,
    showUfoTimer,
    showCrash,
    showText,
    showUfo,
    showChoice
  } = useSelector((state) => selectPageAttributes(state, "frisbee", defaultAttributes))
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
      dispatch(setShowText(false))
      setTimeout(() => {
        dispatch(setShowUfo(false))
        dispatch(setShowCrash(true))
        dispatch(setShowSpeechBubbleHelper({pageId: "frisbee", bubbleId: "lopQuestion", show: true}))
      }, 3250)
    }
  }, [showUfo, dispatch])

  useEffect(() => {
    const audio = audioRef.current
    if (isFlying && !showUfoTimer) {
      dispatch(setShowUfoTimer(true))
      setTimeout(() => {
        dispatch(setShowUfo(true))
        audio.currentTime = 0
        audio.play()
      }, 3000)
    }
  }, [isFlying, showUfoTimer, dispatch])

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
      if (isFlying) dispatch(setIsFlying(false))
    }
  })

  return (
    <div className="view frisbee-view" >
      <Scene skyImage={starryBackground} terrainImage={planetForeground} />

      {/* Multiple choice prompt */}
      {showChoice && (
        <MultipleChoicePrompt
          prompt={t('frisbee.prompt.question')}
          responseKey="frisbee.choice"
          choices={t('frisbee.prompt.choices', { returnObjects: true })}
          onSubmit={() => {
            dispatch(setShowChoice(false))
            dispatch(setShowSpeechBubbleHelper({pageId: "frisbee", bubbleId: "investigate", show: true}))
          }}
          style={{
            top: '5vh',
            left: '50vh',
            transform: 'translateX(-50%)',
            zIndex: 3
          }}
        />
      )}

      <Lop right="35vh">
        <SpeechBubble pageId="frisbee" id="lopQuestion" showNext={true} onClick={() => { dispatch(setShowSpeechBubbleHelper({pageId: "frisbee", bubbleId: "lopQuestion", show: false})); dispatch(setShowChoice(true)) }} subText={t('frisbee.lopQuestion')} />
        <SpeechBubble pageId="frisbee" id="investigate" showNext={false} mainText={t('frisbee.investigate')} />
      </Lop>
      <Player />

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
        onClick={() => dispatch(setIsFlying(!isFlying))}
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
          display: showUfo ? 'block' : 'none',
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
        onClick={() => navigate('/Level1/Level1_002CrashSite')}
      />

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
        {t('frisbee.instruction')}
      </div>
    </div>
  )
}

export default Frisbee

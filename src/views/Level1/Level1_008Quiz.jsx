import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../../store/slices/pageSlice'
import { setBubbleShow } from '../../helpers/bubbleHelper'

import starryBackground from '../../assets/starry-background.jpg'
import planetForeground from '../../assets/planet-foreground.png'

// Import character components
import Lop from '../../components/characters/Lop'
import Player from '../../components/characters/Player'
import Cellina from '../../components/characters/Cellina'

// Import UI components
import Scene from '../../components/Scene'
import SpeechBubble from '../../components/bubbles/SpeechBubble'
import MultipleChoicePrompt from '../../components/MultipleChoicePrompt'

const defaultAttributes = {
  // Empty default state as requested
  dialogCounter: 0,
  playerResponse: ""
}

const Quiz = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: location.pathname, 
      props: defaultAttributes
    }))
  }, [dispatch, location.pathname])

  const {
    dialogCounter,
    playerResponse
  } = useSelector((state) => 
    selectPageAttributes(state, location.pathname, defaultAttributes)
  )
  const dispatch_setDialogCounter = (counter) => { dispatch(setPageAttribute({key: "dialogCounter", value: counter}))}
  const dispatch_setPlayerResponse = (response) => { dispatch(setPageAttribute({key: "playerResponse", value: response}))}

  useEffect(() => {
    if (dialogCounter === 0) {
      console.log("show speech1");
      setTimeout(() => dispatch(setBubbleShow({bubbleId: "speech1", show: true})), 1000)
    }
    else {
      dispatch(setBubbleShow({bubbleId: "speech1", show: false}))
    }
    // dialogCounter === 1 -> show MC Prompt
    // if (dialogCounter === 1) {
    // }
    // else {
    // }
  
    // dialogCounter === 2 -> show Player & Cellina Response
    if (dialogCounter === 2) {
      // setTimeout(() => dispatch(setBubbleShow({pageId: location.pathname, bubbleId: "speech3", show: true})), 1000)
    }
    else {
      dispatch(setBubbleShow({bubbleId: "player-response", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina-right", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina-wrong", show: false}))
    }


  }, [dialogCounter, dispatch])

  return (
    <div className="view">
      <Scene 
        skyImage={starryBackground} 
        terrainImage={planetForeground}
        transformTerrain="scaleX(1)"
      />
      
      <Player
        left="70vh"
        bottom="5vh"
        zIndex={2}
        state="idle"
        faceDirection="left"
        >
        <SpeechBubble
          showNext={false}
          pageId={location.pathname} id="player-response" top="-15vh" subText={t("level1-008quiz.prompt1.responses", { returnObjects: true })[playerResponse]}
        />
      </Player>
      
      <Lop
        left="5vw"
        bottom="12vh"
        zIndex={2}
        state="idle"
        faceDirection="right"
      >
        <SpeechBubble
          pageId={location.pathname} id="speech1" top="-15vh" mainText={t("level1-008quiz.speech1-lop")} showNext={true}
          onClick={() => {dispatch_setDialogCounter(1)}}
        />
      </Lop>
      
      <Cellina
        right="10vw"
        bottom="20vh"
        zIndex={2}
        state="idle"
        faceDirection="left"
      >
        <SpeechBubble
          pageId={location.pathname} id="cellina-right" top="-10vh" left="10vw" subText={"That's right!"} showNext={true}
          onClick={() => {dispatch_setDialogCounter(3)}}
        />
        <SpeechBubble
          pageId={location.pathname} id="cellina-wrong" top="-10vh" left="10vw" subText={"Try again!"} showNext={true}
          onClick={() => {dispatch_setDialogCounter(1)}}
        />
      </Cellina>

      {dialogCounter === 1 && <MultipleChoicePrompt
        style={{
          bottom: "50vh",
          left: "15vh"
        }}
        prompt={t("level1-008quiz.prompt1.prompt")}
        responseKey="level1-008quiz1"
        choices={t("level1-008quiz.prompt1.choices", { returnObjects: true })}
        onSubmit={(answer, index) => {
          console.log("onSubmit", answer, index)
          dispatch_setDialogCounter(2)
          dispatch_setPlayerResponse(index)
          dispatch(setBubbleShow({bubbleId: "player-response", show: true}))
          if (answer === "Lysosome") {
            setTimeout(() => dispatch(setBubbleShow({bubbleId: "cellina-right", show: true})), 1500)
          }
          else {
            setTimeout(() => dispatch(setBubbleShow({bubbleId: "cellina-wrong", show: true})), 1500)
          }
        }}
      />}
    </div>
  )
}

export default Quiz

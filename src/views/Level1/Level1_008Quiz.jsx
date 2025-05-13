import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: "quiz", 
      props: defaultAttributes
    }))
  }, [dispatch])

  const {
    dialogCounter,
    playerResponse
  } = useSelector((state) => 
    selectPageAttributes(state, "level1-008quiz", defaultAttributes)
  )
  const setDialogCounter = (counter) => { dispatch(setPageAttribute({pageId: "level1-008quiz", key: "dialogCounter", value: counter}))}
  const setPlayerResponse = (response) => { dispatch(setPageAttribute({pageId: "level1-008quiz", key: "playerResponse", value: response}))}

  useEffect(() => {
    if (dialogCounter === 0) {
      setTimeout(() => dispatch(setBubbleShow("level1-008quiz", "speech1", true)), 1000)
    }
    else {
      dispatch(setBubbleShow("level1-008quiz", "speech1", false))
    }

    if (dialogCounter === 1) {
      // setTimeout(() => dispatch(setBubbleShow("level1-008quiz", "speech2", true)), 1000)
    }
    else {
      // dispatch(setBubbleShow("level1-008quiz", "speech2", false))
    }

    if (dialogCounter === 2) {
      // setTimeout(() => dispatch(setBubbleShow("level1-008quiz", "speech3", true)), 1000)
    }
    else {
      // dispatch(setBubbleShow("level1-008quiz", "speech3", false))
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
        left="45vw"
        bottom="5vh"
        zIndex={2}
        state="idle"
        faceDirection="left"
        >
        <SpeechBubble
          showNext={false}
          pageId="level1-008quiz" id="player-response" top="10vh" subText={t("level1-008quiz.prompt1.responses", { returnObjects: true })[playerResponse]}
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
          pageId="level1-008quiz" id="speech1" top="-15vh" subText={t("level1-008quiz.speech1-lop")} showNext={true}
          onClick={() => {setDialogCounter(1)}}
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
          pageId="level1-008quiz" id="cellina-right" top="10vh" subText={"That's right!"} showNext={true}
          onClick={() => {setDialogCounter(2)}}
        />
        <SpeechBubble
          pageId="level1-008quiz" id="cellina-wrong" top="10vh" subText={"Try again!"} showNext={true}
        />
      </Cellina>

      {dialogCounter === 1 && <MultipleChoicePrompt
        prompt={t("level1-008quiz.prompt1.prompt")}
        responseKey="level1-008quiz1"
        choices={t("level1-008quiz.prompt1.choices", { returnObjects: true })}
        onSubmit={(answer, index) => {
          setPlayerResponse(index)
          setBubbleShow({pageId: "level1-008quiz", id: "player-response", show: true})
          if (answer === "Lysosome") {
            setBubbleShow({pageId: "level1-008quiz", id: "cellina-right", show: true})
          }
          else {
            setBubbleShow({pageId: "level1-008quiz", id: "cellina-wrong", show: true})
          }
        }}
      />}
    </div>
  )
}

export default Quiz

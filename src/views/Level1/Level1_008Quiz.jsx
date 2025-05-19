import { useSpring, animated } from '@react-spring/web'
import {useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { navigateTo } from '../../store/slices/appSlice'

import { getPageId } from '../../helpers/locationHelper'
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
import MultipleSelectPrompt from '../../components/MultipleSelectPrompt'

String.prototype.interpolate = function (params) {
  // Extract keys and values from the params object
  const names = Object.keys(params);
  const vals = Object.values(params);

  // Dynamically create a function using new Function
  return new Function(...names, `return \`${this}\`;`)(...vals);
};


const defaultAttributes = {
  // Empty default state as requested
  dialogCounter: 0,
  playerResponse: "",
  playerResponse2: "",
  cellinaState: "idle"
}

const Quiz = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: getPageId(location.pathname), 
      props: defaultAttributes
    }))
  }, [dispatch, location.pathname])

  const [disableOnSubmit, setDisableOnSubmit] = useState(true)
  const toggleDisableOnSubmit = () => {
    setDisableOnSubmit(!disableOnSubmit)
    setDisableOnSubmit(!disableOnSubmit)
  }

  const {
    dialogCounter,
    playerResponse,
    playerResponse2,
    cellinaState
  } = useSelector((state) => 
    selectPageAttributes(state, state.app.pageId, defaultAttributes)
  )
  const dispatch_setDialogCounter = (counter) => { dispatch(setPageAttribute({key: "dialogCounter", value: counter}))}
  const dispatch_setPlayerResponse = (response) => { dispatch(setPageAttribute({key: "playerResponse", value: response}))}
  const dispatch_setPlayerResponse2 = (response) => { dispatch(setPageAttribute({key: "playerResponse2", value: response}))}
  const dispatch_setCellinaState = (state) => { dispatch(setPageAttribute({key: "cellinaState", value: state}))}

  useEffect(() => {
    if (dialogCounter === 0) {
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
    
    if(dialogCounter !== 2 && dialogCounter !== 4) {
      dispatch(setBubbleShow({bubbleId: "player-response1", show: false}))
      dispatch(setBubbleShow({bubbleId: "player-response2", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina-right", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina-wrong", show: false}))
    }

    // dialogCounter === 3 -> show MC Prompt
    if (dialogCounter === 3) {
      setTimeout(() => dispatch(setBubbleShow({bubbleId: "speech2", show: true})), 1000)
    }
    else {
      dispatch(setBubbleShow({bubbleId: "speech2", show: false}))
    }

    // dialogCounter === 4 -> show MC Prompt
    // else 
      // dispatch(setBubbleShow({bubbleId: "player-response2", show: false}))
      // dispatch(setBubbleShow({bubbleId: "cellina-right", show: false}))
      // dispatch(setBubbleShow({bubbleId: "cellina-wrong", show: false}))

    if (dialogCounter === 5) {
      setTimeout(() => dispatch(setBubbleShow({bubbleId: "speech3", show: true})), 1000)
      
      setTimeout(() => dispatch_setCellinaState("microscope"), 2000)
      setTimeout(() => dispatch(setBubbleShow({bubbleId: "cellina-next", show: true})), 3000)
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
        <SpeechBubble showNext={false} id="player-response1" top="-15vh" subText={t("level1-008quiz.prompt1.responses", { returnObjects: true })[playerResponse]}/>
        <SpeechBubble showNext={false} id="player-response2" top="-15vh" subText={playerResponse2}/>
      </Player>
      
      <Lop
        left="5vw"
        bottom="12vh"
        zIndex={2}
        state="idle"
        faceDirection="right"
      >
        <SpeechBubble id="speech1" top="-15vh" subText={t("level1-008quiz.speech1-lop")} showNext={true}
          onClick={() => {dispatch_setDialogCounter(1)}}
        />
        <SpeechBubble id="speech2" top="-15vh" subText={t("level1-008quiz.speech2-lop")} showNext={true}
          onClick={() => {dispatch_setDialogCounter(4)}}
        />
        <SpeechBubble id="speech3" top="-15vh" subText={t("level1-008quiz.speech3-lop")} showNext={false}
          onClick={() => {dispatch_setDialogCounter(6)}}
        />
      </Lop>
      
      <Cellina
        right="10vw"
        bottom="20vh"
        zIndex={2}
        state={cellinaState}
        faceDirection="left"
      >
        <SpeechBubble id="cellina-right" top="-10vh" left="10vw" subText={"That's right!"} showNext={true}
          onClick={() => {dispatch_setDialogCounter(dialogCounter + 1)}}
        />
        <SpeechBubble id="cellina-wrong" top="-10vh" left="10vw" subText={"Try again!"} showNext={true}
          onClick={() => {dispatch_setDialogCounter(1); toggleDisableOnSubmit()}}
        />
        <SpeechBubble id="cellina-next" top="-10vh" left="10vw" subText={"Let's take a look!"} showNext={true}
          onClick={() => { dispatch(navigateTo({navigate, path: "/level1/Level1_009CellTypeQuestion"}))}}
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
        disableOnSubmit={disableOnSubmit}
        onSubmit={(answer, index) => {
          console.log("onSubmit", answer, index)
          dispatch_setDialogCounter(2)
          dispatch_setPlayerResponse(index)
          dispatch(setBubbleShow({bubbleId: "player-response1", show: true}))
          if (index === 0) {
            setTimeout(() => dispatch(setBubbleShow({bubbleId: "cellina-right", show: true})), 1500)
          }
          else {
            setTimeout(() => dispatch(setBubbleShow({bubbleId: "cellina-wrong", show: true})), 1500)
          }
        }}
      />}

      {dialogCounter === 4 && <MultipleSelectPrompt
        style={{
          bottom: "50vh",
          left: "15vh"
        }}
        prompt={t("level1-008quiz.prompt2.prompt")}
        responseKey="level1-008quiz2"
        choices={t("level1-008quiz.prompt2.choices", { returnObjects: true })}
        disableOnSubmit={disableOnSubmit}
        onSubmit={(answers, indices) => {
          console.log("onSubmit", answers, indices)
          dispatch_setDialogCounter(5)
          const response = t("level1-008quiz.prompt2.responses", { returnObjects: true })[0].interpolate({a: answers[0].toLowerCase(), b: answers[1].toLowerCase()})
          console.log("response", response)
          dispatch_setPlayerResponse2(response)
          dispatch(setBubbleShow({bubbleId: "player-response2", show: true}))
          if (indices[0] === 0 && indices[1] === 2) {
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

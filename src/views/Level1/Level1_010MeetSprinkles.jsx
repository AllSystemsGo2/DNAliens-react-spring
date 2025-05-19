import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../../store/slices/pageSlice'
import { setBubbleShow } from '../../helpers/bubbleHelper'
import { getPageId } from '../../helpers/locationHelper'

// Import backgrounds
import starryBackground from '../../assets/starry-background.jpg'
import planetForeground from '../../assets/planet-foreground.png'
import spaceship from '../../assets/spaceship-crashed-2048.png'

// Import character components
import Lop from '../../components/characters/Lop'
import Player from '../../components/characters/Player'
import Sprinkles from '../../components/characters/Sprinkles'
import Cellina from '../../components/characters/Cellina'

// Import UI components
import SpeechBubble from '../../components/bubbles/SpeechBubble'
import Scene from '../../components/Scene'
import DialogBubble from '../../components/bubbles/DialogBubble'

const defaultAttributes = {
  // Empty default state as requested
  dialogCounter: 1,
  showPlayerPrompt: false,
  player_response: "",
}

const Level1_010MeetSprinkles = () => {
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


  // Use the same pattern as in Level1_001Frisbee to retrieve page attributes
  const {
    player_response,
    dialogCounter,
  } = useSelector((state) => 
    selectPageAttributes(state, state.app.pageId, defaultAttributes)
  )
  const dispatch_setDialogCounter = (counter) => dispatch(setPageAttribute({key: "dialogCounter", value: counter}))
  const dispatch_setShowPlayerPrompt = (show) => dispatch(setPageAttribute({key: "showPlayerPrompt", value: show}))
  const dispatch_setPlayerResponse = (response) => dispatch(setPageAttribute({key: "player_response", value: response}))

  useEffect(() => {
    console.log("dialogCounter", dialogCounter)
    if (dialogCounter === 1) {
      dispatch(setBubbleShow({bubbleId: "lop1", show: true}))
    }
    if (dialogCounter === 2) {
      dispatch(setBubbleShow({bubbleId: "lop1", show: false}))
      dispatch(setBubbleShow({bubbleId: "lop2", show: true}))
    }
    if (dialogCounter === 3) {
      dispatch(setBubbleShow({bubbleId: "lop2", show: false}))
      setTimeout(() => {
        dispatch(setBubbleShow({bubbleId: "lopScream", show: true}))
        dispatch(setBubbleShow({bubbleId: "playerScream", show: true}))
        dispatch(setBubbleShow({bubbleId: "sprinklesScream", show: true}))
      }, 1000)
      setTimeout(() => {
        dispatch(setBubbleShow({bubbleId: "playerScream", show: false}))
        dispatch(setBubbleShow({bubbleId: "sprinklesScream", show: false}))
        dispatch(setBubbleShow({bubbleId: "lopScream", show: false}))
        dispatch(setBubbleShow({bubbleId: "lop3", show: true}))
      }, 2000)      
    }
    if (dialogCounter === 4) {
      dispatch(setBubbleShow({bubbleId: "lop3", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina4", show: true}))
    }
    if (dialogCounter === 5) {
      dispatch(setBubbleShow({bubbleId: "cellina4", show: false}))
      dispatch(setBubbleShow({bubbleId: "lop5", show: true}))
    }
    if (dialogCounter === 6) {
      dispatch(setBubbleShow({bubbleId: "lop5", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina6", show: true}))
    }
    if (dialogCounter === 7) {
      dispatch(setBubbleShow({bubbleId: "cellina6", show: false}))
      setTimeout(() => {
        dispatch(setBubbleShow({bubbleId: "lop7", show: true}))
      }, 1000)
      setTimeout(() => {
        dispatch(setBubbleShow({bubbleId: "sprinklesMeow", show: true}))
      }, 1500)
    }
    if (dialogCounter === 8) {
      dispatch(setBubbleShow({bubbleId: "sprinklesMeow", show: false}))
      dispatch(setBubbleShow({bubbleId: "lop7", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina8", show: true}))
      setTimeout(() => {
        dispatch_setShowPlayerPrompt(true)
        dispatch(setBubbleShow({bubbleId: "player-prompt", show: true}))
      }, 2000)
    }
    if (dialogCounter === 9) {
      dispatch(setBubbleShow({bubbleId: "player-response", show: false}))
      dispatch(setBubbleShow({bubbleId: "player-prompt", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina8", show: false}))
      dispatch(setBubbleShow({bubbleId: "lop9", show: true}))
    }
    if (dialogCounter === 10) {
      dispatch(setBubbleShow({bubbleId: "lop9", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina10", show: true}))
    }
    if (dialogCounter === 11) {
      dispatch(setBubbleShow({bubbleId: "cellina10", show: false}))
      dispatch(setBubbleShow({bubbleId: "lop11", show: true}))
    }
    if (dialogCounter === 12) {
      dispatch(setBubbleShow({bubbleId: "lop11", show: false}))
      dispatch(setBubbleShow({bubbleId: "cellina12", show: true}))
    }
  }, [dialogCounter, dispatch])

  return (
    <div className="view">
      <Scene 
        skyImage={starryBackground}
        terrainImage={planetForeground}
        transformTerrain="scaleX(1)"
      />

      <div style={{
        position: 'absolute',
        bottom: '10vh',
        left: '-15vw',
      }}>
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
          width: '60vh',
          height: '60vh',
          backgroundImage: `url(${spaceship})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 2,
          transform: "rotateZ(185deg)"
        }} />
      </div>


      <Player 
        left="25vw"
        bottom="5vh"
        zIndex={2}
        state="idle"
      >
        <SpeechBubble id="playerScream" mainText={t("level1_010MeetSprinkles.scream")}/>      
        <SpeechBubble id="player-response" mainText={player_response} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <DialogBubble id="player-prompt" 
          mainText={t("level1_010MeetSprinkles.playerPrompt.prompt", {returnObjects: true})} 
          choices={t("level1_010MeetSprinkles.playerPrompt.choices", {returnObjects: true})} 
          onSubmit={(choice) => {
            dispatch_setPlayerResponse(choice)
            dispatch(setBubbleShow({bubbleId: "player-response", show: true}))
            dispatch(setBubbleShow({bubbleId: "player-prompt", show: false}))
            dispatch_setDialogCounter(dialogCounter + 1)
        }}/>
      </Player>
      
      <Lop 
        left="5vw"
        bottom="12vh"
        zIndex={2}
        state="idle"
      >
        <SpeechBubble id="lop1" mainText={t("level1_010MeetSprinkles.lop1")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="lop2" mainText={t("level1_010MeetSprinkles.lop2")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="lopScream" mainText={t("level1_010MeetSprinkles.scream")}/>      
        <SpeechBubble id="lop3" mainText={t("level1_010MeetSprinkles.lop3")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="lop5" mainText={t("level1_010MeetSprinkles.lop5")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="lop7" mainText={t("level1_010MeetSprinkles.lop7")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="lop9" mainText={t("level1_010MeetSprinkles.lop9")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="lop11" mainText={t("level1_010MeetSprinkles.lop11")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
      </Lop>

      <Cellina 
        right="10vw"
        bottom="18vh"
        zIndex={2}
        state="idle"
      >
        <SpeechBubble id="cellina4" mainText={t("level1_010MeetSprinkles.cellina4")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="cellina6" mainText={t("level1_010MeetSprinkles.cellina6")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="cellina8" mainText={t("level1_010MeetSprinkles.cellina8")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="cellina10" mainText={t("level1_010MeetSprinkles.cellina10")} showNext={true} onClick={() => dispatch_setDialogCounter(dialogCounter + 1)}/>
        <SpeechBubble id="cellina12" mainText={t("level1_010MeetSprinkles.cellina12")} />
      </Cellina>

      <Sprinkles 
        right="10vw"
        bottom="5vh"
        zIndex={3}
        state="idle"
      >
        <SpeechBubble id="sprinklesScream" mainText={t("level1_010MeetSprinkles.sprinklesScream")} />
        <SpeechBubble id="meow" mainText={t("level1_010MeetSprinkles.meow")} />
      </Sprinkles>

      
      
    </div>
  )
}

export default Level1_010MeetSprinkles

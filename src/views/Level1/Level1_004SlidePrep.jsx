import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { navigateTo } from '../../store/slices/appSlice'

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice'
import { setBubbleShow } from '../../helpers/bubbleHelper'

import Paragraph from '../../components/Paragraph'

import cellinaSmall from '../../assets/cellina-microscope-2-256.png'
import spoon1 from '../../assets/spoon.png'
import slide1 from '../../assets/blank-slide1.png'

import Item from '../../components/Item'
import Draggable from '../../components/Draggable'
import DropArea from '../../components/DropArea'
import SpeechBubble from '../../components/bubbles/SpeechBubble'

const defaultAttributes = {
  dropSpoon: "",
  showParagraph: false,
  showShakeButton: false,
  shakeSpoonCount: 0,
  shakingSpoon: false,
  showOpenMicroscope: false
}

const Level1_004SlidePrep = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  //Initialize the page attributes
  useEffect(() => {
    dispatch(initializePageAttributes({pageId: "slidePrep", props: defaultAttributes}));
  }, [dispatch]);

  //Select the page attributes
  const {
    dropSpoon,
    showParagraph,
    showShakeButton,
    shakeSpoonCount,
    shakingSpoon,
    showOpenMicroscope,
  } = useSelector((state) => 
    selectPageAttributes(state, "slidePrep", defaultAttributes)
  )

  const circleSpring = useSpring({
    from: { r: 0 },
    to: { r: Math.min(10 * shakeSpoonCount, 50) },
    config: { tension: 300, friction: 20 }
  })

  const shakeSpoonSpring = useSpring({
    from: { 
      transform: 'translate(0px, 0px)'
    },
    to: async (next) => {
      if (shakingSpoon) {
        await next({ transform: 'translate(0px, -5px)' })
        await next({ transform: 'translate(0px, 5px)' })
        await next({ transform: 'translate(0px, -5px)' })
        await next({ transform: 'translate(0px, 5px)' })
      } else {
        await next({ transform: 'translate(0px, 0px)' })
      }
    },
    onRest: () => {
      if(shakingSpoon) {
        dispatch(setPageAttribute({
          pageId: "slidePrep",
          key: "shakingSpoon",
          value: false
        }))
      }
    },
    config: {
      duration: 100
    }
  })

  useEffect(() => {
    if(dropSpoon == "area1") {
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showParagraph",
        value: false
      }))
    }
    if(shakeSpoonCount >= 5) {
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showShakeButton",
        value: false
      }))
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showOpenMicroscope",
        value: true
      }))
    }
  }, [])

  useEffect(() => {
    if(dropSpoon !== "area1") {
      setTimeout(() => dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showParagraph",
        value: true
      })), 1000)
    }
  }, [dropSpoon, dispatch])


  const handleDrop = ({dropAreaId}) => {
    dispatch(setPageAttribute({
      pageId: "slidePrep",
      key: "dropSpoon",
      value: dropAreaId
    }))
    if (dropAreaId === "area1") {
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showParagraph",
        value: false
      }))
      setTimeout(() => dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showShakeButton",
        value: true
      })), 1000)
    }    
  }

  const handleShake = () => {
    if(shakeSpoonCount < 5) {
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "shakeSpoonCount",
        value: shakeSpoonCount+1
      }))
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "shakingSpoon",
        value: true
      }))
    }
    else {
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showShakeButton",
        value: false
      }))
      setTimeout(() => {
        dispatch(setBubbleShow({pageId: "slidePrep", bubbleId: "speechBubble", show: false}))
        dispatch(setPageAttribute({
          pageId: "slidePrep",
          key: "showOpenMicroscope",
          value: true
        }))
      }, 
      1000)
    }
  }

  const handleOpenMicroscope = () => {
    dispatch(navigateTo({navigate, path: "/level1/Level1_005SlideView"}))
  }

  return (
    <div className="view">
      {showParagraph && 
      <div style={{ position: "absolute", left: "15vw", top: "5vh" }}>
        <img src={cellinaSmall} style={{position: "absolute", left: "-10vh", top: "0vh", width: "15vh", zIndex: 2}} />
        <Paragraph header="Cellina" body="Drag the spoon to the slide" />
      </div>
      }
            
      <div style={{ position: "absolute", left: "15vw", top: "30vh", width: "45vh", height: "45vh", zIndex: 2 }}>
        <Draggable id="drag1" dropArea={dropSpoon} 
          draggable={dropSpoon === ""} 
          tryDropOn={(areaId) => areaId === 'area1'}
          onDrop={handleDrop}>
          <animated.div style={{ transform: shakeSpoonSpring.transform, transformOrigin: "center" }}>
            <Item style={{ transform: "rotateZ(-120deg) scaleY(-1) rotateY(25deg)" }} src={spoon1} />
          </animated.div>
        </Draggable>
      </div>
      <DropArea id="area1" style={{ position: "absolute", right: "15vw", top: "25vh", width: "45vh", height: "45vh"}} enabled={dropSpoon === ""}>        
        <Item id="slide1" style={{position: "absolute", right: "0vh", top: "20vh", width: "25vh", height: "25vh", transform: "rotateZ(-90deg) rotateY(45deg)" }} src={slide1} >
          <div id ="droplet" style={{ position: "absolute", left:"0px", top:"0px", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg width="200" height="200" style={{ position: "absolute", zIndex: 1 }}>
              <animated.circle
                cx="100"
                cy="100"
                fill="rgba(66, 220, 255, 0.15)"
                stroke="rgba(66, 220, 255, 0.3)"
                strokeWidth="2"
                r={circleSpring.r}
              />
            </svg>
          </div>
        </Item>
      </DropArea>
      {showShakeButton && <button style={{ position: "absolute", right: "5vw", top: "25vh", width: "20vh"}} className="submit-button dark xlarge" onClick={handleShake}>Shake</button>}
      <SpeechBubble pageId="slidePrep" id="speechBubble" mainText="Ok. That's probably enough." style={{ position: "absolute", right: "5vw", bottom: "35vh" }}/>
      {showOpenMicroscope && <div style={{ position: "absolute", right: "3vw", bottom: "8vh"}}>
        <img src={cellinaSmall} style={{position: "absolute", left: "-50%", top: "-75%", width: "15vh"}} />
        <button  style={{ width: "20vh"}} className="submit-button dark" onClick={handleOpenMicroscope}>Let's take a look!</button>
      </div>}
    </div>
  )
}

export default Level1_004SlidePrep

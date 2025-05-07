import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice'
import { setBubbleShow } from '../../helpers/bubbleHelper'

import Paragraph from '../../components/Paragraph'


import spoon1 from '../../assets/spoon.png'
import slide1 from '../../assets/blank-slide1.png'

import Item from '../../components/Item'
import Draggable from '../../components/Draggable'
import DropArea from '../../components/DropArea'
import SpeechBubble from '../../components/SpeechBubble'

const defaultAttributes = {
  dropSpoon: "",
  showParagraph: false,
  shakeSpoon: 0,
  showShake: false,
  showOpenMicroscope: false
}

const Level1_004SlidePrep = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: "slidePrep", props: defaultAttributes}));
  }, [dispatch]);

  const {
    dropSpoon,
    showParagraph,
    shakeSpoon,
    showShake,
    showOpenMicroscope
  } = useSelector((state) => 
    selectPageAttributes(state, "slidePrep", defaultAttributes)
  )

  useEffect(() => {
    if(dropSpoon == "area1") {
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showParagraph",
        value: false
      }))
    }
    if(shakeSpoon >= 5) {
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showShake",
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
        key: "showShake",
        value: true
      })), 1000)
    }    
  }

  const handleShake = () => {
    if(shakeSpoon < 5) {
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "shakeSpoon",
        value: shakeSpoon+1
      }))
    }
    else {
      dispatch(setPageAttribute({
        pageId: "slidePrep",
        key: "showShake",
        value: false
      }))
      setTimeout(() => {
        dispatch(setBubbleShow("slidePrep", "speechBubble", false))
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
    navigate("/level1/005Microscope")
  }

  return (
    <div className="view">
      {showParagraph && <Paragraph header="Cellina" body="Drag the spoon to the slide" style={{ position: "absolute", left: "15vw", top: "5vh" }}/>}
      
      {showShake && <button style={{ position: "absolute", right: "25vw", top: "25vh", width: "10vh"}} className="submit-button" onClick={handleShake}>Shake</button>}
      <div style={{ position: "absolute", left: "15vw", top: "30vh", width: "45vh", height: "45vh" }}>
        <Draggable id="drag1" dropArea={dropSpoon} 
          draggable={dropSpoon === ""} 
          tryDropOn={(areaId) => areaId === 'area1'}
          onDrop={handleDrop}>
          <Item style={{ transform: "rotateZ(-120deg) scaleY(-1) rotateY(25deg)" }} src={spoon1} />
        </Draggable>
      </div>
      <DropArea id="area1" 
        style={{ position: "absolute", right: "25vw", top: "45vh", width: "25vh", height: "25vh"}}>
        <Item style={{ transform: "rotateZ(-90deg) rotateY(45deg)" }} src={slide1} />
      </DropArea>
      <SpeechBubble pageId="slidePrep" id="speechBubble" mainText="Ok. That's probably enough." style={{ position: "absolute", right: "5vw", bottom: "35vh" }}/>
      {showOpenMicroscope && <button style={{ position: "absolute", right: "3vw", bottom: "3vh", width: "20vh"}} className="submit-button" onClick={handleOpenMicroscope}>Open Microscope **debug:small photo of Cellina** </button>}
    </div>
  )
}

export default Level1_004SlidePrep

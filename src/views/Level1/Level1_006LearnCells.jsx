import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../../store/slices/pageSlice'
import {setBubbleShow} from '../../helpers/bubbleHelper'

import Scene from '../../components/Scene'

import Item from '../../components/Item'
import Lop from '../../components/characters/Lop';
import Player from '../../components/characters/Player';
import Cellina from '../../components/characters/Cellina';

import SpeechBubble from '../../components/bubbles/SpeechBubble'
import NarrativeBubble from '../../components/bubbles/NarrativeBubble'
import WrittenResponsePrompt from '../../components/WrittenResponsePrompt'

import starryBackground from '../../assets/starry-background.jpg'
import planetForeground from '../../assets/planet-foreground.png'
import spaceship from '../../assets/spaceship-crashed-2048.png'
import spoonImage from '../../assets/spoon.png'
import animalCell from '../../assets/animal-cell1-512.png'
import plantCell from '../../assets/plant-cell1-512.png'


const defaultState = {
  cellinaState: "microscope",
  puzzleChoice: ""
}

const SlideView = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  // trigger effect on view mounted
  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: "slideView", 
      props: defaultState
    }))
  }, [])

  // trigger effect on view mounted 
  useEffect(() => {
    setTimeout(() => dispatch(setBubbleShow({pageId: "learnCells", bubbleId: "cellina", show: true})), 1000)
    setTimeout(() => setCellinaState("idle") , 500)
  }, [])

  const holoboardSpring = useSpring({
    from: {
      left: '30vh',
      width: '40vh',
      height: '30vh'
    },
    to: async (next) => {
      await next({
        left: '30vh',
        width: '40vh',
        height: '30vh'
      })
      await next({
        left: '5vh',
        width: '80vh',
        height: '60vh'
      })
    },
    config: { duration: 500 }
  })

  const { cellinaState } = useSelector((state) => selectPageAttributes(state, "slideView", defaultState))

  const setPuzzleChoice = (value) => dispatch(setPageAttribute({pageId: "slideView", key: "puzzleChoice", value}))
  const setCellinaState = (value) => dispatch(setPageAttribute({pageId: "slideView", key: "cellinaState", value}))

  const goto = (pageId) => {
    console.log("goto", pageId)
    setPuzzleChoice(pageId)
    if (pageId === "animal-cell") {
      navigate("/level1/007_AnimalCellPuzzle")
    }
    else if (pageId === "plant-cell") {
      navigate("/level1/007_PlantCellPuzzle")
    }
  }

  return (
    <div className="view">
      <Scene skyImage={starryBackground} terrainImage={planetForeground} transformTerrain="scaleX(-1)" /> 

      {/* Crashed Spaceship */}
      <div 
        style={{
          position: 'absolute',
          bottom: '10vh',
          left: '25vh',
          width: '60vh',
          height: '60vh',
          backgroundImage: `url(${spaceship})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 2,
          transform: 'rotateZ(185deg)'
        }}
      /> 


      <Lop bottom="15vh" right="70vh"> 
        {/* Spoon */}
        <Item style={{
            position: 'absolute',
            top: '0vh',
            left: '0vh',
            width: '10vh',
            height: '10vh',
            zIndex: 4
          }}>
            <img id="spoon"
              src={spoonImage}
              alt="Spoon"
              style={{
                width: '100%',
                height: '100%'
              }}
            />
        </Item>
      </Lop>
      <Player bottom="5vh" right="15vh" faceDirection='left' zIndex={3}>
      </Player>
      <Cellina bottom="35vh" right="30vh" faceDirection='left' state={cellinaState}>
        <SpeechBubble pageId="learnCells" id="cellina" showNext={false} subText="Choose a plant or animal cell to start!" top="-25%" right="-50%"/>
      </Cellina>
    
      <animated.div id='holoboard' className="holoboard-prompt" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: '5vh',
        left: holoboardSpring.left,
        width: holoboardSpring.width,
        height: holoboardSpring.height,
        zIndex: 3
      }}>
        <h1>Cells</h1> 
        <div id='holoboard-body' style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '6fr 1fr',
          alignItems: 'center',
          justifyItems: 'center',
          width: '100%',
          height: '100%'
        }}>
          <Item style={{
            width: '100%',
            height: '100%',
            zIndex: 4,
            backgroundImage: `url(${animalCell})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          </Item>
          
          <Item style={{
            width: '100%',
            height: '100%',
            zIndex: 4,
            backgroundImage: `url(${plantCell})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          </Item>
          <button style={{width: '50%'}} className="submit-button" onClick={()=> goto("animal-cell") }>Animal Cell</button>
          <button style={{width: '50%'}} className="submit-button" onClick={()=> goto("plant-cell") }>Plant Cell</button>
        </div>
      </animated.div>  
    </div>
  )
}

export default SlideView

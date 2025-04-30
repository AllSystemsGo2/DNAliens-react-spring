import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Character Components
import Lop from '../../components/characters/Lop';
import Player from '../../components/characters/Player';
import Cellina from '../../components/characters/Cellina';
import SpeechBubble from '../../components/SpeechBubble';
import DialogBubble from '../../components/DialogBubble';
import {setBubbleShow} from '../../helpers/bubbleHelper'
import WrittenResponsePrompt from '../../components/WrittenResponsePrompt';
import Item from '../../components/Item';
import starryBackground from '../../assets/starry-background.jpg'
import planetForeground from '../../assets/planet-foreground.png'
import Scene from '../../components/Scene'
import spaceship from '../../assets/spaceship-crashed-2048.png'
import spoonImage from '../../assets/spoon.png'
import animalCell from '../../assets/animal-cell1-512.png'
import plantCell from '../../assets/plant-cell1-512.png'

// Redux
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../../store/slices/pageSlice';

const defaultAttributes = {
  showSpoon: true,
  showCellina: false,
  startDialogAtStep: 0,
  showQuestion: false,
  playerCellsExplanation: "",
  showHoloboard: false,
  cellinaState: "idle",
  // Add default state properties here
};

// const setShowSpoon = (show) => setPageAttribute({pageId: "introCellina", key: "showSpoon", value: show }) 
const setShowCellina = (show) =>  setPageAttribute({pageId: "introCellina", key: "showCellina", value: show }) 
const setShowQuestion = (show) => setPageAttribute({pageId: "introCellina", key: "showQuestion", value: show })
const setShowStartDialogAtStep = (show) => setPageAttribute({pageId: "introCellina", key: "startDialogAtStep", value: show })
const setPlayerCellsExplanation = (value) => setPageAttribute({pageId: "introCellina", key: "playerCellsExplanation", value })
const setShowHoloboard = (show) => setPageAttribute({pageId: "introCellina", key: "showHoloboard", value: show })
const setCellinaState = (state) => setPageAttribute({pageId: "introCellina", key: "cellinaState", value: state })

const IntroCellina = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const {
    // Add state properties here
    showSpoon,
    showCellina,
    startDialogAtStep,
    showQuestion,
    playerCellsExplanation,
    showHoloboard,
    cellinaState,
  } = useSelector((state) => selectPageAttributes(state, "introCellina", defaultAttributes));

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: "introCellina", props: defaultAttributes}));

    if(!showCellina) {
      setTimeout(() => dispatch(setShowCellina(true)), 1000)
    }
  }, [dispatch, showCellina]);

  useEffect(()=> {
    if(startDialogAtStep === 0) { 
      setTimeout(() => dispatch(setBubbleShow("introCellina", "warp", true)), 3000)
    }
    if(startDialogAtStep === 1) {
      dispatch(setBubbleShow("introCellina", "warp", false))
      setTimeout(() => dispatch(setBubbleShow("introCellina", "lopHelp", true)), 500)
    }
    else if (startDialogAtStep === 2) {
      dispatch(setBubbleShow("introCellina", "lopHelp", false))
      setTimeout(() => dispatch(setBubbleShow("introCellina", "cellinaSaliva", true)), 500)
    }
    else if (startDialogAtStep === 3) {
      dispatch(setBubbleShow("introCellina", "cellinaSaliva", false))
      setTimeout(() => dispatch(setBubbleShow("introCellina", "lopCells", true)), 500)
    }
    else if (startDialogAtStep === 4) {
      dispatch(setBubbleShow("introCellina", "lopCells", false))
      setTimeout(() => dispatch(setShowQuestion(true)), 500)
    }
    else if (startDialogAtStep === 5) {
      dispatch(setBubbleShow("introCellina", "playerCellsExplanation", false))
      dispatch(setBubbleShow("introCellina", "cellinaCells", true))
      dispatch(setShowHoloboard(true))
    }
    else if (startDialogAtStep === 6) {
      dispatch(setBubbleShow("introCellina", "playerCellsExplanation", false))
      dispatch(setBubbleShow("introCellina", "cellinaCells", false))
      dispatch(setShowHoloboard(false))
      dispatch(setBubbleShow("introCellina", "cellinaExamineCells", true))
    }
    else if (startDialogAtStep === 7) {
      dispatch(setBubbleShow("introCellina", "cellinaExamineCells", false))
      dispatch(setBubbleShow("introCellina", "lopExamineSpoon", true))
    }
    else if (startDialogAtStep === 8) {
      dispatch(setBubbleShow("introCellina", "lopExamineSpoon", false))
      dispatch(setBubbleShow("introCellina", "cellinaExamineSpoon", true))
    }
    else if (startDialogAtStep === 9) {
      dispatch(setBubbleShow("introCellina", "cellinaExamineSpoon", false))
      dispatch(setCellinaState("microscope"))
      setTimeout(() => dispatch(setBubbleShow("introCellina", "cellinaMicroscope", true)), 2000)
    }
    else if (startDialogAtStep === 10) {
      navigate("/level1/004Microscope")
    }
  }, [dispatch, startDialogAtStep, navigate])

  const stepDialog = (step) => {
    dispatch(setShowStartDialogAtStep(step))
  }

  const handleResponse = (response) => {
    dispatch(setShowQuestion(false))
    dispatch(setPlayerCellsExplanation(response))
    dispatch(setBubbleShow("introCellina", "playerCellsExplanation", true))

    setTimeout(() => {
      dispatch(setBubbleShow("introCellina", "cellinaCells", true))
      dispatch(setShowHoloboard(true))
    }, 1500)
    
    setTimeout(() => {
      dispatch(setShowStartDialogAtStep(5))
      dispatch(setBubbleShow("introCellina", "playerCellsExplanation", false))
    }, 4000)
  }


  return (
    <div className="view intro-cellina">
      {/* Add your view content here */}
      <Scene skyImage={starryBackground} terrainImage={planetForeground} transformTerrain="scaleX(-1)" />
      
      {/* Crashed Spaceship */}
      <div 
        style={{
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
          transform: 'rotateZ(185deg)'
        }}
      />

      <Lop bottom="15vh" right="50vw"> 
        {/* Spoon */}
        {showSpoon && (
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
        )}
        <SpeechBubble pageId="introCellina" id="lopHelp" subText={t("introCellina.lopHelp.subText")} showNext={true} onClick={() => stepDialog(2)} />
        <SpeechBubble pageId="introCellina" id="lopCells" subText={t("introCellina.lopCells.subText")} showNext={true} onClick={() => stepDialog(4)}/>
        <SpeechBubble pageId="introCellina" id="lopExamineSpoon" subText={t("introCellina.lopExamineSpoon.subText")} showNext={true} onClick={() => stepDialog(8)}/>
      </Lop>
      <Player bottom="5vh" right="15vh" faceDirection='left' zIndex={3}>
        <SpeechBubble pageId="introCellina" id="playerCellsExplanation" subText={playerCellsExplanation} showNext={false} onClick={() => stepDialog(5)} />
      </Player>
      {showCellina && (
        <Cellina bottom="35vh" right="30vh" faceDirection='left' state={cellinaState}>
          <SpeechBubble top="-15vh" pageId="introCellina" id="warp" subText={t("introCellina.warp.subText")} showNext={true} onClick={() => stepDialog(1)} />
          <SpeechBubble top="-15vh" pageId="introCellina" id="cellinaSaliva" subText={t("introCellina.cellinaSaliva.subText")} showNext={true} onClick={() => stepDialog(3)} />
          <SpeechBubble top="-15vh" pageId="introCellina" id="cellinaCells" subText={t("introCellina.cellinaCells.subText")} showNext={true} onClick={() => stepDialog(6)} />
          <SpeechBubble top="-15vh" pageId="introCellina" id="cellinaExamineCells" subText={t("introCellina.cellinaExamineCells.subText")} showNext={true} onClick={() => stepDialog(7)} />
          <SpeechBubble top="-15vh" pageId="introCellina" id="cellinaExamineSpoon" subText={t("introCellina.cellinaExamineSpoon.subText")} showNext={true} onClick={() => stepDialog(9)} />
          <SpeechBubble top="-15vh" pageId="introCellina" id="cellinaMicroscope" subText={t("introCellina.cellinaMicroscope.subText")} showNext={true} onClick={() => stepDialog(10)} />
        </Cellina>
      )}

      {showQuestion && (
        <WrittenResponsePrompt responseKey="introCellina.whatAreCells" prompt={t("introCellina.question.prompt")} 
          multiline={false} 
          onSubmit={handleResponse} 
          placeholder={t("introCellina.question.placeholder")}
          style={{
            position: 'absolute',
            top: '5vh',
            left: '50vh',
            transform: 'translateX(-50%)',
            zIndex: 3
          }}
        / >
      )}

      {showHoloboard && <div id='holoboard' className="holoboard-prompt" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: '5vh',
        left: '30vh',
        transform: 'translateX(-50%)',
        width: '40vh',
        height: '30vh',
        zIndex: 3
      }}>
        <h1>Cells</h1> 
        <div id='holoboard-body' style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '10vh 1fr',
          alignItems: 'center',
          justifyItems: 'center',
          width: '100%',
          height: '100%'
        }}>
          <Item style={{
            width: '10vh',
            height: '10vh',
            zIndex: 4,
            backgroundImage: `url(${animalCell})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          </Item>
          
          <Item style={{
            width: '10vh',
            height: '10vh',
            zIndex: 4,
            backgroundImage: `url(${plantCell})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          </Item>
          <p>Animal Cell</p>
          <p>Plant Cell</p>
        </div>
      </div>}
    </div>
  );
};

export default IntroCellina;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Character Components
import Lop from '../../components/characters/Lop';
import Player from '../../components/characters/Player';
import Cellina from '../../components/characters/Cellina';
import SpeechBubble, {setSpeechBubbleShow} from '../../components/SpeechBubble';
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
  playerCellsExplanation: ""
  // Add default state properties here
};

// const setShowSpoon = (show) => setPageAttribute({pageId: "introCellina", key: "showSpoon", value: show }) 
const setShowCellina = (show) =>  setPageAttribute({pageId: "introCellina", key: "showCellina", value: show }) 
const setShowQuestion = (show) => setPageAttribute({pageId: "introCellina", key: "showQuestion", value: show })
const setShowStartDialogAtStep = (show) => setPageAttribute({pageId: "introCellina", key: "startDialogAtStep", value: show })
const setPlayerCellsExplanation = (value) => setPageAttribute({pageId: "introCellina", key: "playerCellsExplanation", value })

const IntroCellina = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const navigate = useNavigate();
  
  const {
    // Add state properties here
    showSpoon,
    showCellina,
    startDialogAtStep,
    showQuestion,
    playerCellsExplanation
  } = useSelector((state) => selectPageAttributes(state, "introCellina", defaultAttributes));

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: "introCellina", props: defaultAttributes}));

    if(!showCellina) {
      setTimeout(() => dispatch(setShowCellina(true)), 1000)
    }
  }, [dispatch, showCellina]);

  useEffect(()=> {
    if(startDialogAtStep === 0) { 
      setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "warp", true)), 3000)
    }
    if(startDialogAtStep === 1) {
      dispatch(setSpeechBubbleShow("introCellina", "warp", false))
      setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "lopHelp", true)), 500)
    }
    else if (startDialogAtStep === 2) {
      dispatch(setSpeechBubbleShow("introCellina", "lopHelp", false))
      setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "cellinaSaliva", true)), 500)
    }
    else if (startDialogAtStep === 3) {
      dispatch(setSpeechBubbleShow("introCellina", "cellinaSaliva", false))
      setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "lopCells", true)), 500)
    }
    else if (startDialogAtStep === 4) {
      dispatch(setSpeechBubbleShow("introCellina", "lopCells", false))
      setTimeout(() => dispatch(setShowQuestion(true)), 500)
    }
    else if (startDialogAtStep === 5) {
      dispatch(setSpeechBubbleShow("introCellina", "playerCellsExplanation", false))
    }
  }, [dispatch, startDialogAtStep])

  const stepDialog = (step) => {
    dispatch(setShowStartDialogAtStep(step))
  }

  const handleResponse = (response) => {
    dispatch(setShowQuestion(false))
    dispatch(setPlayerCellsExplanation(response))
    dispatch(setSpeechBubbleShow("introCellina", "playerCellsExplanation", true))
    setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "cellinaCells", true)), 1500)
    //show the hologram board
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
      </Lop>
      <Player bottom="5vh" right="15vh" faceDirection='left' zIndex={3}>
        <SpeechBubble pageId="introCellina" id="playerCellsExplanation" subText={playerCellsExplanation} showNext={true} onClick={() => stepDialog(5)} />
      </Player>
      {showCellina && (
        <Cellina bottom="35vh" right="30vh" faceDirection='left' state="warp">
          <SpeechBubble pageId="introCellina" id="warp" subText={t("introCellina.warp.subText")} showNext={true} onClick={() => stepDialog(1)} />
          <SpeechBubble pageId="introCellina" id="cellinaSaliva" subText={t("introCellina.cellinaSaliva.subText")} showNext={true} onClick={() => stepDialog(3)} />
          <SpeechBubble pageId="introCellina" id="cellinaCells" subText={t("introCellina.cellinaCells.subText")} showNext={false} />
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

      <div id='holoboard' className="holoboard-prompt" style={{
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
      </div>
    </div>
  );
};

export default IntroCellina;

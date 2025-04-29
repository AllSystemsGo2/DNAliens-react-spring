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
import MultipleChoicePrompt from '../../components/MultipleChoicePrompt';
import starryBackground from '../../assets/starry-background.jpg'
import planetForeground from '../../assets/planet-foreground.png'
import Scene from '../../components/Scene'
import spaceship from '../../assets/spaceship-crashed-2048.png'
import spoonImage from '../../assets/spoon.png'

// Redux
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../../store/slices/pageSlice';

const defaultAttributes = {
  showSpoon: true,
  showCellina: false,
  showQuestion: false
  // Add default state properties here
};

// const setShowSpoon = (show) => setPageAttribute({pageId: "introCellina", key: "showSpoon", value: show }) 
const setShowCellina = (show) =>  setPageAttribute({pageId: "introCellina", key: "showCellina", value: show }) 
const setShowQuestion = (show) => setPageAttribute({pageId: "introCellina", key: "showQuestion", value: show })

const IntroCellina = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const navigate = useNavigate();
  
  const {
    // Add state properties here
    showSpoon,
    showCellina,
    showQuestion
  } = useSelector((state) => selectPageAttributes(state, "introCellina", defaultAttributes));

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: "introCellina", props: defaultAttributes}));

    if(!showCellina) {
      setTimeout(() => dispatch(setShowCellina(true)), 1000)
      setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "warp", true)), 3000)
    }
  }, [dispatch]);

  const stepDialog = (step) => {
    if(step === 1) {
      dispatch(setSpeechBubbleShow("introCellina", "warp", false))
      setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "lopHelp", true)), 500)
    }
    else if (step === 2) {
      dispatch(setSpeechBubbleShow("introCellina", "lopHelp", false))
      setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "cellinaSaliva", true)), 500)
    }
    else if (step === 3) {
      dispatch(setSpeechBubbleShow("introCellina", "cellinaSaliva", false))
      setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "lopCells", true)), 500)
    }
    else if (step === 4) {
      dispatch(setSpeechBubbleShow("introCellina", "lopCells", false))
      setTimeout(() => dispatch(setShowQuestion(true)), 500)
    }
  }

  const handleResponse = () => {
    dispatch(setShowQuestion(false))
    setTimeout(() => dispatch(setSpeechBubbleShow("introCellina", "cellinaCells", true)), 500)
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
            <img id="spoon"
              src={spoonImage}
              alt="Spoon"
              style={{
                position: 'absolute',
                top: '0vh',
                left: '0vh',
                width: '10vh',
                height: '10vh',
                zIndex: 4
              }}
          />
        )}
        <SpeechBubble pageId="introCellina" id="lopHelp" subText={t("introCellina.lopHelp.subText")} showNext={true} onClick={() => stepDialog(2)} />
        <SpeechBubble pageId="introCellina" id="lopCells" subText={t("introCellina.lopCells.subText")} showNext={true} onClick={() => stepDialog(4)}/>
      </Lop>
      <Player bottom="5vh" right="15vh" faceDirection='left'/>
      {showCellina && (
        <Cellina bottom="35vh" right="30vh" faceDirection='left' state="warp">
          <SpeechBubble pageId="introCellina" id="warp" subText={t("introCellina.warp.subText")} showNext={true} onClick={() => stepDialog(1)} />
          <SpeechBubble pageId="introCellina" id="cellinaSaliva" subText={t("introCellina.cellinaSaliva.subText")} showNext={true} onClick={() => stepDialog(3)} />
          <SpeechBubble pageId="introCellina" id="cellinaCells" subText={t("introCellina.cellinaCells.subText")} showNext={true} onClick={()=>{}} />
        </Cellina>
      )}

      {showQuestion && (
        <MultipleChoicePrompt responseKey="introCellina.whatAreCells" prompt={t("introCellina.question.prompt")} 
          choices={t("introCellina.question.choices", {returnObjects: true})} 
          onSubmit={handleResponse} 
          style={{
            position: 'absolute',
            top: '5vh',
            left: '50vh',
            transform: 'translateX(-50%)',
            zIndex: 3
          }}
        / >
      )}

    </div>

  );
};

export default IntroCellina;

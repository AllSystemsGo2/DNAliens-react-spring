import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice';
import EscapeScene from '../../components/EscapeScene'; 
import DialogPrompt from '../../components/DialogPrompt'
import './Level1_012Escape.css';
import Scene from '../../components/Scene'
import starryBackground from '../../assets/starry-background.jpg'
import Paragraph from '../../components/Paragraph';

const defaultAttributes = {
  playerHealth: 3,
  enemyHealth: 0,
  showPrompt: true,
  showEscape: false,
  showWin: false,
  showLose: false,
  startLaunchShip: false
};

const Level1Escape = () => {
  const dispatch = useDispatch();
  const { playerHealth, enemyHealth, showPrompt, showEscape, showWin, showLose, startLaunchShip} = useSelector(state => selectPageAttributes(state, 'level1escape', defaultAttributes));

  useEffect(() => {
    dispatch(initializePageAttributes({ pageId: 'level1escape', props: defaultAttributes }));
  }, [dispatch]);

  const setShowPrompt = (value) => dispatch(setPageAttribute({pageId: "level1escape", key: "showPrompt", value}))
  const setShowEscape = (value) => dispatch(setPageAttribute({pageId: "level1escape", key: "showEscape", value}))
  const setShowWin = (value) => dispatch(setPageAttribute({pageId: "level1escape", key: "showWin", value}))
  const setShowLose = (value) => dispatch(setPageAttribute({pageId: "level1escape", key: "showLose", value}))
  const setStartLaunchShip = (value) => dispatch(setPageAttribute({pageId: "level1escape", key: "startLaunchShip", value}))

  const onPlayerBoost = (isBoosted) => {
    if (isBoosted) {
      dispatch(setPageAttribute({ pageId: 'level1escape', key: 'playerHealth', value: playerHealth + 1 }));
    }
  };

  const onPlayerStall = (isStalled) => {
    if (isStalled) {
      dispatch(setPageAttribute({ pageId: 'level1escape', key: 'enemyHealth', value: enemyHealth + 1 }));
    }
  };

  const onEscapeStateEnd = (state) => {
    setShowWin(state === 'win')
    setShowLose(state === 'lose')
  };

  useEffect(() => {
    if(startLaunchShip) {
      console.log("launch the space ship")
    }
  }, [startLaunchShip])


  const restartEscape = () => {
    Object.keys(defaultAttributes).forEach(k => {
      dispatch(setPageAttribute({ pageId: 'level1escape', key: k, value: defaultAttributes[k] }));
    })
  }

  const questionBank = {
    questions: [
      {
        responseKey: 'level1fight-q1',
        question: "Which cell part contains a cell's genetic information?",
        answers: [
          "Cytoplasm",
          "Chloroplast",
          "Cell wall",
          "Nucleus"
        ],
        correct: "Nucleus"
      },
      {
        responseKey: 'level1fight-q2',
        question: "The cell wall is found in which type of cells?",
        answers: [
          "Animal cells only",
          "Plant cells only",
          "Both plant and animal cells",
          "Neither plant nor animal cells"
        ],
        correct: "Plant cells only"
      },
      {
        responseKey: 'level1fight-q3',
        question: "The cell wall is found in which type of cells?",
        answers: [
          "Animal cells only",
          "Plant cells only",
          "Both plant and animal cells",
          "Neither plant nor animal cells"
        ],
        correct: "Plant cells only"
      },
      {
        responseKey: 'level1fight-q4',
        question: "Is the correct answer 4?",
        answers: [
          "Wrong Choice",
          "Incorrect",
          "Pick another",
          "Correct"
        ],
        correct: "Correct"
      },
      // Add more questions as needed
    ]
  };

  return (
    <div className="view level1-escape">
      <Scene skyImage={starryBackground} terrainImage="" transformTerrain="scaleX(-1)" />
      
      {showEscape  && <EscapeScene 
        pageId="level1escape"
        player={'cellina-spaceship'}
        enemy={'baddies-ship1'}
        playerHealth={playerHealth}
        enemyHealth={enemyHealth}
        maxHealth={10}
        questionBank={questionBank}
        onPlayerStall={onPlayerStall}
        onPlayerBoost={onPlayerBoost}
        onEscapeStateEnd={onEscapeStateEnd}
      />}
      {showPrompt && <DialogPrompt prompt="Select the correct answer to add fuel and go faster!" options={["I'm Ready"]} onSelect={() => { setShowPrompt(false); setShowEscape(true) }} />}
      {(showWin || showLose) && <div className="end-screen">
        {showWin && <DialogPrompt prompt="Escape velocity achieved!" options={["Let's get out of here!"]} onSelect={() => { 
          // launch the space ship          
          setStartLaunchShip(true);
          setShowEscape(false);
          setShowWin(false);
         }} />}
        {showLose && <DialogPrompt prompt="Oh no! They caught up to us." options={["I'm ready to try again!"]} onSelect={() => { 
          // restart the escape
          restartEscape()
         }} />}
      </div>}
      {startLaunchShip && <div className="launch-screen">
        <Paragraph header="Debug" body="insert launch ship taking off animation..."/>
      </div>}
    </div>
  );
};

export default Level1Escape;

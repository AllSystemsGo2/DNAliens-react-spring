import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../store/slices/pageSlice';
import FightScene from '../components/FightScene'; 
import DialogPrompt from '../components/DialogPrompt'
import './Level1Fight.css';
import Scene from '../components/Scene'
import starryBackground from '../assets/starry-background.jpg'
import planetForeground from '../assets/planet-foreground.png'
import Paragraph from '../components/Paragraph';

const defaultAttributes = {
  playerHealth: 10,
  enemyHealth: 10,
  turn: "enemy",
  showPrompt: true,
  showFight: false,
  showWin: false,
  showLose: false,
  startLaunchShip: false
};

const Level1Fight = () => {
  const dispatch = useDispatch();
  const { playerHealth, enemyHealth, turn, showPrompt, showFight, showWin, showLose, startLaunchShip} = useSelector(state => selectPageAttributes(state, 'level1fight', defaultAttributes));

  useEffect(() => {
    dispatch(initializePageAttributes({ pageId: 'level1fight', props: defaultAttributes }));
  }, [dispatch]);

  const flipTurn = () => {
    dispatch(setPageAttribute({ pageId: 'level1fight', key: 'turn', value: turn === 'enemy' ? 'player' : 'enemy' }));
  };

  const setShowPrompt = (value) => dispatch(setPageAttribute({pageId: "level1fight", key: "showPrompt", value}))
  const setShowFight = (value) => dispatch(setPageAttribute({pageId: "level1fight", key: "showFight", value}))
  const setShowWin = (value) => dispatch(setPageAttribute({pageId: "level1fight", key: "showWin", value}))
  const setShowLose = (value) => dispatch(setPageAttribute({pageId: "level1fight", key: "showLose", value}))
  const setStartLaunchShip = (value) => dispatch(setPageAttribute({pageId: "level1fight", key: "startLaunchShip", value}))

  const onEnemyStun = (isStunned) => {
    if (isStunned) {
      dispatch(setPageAttribute({ pageId: 'level1fight', key: 'enemyHealth', value: enemyHealth - 1 }));
      flipTurn();
    }
  };

  const onPlayerStun = (isStunned) => {
    if (isStunned) {
      dispatch(setPageAttribute({ pageId: 'level1fight', key: 'playerHealth', value: playerHealth - 1 }));
      flipTurn();
    }
  };

  const onFightStateEnd = (state) => {
    setShowWin(state === 'win')
    setShowLose(state === 'lose')
  };

  useEffect(() => {
    if(startLaunchShip) {
      console.log("launch the space ship")
    }
  }, [startLaunchShip])


  const restartFight = () => {
    Object.keys(defaultAttributes).forEach(k => {
      dispatch(setPageAttribute({ pageId: 'level1fight', key: k, value: defaultAttributes[k] }));
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
    <div className="level1-fight">
      <Scene skyImage={starryBackground} terrainImage={planetForeground} transformTerrain="scaleX(-1)" />
      
      {showFight  && <FightScene 
        pageId="level1fight"
        players={['player', 'lop']}
        enemies={['baddies1', 'baddies2']}
        playerHealth={playerHealth}
        enemyHealth={enemyHealth}
        maxHealth={10}
        questionBank={questionBank}
        turn={turn}
        onEnemyStun={onEnemyStun}
        onPlayerStun={onPlayerStun}
        onFightStateEnd={onFightStateEnd}
      />}
      {showPrompt && <DialogPrompt prompt="Select the correct answer to strike the enemy or block!" options={["I'm Ready"]} onSelect={() => { setShowPrompt(false); setShowFight(true) }} />}
      {(showWin || showLose) && <div className="end-screen">
        {showWin && <DialogPrompt prompt="You knocked back those grumps!" options={["Let's get out of here!"]} onSelect={(option) => { 
          // launch the space ship          
          setStartLaunchShip(true);
          setShowFight(false);
          setShowWin(false);
         }} />}
        {showLose && <DialogPrompt prompt="Oh no! You were knocked out by the aliens." options={["I'm ready to try again!"]} onSelect={() => { 
          // restart the fight
          console.log("restart the fight")
          restartFight()
         }} />}
      </div>
      }
      {startLaunchShip && <div className="launch-screen">
        <Paragraph header="Debug" body="insert launch ship taking off animation..."/>
      </div>
      }
    </div>
  );
};

export default Level1Fight;

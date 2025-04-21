import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../store/slices/pageSlice';
import FightScene from '../components/FightScene'; 
import './Level1Fight.css';
import Scene from '../components/Scene'
import starryBackground from '../assets/starry-background.jpg'
import planetForeground from '../assets/planet-foreground.png'

const defaultAttributes = {
  playerHealth: 10,
  enemyHealth: 10,
};

const Level1Fight = () => {
  const dispatch = useDispatch();
  const { playerHealth, enemyHealth } = useSelector(state => selectPageAttributes(state, 'level1fight', defaultAttributes));

  useEffect(() => {
    dispatch(initializePageAttributes({ pageId: 'level1fight', props: defaultAttributes }));
  }, [dispatch]);

  const onEnemyStun = (isStunned) => {
    if (isStunned) {
      dispatch(setPageAttribute({ pageId: 'level1fight', key: 'enemyHealth', value: enemyHealth - 1 }));
    }
  };

  const onPlayerStun = (isStunned) => {
    if (isStunned) {
      dispatch(setPageAttribute({ pageId: 'level1fight', key: 'playerHealth', value: playerHealth - 1 }));
    }
  };

  const questionBank = {
    questions: [
      {
        responseKey: '1',
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
        responseKey: '2',
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
        responseKey: '3',
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
        responseKey: '4',
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
      <FightScene 
        pageId="level1fight"
        players={['player', 'lop']}
        enemies={['enemy1']}
        playerHealth={playerHealth}
        enemyHealth={enemyHealth}
        maxHealth={10}
        questionBank={questionBank}
        turn="enemy"
        onEnemyStun={onEnemyStun}
        onPlayerStun={onPlayerStun}
      />
    </div>
  );
};

export default Level1Fight;

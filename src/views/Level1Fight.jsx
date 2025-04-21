import React, { useState } from 'react';
import FightScene from '../components/FightScene'; 
import './Level1Fight.css';
import Scene from '../components/Scene'
import starryBackground from '../assets/starry-background.jpg'
import planetForeground from '../assets/planet-foreground.png'

const Level1Fight = () => {
  const [playerHealth, setPlayerHealth] = useState(10);
  const [enemyHealth, setEnemyHealth] = useState(10);

  const onEnemyStun = (isStunned) => {
    if (isStunned)   {
      setEnemyHealth(enemyHealth-1);
    }
  };

  const onPlayerStun = (isStunned) => {
    if (isStunned) {
      setPlayerHealth(playerHealth-1);
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

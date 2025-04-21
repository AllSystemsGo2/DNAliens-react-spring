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
        question: "What is DNA?",
        answers: [
          "Deoxyribonucleic acid",
          "Dynamic Nuclear Assembly",
          "Digital Network Access",
          "Data Network Architecture"
        ],
        correct: "Deoxyribonucleic acid"
      }
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

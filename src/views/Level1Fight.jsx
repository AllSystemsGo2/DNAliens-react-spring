import React, { useState } from 'react';
import FightScene from '../components/FightScene'; 
import './Level1Fight.css';
import Scene from '../components/Scene'
import starryBackground from '../assets/starry-background.jpg'
import planetForeground from '../assets/planet-foreground.png'

const Level1Fight = () => {
  const [playerHealth, setPlayerHealth] = useState(10);
  const [enemyHealth, setEnemyHealth] = useState(10);
  const maxHealth = 100;

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
        ]
      }
      // Add more questions as needed
    ]
  };

  return (
    <div className="level1-fight">
      <Scene skyImage={starryBackground} terrainImage={planetForeground} transformTerrain="scaleX(-1)" />
      <FightScene 
        players={['player', 'lop']}
        enemies={['enemy1']}
        playerHealth={playerHealth}
        enemyHealth={enemyHealth}
        maxHealth={maxHealth}
        questionBank={questionBank}
      />
    </div>
  );
};

export default Level1Fight;

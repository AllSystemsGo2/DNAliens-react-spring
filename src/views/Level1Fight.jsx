import React, { useState } from 'react';
import FightScene from '../components/FightScene'; 
import './Level1Fight.css';

const Level1Fight = () => {
  const [playerHealth, setPlayerHealth] = useState(10);
  const [enemyHealth, setEnemyHealth] = useState(10);
  const maxHealth = 100;

  const questionBank = {
    questions: [
      {
        question: "What is DNA?",
        answers: [
          "Deoxyribonucleic acid",
          "Dynamic Nuclear Assembly",
          "Digital Network Access",
          "Data Network Architecture"
        ],
        correct: 0
      }
      // Add more questions as needed
    ]
  };

  return (
    <div className="level1-fight">
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

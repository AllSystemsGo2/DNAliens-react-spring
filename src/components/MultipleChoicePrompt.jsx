import React, { useState } from 'react'
import './MultipleChoicePrompt.css'

const MultipleChoicePrompt = ({ question, choices, onSubmit, style }) => {
  const [selectedChoice, setSelectedChoice] = useState(null)

  const handleSubmit = () => {
    if (selectedChoice !== null) {
      onSubmit(choices[selectedChoice])
    }
  }

  return (
    <div className="multiple-choice-prompt" style={style}>
      <div className="question-text">{question}</div>
      <div className="choices-container">
        {choices.slice(0, 4).map((choice, index) => (
          <label key={index} className="choice-label">
            <input
              type="radio"
              name="choice"
              checked={selectedChoice === index}
              onChange={() => setSelectedChoice(index)}
            />
            <span className="radio-custom"></span>
            <span className="choice-text">{choice}</span>
          </label>
        ))}
      </div>
      {selectedChoice !== null && (
        <button
          className="submit-button"
          onClick={handleSubmit}
        >
          Confirm
        </button>
      )}
    </div>
  )
}

export default MultipleChoicePrompt

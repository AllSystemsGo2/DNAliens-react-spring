import React, { useState } from 'react'
import './MultipleChoicePrompt.css'
import { useDispatch } from 'react-redux'
import { setResponse } from '../store/slices/responseSlice'

const MultipleChoicePrompt = ({ question, responseKey, choices, onSubmit, style }) => {
  const [selectedChoice, setSelectedChoice] = useState(null)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    console.log(responseKey, choices[selectedChoice])
    dispatch(setResponse({ key: responseKey, value: choices[selectedChoice]}))
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

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import './Prompt.css'
import { getPageId } from '../helpers/locationHelper'
import { useDispatch, useSelector } from 'react-redux'
import { setResponse } from '../store/slices/responseSlice'
import { useLocation } from 'react-router-dom'

import { selectPageAttributes, setPageAttribute, initializePageAttributes } from '../store/slices/pageSlice';

const defaultAttributes = {
  attempts: 0
}

const MultipleChoicePrompt = ({ prompt, responseKey, choices, onSubmit, style, submitText = "Submit" }) => {
  const [selectedChoice, setSelectedChoice] = useState(null)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => { dispatch(initializePageAttributes({ pageId: `${getPageId(location.pathname)}:${responseKey}`, props: defaultAttributes}))}, [dispatch, location.pathname, responseKey])

  const {
    attempts
  } = useSelector((state) => 
    selectPageAttributes(state, `${getPageId(location.pathname)}:${responseKey}`, defaultAttributes)
  )
  const dispatch_setAttempts = (counter) => { dispatch(setPageAttribute({pageId: `${getPageId(location.pathname)}:${responseKey}`, key: "attempts", value: counter}))}

  const handleSubmit = () => {
    const newAttempts = attempts + 1
    dispatch_setAttempts(newAttempts)
    dispatch(setResponse({ key: responseKey, value: choices[selectedChoice], attempts: newAttempts}))
    if (selectedChoice !== null) {
      onSubmit(choices[selectedChoice], selectedChoice)
    }
  }

  return (
    <div className="multiple-choice-prompt" style={style}>
      <div className="prompt-text">{prompt}</div>
      <div className="choices-container">
        {choices?.slice(0, choices?.length).map((choice, index) => (
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
          {submitText}
        </button>
      )}
    </div>
  )
}

MultipleChoicePrompt.propTypes = {
  submitText: PropTypes.string
};


export default MultipleChoicePrompt

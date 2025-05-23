import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import './Prompt.css'
import { getPageId } from '../helpers/locationHelper'
import { useDispatch, useSelector } from 'react-redux'
import { setResponse } from '../store/slices/responseSlice'
import { useLocation } from 'react-router-dom'

import { selectPageAttributes, setPageAttribute, initializePageAttributes } from '../store/slices/pageSlice';

const defaultAttributes = {
  attempts: 0,
  selectedChoice: null,
  disabled: false
}

const MultipleChoicePrompt = ({ prompt, responseKey, choices, disableOnSubmit=true, onSubmit, style, row=false, submitText = "Submit" }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => { dispatch(initializePageAttributes({ pageId: `${getPageId(location.pathname)}:${responseKey}`, props: defaultAttributes}))}, [dispatch, location.pathname, responseKey])

  const {
    attempts,
    selectedChoice,
    disabled
  } = useSelector((state) => 
    selectPageAttributes(state, `${getPageId(location.pathname)}:${responseKey}`, defaultAttributes)
  )
  const dispatch_setAttempts = (counter) => { dispatch(setPageAttribute({pageId: `${getPageId(location.pathname)}:${responseKey}`, key: "attempts", value: counter}))}
  const dispatch_setSelectedChoice = (index) => { dispatch(setPageAttribute({pageId: `${getPageId(location.pathname)}:${responseKey}`, key: "selectedChoice", value: index}))}
  const dispatch_setDisabled = (value) => { dispatch(setPageAttribute({pageId: `${getPageId(location.pathname)}:${responseKey}`, key: "disabled", value: value}))}

  const handleSubmit = () => {
    const newAttempts = attempts + 1
    dispatch_setAttempts(newAttempts)
    dispatch(setResponse({ key: responseKey, value: choices[selectedChoice], attempts: newAttempts}))
    if (selectedChoice !== null) {
      onSubmit(choices[selectedChoice], selectedChoice)
    }
    if(disableOnSubmit){
      dispatch_setDisabled(true)
    }
  }

  useEffect(() => {
    if(!disableOnSubmit && disabled){
      dispatch_setDisabled(false)
    }
  }, [disableOnSubmit, disabled])

  return (
    <div className="multiple-choice-prompt" style={style} >
      <div className="prompt-text">{prompt}</div>
      <div className={`choices-container ${row ? "row" : ""}`}>
        {choices?.slice(0, choices?.length).map((choice, index) => (
          <label key={index} className="choice-label">
            <input
              type="radio"
              name="choice"
              disabled={disabled}
              checked={selectedChoice === index}
              onChange={() => dispatch_setSelectedChoice(index)}
            />
            <span className="radio-custom"></span>
            <span className="choice-text">{choice}</span>
          </label>
        ))}
      </div>
      {selectedChoice !== null && !disabled && (
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

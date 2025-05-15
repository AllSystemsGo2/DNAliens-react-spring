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
  selections: [],
  disabled: false
}

const MultipleSelectPrompt = ({ prompt, responseKey, choices, disableOnSubmit=true, onSubmit, minSelections=2, maxSelections=2, style, submitText = "Submit" }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => { dispatch(initializePageAttributes({ pageId: `${getPageId(location.pathname)}:${responseKey}`, props: defaultAttributes}))}, [dispatch, location.pathname, responseKey])

  const {
    attempts,
    selections,
    disabled
  } = useSelector((state) => 
    selectPageAttributes(state, `${getPageId(location.pathname)}:${responseKey}`, defaultAttributes)
  )
  const dispatch_setAttempts = (counter) => { dispatch(setPageAttribute({pageId: `${getPageId(location.pathname)}:${responseKey}`, key: "attempts", value: counter}))}
  const dispatch_setSelections = (selections) => { dispatch(setPageAttribute({pageId: `${getPageId(location.pathname)}:${responseKey}`, key: "selections", value: selections}))}
  const dispatch_setDisabled = (value) => { dispatch(setPageAttribute({pageId: `${getPageId(location.pathname)}:${responseKey}`, key: "disabled", value: value}))}

  const toggleSelection = (choiceIndex) => {
    const add = selections.findIndex(x => x === choiceIndex)
    if(add === -1) {
      const newSelections = [...selections, choiceIndex]
      while (newSelections.length > maxSelections) {
        newSelections.shift()
      }
      dispatch_setSelections(newSelections)
    }
    else {
      dispatch_setSelections(selections.filter((_,i)=> i !== add))
    }
  }

  const handleSubmit = () => {
    const newAttempts = attempts + 1
    dispatch_setAttempts(newAttempts)
    dispatch(setResponse({ key: responseKey, value: selections, attempts: newAttempts}))
    if (selections.length) {
      const sortedSelections = [...selections]
      sortedSelections.sort((a, b) => a - b)
      onSubmit(choices.filter((_,i)=> i in sortedSelections), sortedSelections)
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
      <div className="choices-container">
        {choices?.slice(0, choices?.length).map((choice, index) => (
          <label key={index} className="choice-label">
            <input
              type="checkbox"
              name="choice"
              disabled={disabled}
              checked={selections.findIndex(x => x === index) !== -1}
              onChange={() => toggleSelection(index)}
            />
            <span className="checkbox-custom"></span>
            <span className="choice-text">{choice}</span>
          </label>
        ))}
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}   
        disabled={disabled || selections.length < minSelections}       
      >
        {submitText}
      </button>
    </div>
  )
}

MultipleSelectPrompt.propTypes = {
  submitText: PropTypes.string
};


export default MultipleSelectPrompt

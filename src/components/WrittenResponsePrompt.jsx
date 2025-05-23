import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import './Prompt.css'
import { useDispatch, useSelector } from 'react-redux'
import { setResponse } from '../store/slices/responseSlice'
import { getPageId } from '../helpers/locationHelper'
import { useLocation } from 'react-router-dom'

import { selectPageAttributes, setPageAttribute, initializePageAttributes } from '../store/slices/pageSlice';


const defaultAttributes = {
  responseText: "",
  disabled: false
}

const WrittenResponsePrompt = ({ prompt, responseKey, placeholder = 'I think that...', multiline = false, onSubmit, disableOnSubmit=true, style, submitText = "Submit" }) => {  
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => { dispatch(initializePageAttributes({ pageId: `${getPageId(location.pathname)}:${responseKey}`, props: defaultAttributes}))}, [dispatch, location.pathname, responseKey])

  const {
    responseText,
    disabled
  } = useSelector((state) => 
    selectPageAttributes(state, `${getPageId(location.pathname)}:${responseKey}`, defaultAttributes)
  )

  const dispatch_setDisabled = (value) => { dispatch(setPageAttribute({pageId: `${getPageId(location.pathname)}:${responseKey}`, key: "disabled", value: value}))}
  const dispatch_setResponseText = (value) => { dispatch(setPageAttribute({pageId: `${getPageId(location.pathname)}:${responseKey}`, key: "responseText", value: value}))}

  const handleSubmit = () => {
    dispatch(setResponse({ key: responseKey, value: responseText }))
    if (responseText.trim()) {
      onSubmit(responseText)
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
    <div className="multiple-choice-prompt" style={style}>
      <div className="prompt-text">{prompt}</div>
      <div className="choices-container">
        {!multiline ? (
          <input
            type="text"
            value={responseText}
            onChange={(e) => dispatch_setResponseText(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="written-response-input"
          />
        ) : (
          <textarea
            value={responseText}
            onChange={(e) => dispatch_setResponseText(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="written-response-input"
            rows={4}
          />
        )}
      </div>
      {responseText.trim() !== '' && !disabled && (
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

WrittenResponsePrompt.propTypes = {
  prompt: PropTypes.string.isRequired,
  responseKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  style: PropTypes.object,
  submitText: PropTypes.string
}

export default WrittenResponsePrompt

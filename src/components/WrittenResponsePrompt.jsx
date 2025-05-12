import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Prompt.css'
import { useDispatch } from 'react-redux'
import { setResponse } from '../store/slices/responseSlice'

const WrittenResponsePrompt = ({ prompt, responseKey, placeholder = 'I think that...', multiline = false, onSubmit, style, submitText = "Submit" }) => {
  const [response, setResponseText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(setResponse({ key: responseKey, value: response }))
    if (response.trim()) {
      onSubmit(response)
    }
  }

  return (
    <div className="multiple-choice-prompt" style={style}>
      <div className="prompt-text">{prompt}</div>
      <div className="choices-container">
        {!multiline ? (
          <input
            type="text"
            value={response}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder={placeholder}
            className="written-response-input"
          />
        ) : (
          <textarea
            value={response}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder={placeholder}
            className="written-response-input"
            rows={4}
          />
        )}
      </div>
      {response.trim() !== '' && (
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

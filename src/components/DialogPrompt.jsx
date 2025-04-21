import React from 'react';
import PropTypes from 'prop-types';
import './MultipleChoicePrompt.css'; // Reuse the same styles for consistency

/**
 * DialogPrompt
 * Props:
 *   - prompt: string (main dialog/question text)
 *   - options: array of strings (button labels)
 *   - onSelect: function (called with value when a button is clicked)
 *   - style: optional style overrides
 */
const DialogPrompt = ({ prompt, options, onSelect, style }) => {
  return (
    <div className="multiple-choice-prompt" style={style}>
      <div className="question-text">{prompt}</div>
      <div className="choices-container">
        {options.map((option, idx) => (
          <button
            key={idx}
            className="submit-button"
            style={{ margin: '0 8px 8px 0' }}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

DialogPrompt.propTypes = {
  prompt: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.object
};

export default DialogPrompt;

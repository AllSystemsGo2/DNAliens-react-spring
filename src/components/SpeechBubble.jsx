import React from 'react'
import './SpeechBubble.css'

const SpeechBubble = ({ mainText, subText, style }) => {
  return (
    <div className="speech-bubble" style={style}>
      <span style={{ display: 'block' }}>{mainText}</span>
      {subText && (
        <span style={{
          fontSize: '0.8em',
          opacity: 0.7,
          display: 'block',
          marginTop: '5px'
        }}>
          {subText}
        </span>
      )}
    </div>
  )
}

export default SpeechBubble

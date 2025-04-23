import React from 'react'
import './SpeechBubble.css'

const SpeechBubble = ({ mainText, subText, top = '-50%', left = '0vh', maxWidth="300px",  right, style }) => {
  const bubbleStyle = {
    ...style,
    top,
    ...(right ? { right } : { left }),
    maxWidth
  }
  return (
    <div className="speech-bubble" style={bubbleStyle}>
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

import React from 'react'
import './SpeechBubble.css'
import { useTranslation } from 'react-i18next'

const SpeechBubble = ({ mainText, subText, showDismiss=false, onClick, top = '-50%', left = '0vh', maxWidth="300px", right, style }) => {
  const { t } = useTranslation()
  
  const bubbleStyle = {
    ...style,
    top,
    ...(right ? { right } : { left }),
    maxWidth
  }
  return (
    <div className="speech-bubble" style={bubbleStyle} onClick={onClick}>
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
      {showDismiss && (
        <span style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          fontSize: '0.6em',
          opacity: 0.5,
          cursor: 'pointer'
        }}>
          {t('ui.next')}
        </span>
      )}
    </div>
  )
}

export default SpeechBubble

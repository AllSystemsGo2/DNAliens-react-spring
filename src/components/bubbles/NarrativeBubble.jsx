import React, { useEffect } from 'react'
import './Bubble.css'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux';
import { initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice';

/**
 * Like SpeechBubble but it doesn't bounce and glow.
 */

const defaultAttributes = {
  show: false
}

const NarrativeBubble = ({ pageId="", id="", mainText, subText, characterSrc, showNext=false, onClick, top = '-50%',bottom, left = '0vh', maxWidth="300px", right, style }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const { show } = useSelector(state => selectPageAttributes(state, `${pageId}:${id}`));

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: `${pageId}:${id}`, id: 'show', props: defaultAttributes}));
  }, [dispatch, pageId, id]);

  const bubbleStyle = {
    ...style,
    ...(bottom ? {bottom } : { top }),
    ...(right ? { right } : { left }),
    maxWidth
  }
  return show ? (
    <div className="narrative-bubble bubble" style={bubbleStyle} onClick={onClick}>
      {characterSrc && <img src={characterSrc} style={{position: "absolute", left: "-40%", top: "-50%", width: "15vh"}} />}
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
      {showNext && (
        <span
          style={{
            fontSize: '0.8em',
            opacity: 0.7,
            display: 'block',
            marginTop: '10px',
            cursor: 'pointer'
          }}
        >
          {t('ui.next')}
        </span>
      )}
    </div>
  ) : null
}

export default NarrativeBubble

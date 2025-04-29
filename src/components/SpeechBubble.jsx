import React, { useEffect } from 'react'
import './SpeechBubble.css'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux';
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../store/slices/pageSlice';

const defaultAttributes = {
  show: false
}

export const setSpeechBubbleShow = (pageId, bubbleId, show) => setPageAttribute({pageId: `${pageId}:${bubbleId}`, key: 'show', value: show })

const SpeechBubble = ({ pageId="", id="", mainText, subText, showNext=false, onClick, top = '-50%',bottom, left = '0vh', maxWidth="300px", right, style }) => {
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

export default SpeechBubble

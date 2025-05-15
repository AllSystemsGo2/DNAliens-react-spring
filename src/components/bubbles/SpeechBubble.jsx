import React, { useEffect } from 'react'
import './Bubble.css'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux';
import { initializePageAttributes } from '../../store/slices/pageSlice';
import { selectBubbleShowAttribute } from '../../helpers/bubbleHelper';

const defaultAttributes = {
  show: false
}

const SpeechBubble = ({ pageId="", id, mainText, subText, characterSrc, showNext=false, onClick, top = '-50%',bottom, left = '0vh', maxWidth="300px", right, style }) => {
  
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const { show } = useSelector(state => selectBubbleShowAttribute({state, pageId, bubbleId: id, defaultValue: false}))
  const {_pageId } = useSelector(state => pageId ? {_pageId: pageId} : {_pageId: state.app.pageId})

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: `${_pageId}:${id}`, id: 'show', props: defaultAttributes}));
  }, [dispatch, _pageId, id]);

  const bubbleStyle = {
    ...style,
    ...(bottom ? {bottom } : { top }),
    ...(right ? { right } : { left }),
    maxWidth
  }
  return show ? (
    <div className="speech-bubble bubble" style={bubbleStyle} onClick={onClick}>
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

export default SpeechBubble

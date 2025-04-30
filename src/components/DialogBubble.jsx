import React from 'react';
import PropTypes from 'prop-types';
import './SpeechBubble.css'
import { useSelector, useDispatch } from 'react-redux';
import { initializePageAttributes, selectPageAttributes } from '../store/slices/pageSlice';

const defaultAttributes = {
  show: false
}

const DialogBubble = ({ pageId="", id="", mainText, subText, choices=[], onSubmit, top = '-50%', bottom, left = '0vh', maxWidth="300px", right, style }) => {
  const dispatch = useDispatch();
  const { show } = useSelector(state => selectPageAttributes(state, `${pageId}:${id}`));

  React.useEffect(() => {
    dispatch(initializePageAttributes({pageId: `${pageId}:${id}`, id: 'show', props: defaultAttributes}));
  }, [dispatch, pageId, id]);

  const bubbleStyle = {
    ...style,
    ...(bottom ? {bottom } : { top }),
    ...(right ? { right } : { left }),
    maxWidth
  }

  return show ? (
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
      <div className="dialog-choices">
        {choices.map((choice, index) => (
          <button
            key={index}
            className="dialog-choice-button"
            onClick={() => onSubmit(choice, index)}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  ) : null;
}

DialogBubble.propTypes = {
  pageId: PropTypes.string,
  id: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func,
  top: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  maxWidth: PropTypes.string,
  style: PropTypes.object
};

export default DialogBubble;

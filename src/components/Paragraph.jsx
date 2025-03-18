import React from 'react'
import './Paragraph.css'

const Paragraph = ({ header, body, style }) => {
  return (
    <div className="paragraph" style={style}>
      <div className="header-text">{header}</div>
      <div className="body-text">
        {body}
      </div>
    </div>
  )
}

export default Paragraph

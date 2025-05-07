import React from 'react'
import './Paragraph.css'

const Paragraph = ({ header, body, style }) => {
  return (
    <div className="paragraph" style={style}>
      {header && <div className="header-text">{header}</div>}
      {body && <div className="body-text">
        {body}
      </div>}
    </div>
  )
}

export default Paragraph

import React from 'react'
import './Paragraph.css'

const Paragraph = ({ header, body, style, children }) => {
  return (
    <div className="paragraph" style={style}>
      {header && <div className="header-text">{header}</div>}
      {body && <div className="body-text">
        {body}        
      </div>}
      {children}
    </div>
  )
}

export default Paragraph

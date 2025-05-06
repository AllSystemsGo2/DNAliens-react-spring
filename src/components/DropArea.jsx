import React from 'react'

const DropArea = ({ children, id, style }) => {
  return (
    <div
      style={{
        ...style,
        position: style?.position || 'relative'
      }}
      data-drop-area="true"
      data-area-id={id}
    >
      {children}
    </div>
  )
}

export default DropArea

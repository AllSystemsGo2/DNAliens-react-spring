import React, { useRef } from 'react'

const DropArea = ({ children, id, style }) => {
  const containerRef = useRef(null)

  return (
    <div
      ref={containerRef}
      style={{
        position: 'block',
        ...style,
      }}
      data-drop-area="true"
      data-area-id={id}
    >
      {children}
    </div>
  )
}

export default DropArea

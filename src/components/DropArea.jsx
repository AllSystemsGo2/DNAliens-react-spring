import React, { useEffect, useRef } from 'react'

const DropArea = ({ children, id, onDrop, style }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    // When children change, check if any new Draggable was added
    const draggables = containerRef.current?.querySelectorAll('[data-draggable="true"]')
    if (draggables?.length && onDrop) {
      draggables.forEach(draggable => {
        const draggableId = draggable.getAttribute('data-draggable-id')
        if (draggableId) {
          onDrop(draggableId)
        }
      })
    }
  }, [children, onDrop])

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

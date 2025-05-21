import React, { useState, useEffect, useCallback } from 'react'
import './DropArea.css'

const DropArea = ({ children, id, style, enabled = true }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleDragEnter = useCallback((e) => {
    const draggable = document.querySelector('[data-draggable="true"]')
    if (draggable) {
      setIsHovered(true)
    }
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  useEffect(() => {
    const element = document.querySelector(`[data-area-id="${id}"]`)
    if (!element) return

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const isInside = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      const draggable = document.querySelector('[data-draggable="true"]')
      if (draggable) {
        setIsHovered(isInside)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [id])

  return (
    <div
      style={{
        ...style,
        position: style?.position || 'relative'
      }}
      className={`drop-area ${isHovered && enabled ? 'hover' : ''}`}
      data-drop-area="true"
      data-area-id={id}
      data-enabled={enabled}
      onMouseEnter={handleDragEnter}
      onMouseLeave={handleDragLeave}
    >
      {children}
    </div>
  )
}

export default DropArea

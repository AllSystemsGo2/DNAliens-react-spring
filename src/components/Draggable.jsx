import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'

const Draggable = ({ children, id, tryDropOn, dropArea, style, draggable = true, onDrop }) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
  const [isDragging, setIsDragging] = useState(false)
  const originalPosition = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const elementRef = useRef(null)

  useEffect(() => {
    const dropAreas = document.querySelectorAll('[data-drop-area="true"]')

    // Check if we're over any drop area
    const dropAreaElement = Array.from(dropAreas).find(area => area.getAttribute('data-area-id') === dropArea)
    if (dropAreaElement) {
      const parentRect = elementRef.current.parentElement.getBoundingClientRect()

      const elementRect = elementRef.current.getBoundingClientRect()
      const areaRect = dropAreaElement.getBoundingClientRect()
      
      api.start({ x: areaRect.x - (elementRect.width- areaRect.width)/2 - parentRect.x, y: areaRect.y - (elementRect.height-areaRect.height)/2 - parentRect.y, immediate: true })
    }
    else {
      api.start({ 
        x: originalPosition.current.x, 
        y: originalPosition.current.y,
        immediate: false,
        config: { tension: 300, friction: 20 }
      })
    }

  }, [dropArea, api])

  const handleMouseDown = (e) => {
    if (!draggable) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX - x.get(), y: e.clientY - y.get() }
  }

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    const newX = e.clientX - dragStart.current.x
    const newY = e.clientY - dragStart.current.y
    api.start({ x: newX, y: newY, immediate: true })
  }, [isDragging, api])

  const handleMouseUp = useCallback((e) => {
    if (!isDragging) return
    setIsDragging(false)

    // Get all drop areas
    const dropAreas = document.querySelectorAll('[data-drop-area="true"]')
    let dropped = false

    // Check if we're over any drop area
    dropAreas.forEach(area => {
      const rect = area.getBoundingClientRect()
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const areaId = area.getAttribute('data-area-id')
        if (tryDropOn?.(areaId)) {
          dropped = true
          onDrop?.({ dropAreaId: areaId })
        }
      }
    })

    // If not dropped on a valid area, return to original position
    if (!dropped) {
      onDrop?.({ dropAreaId: '' })
      api.start({ 
        x: originalPosition.current.x, 
        y: originalPosition.current.y,
        immediate: false,
        config: { tension: 300, friction: 20 }
      })
    }
  }, [isDragging, api, tryDropOn, onDrop])

  // Effect for drag event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <animated.div
      ref={elementRef}
      style={{
        ...style,
        cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none',
        transform: x.to((x) => `translate3d(${x}px,${y.get()}px,0)`),
      }}
      onMouseDown={handleMouseDown}
      data-draggable="true"
      data-draggable-id={id}
      data-drop-area={dropArea}
    >
      {children}
    </animated.div>
  )
}

export default Draggable

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'

const Draggable = ({ children, id, tryDropOn, onDrop, dropArea, style }) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
  const [isDragging, setIsDragging] = useState(false)
  const [droppedArea, setDroppedArea] = useState(dropArea || '')
  const originalPosition = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const elementRef = useRef(null)
  const originalParent = useRef(null)
  const originalStyle = useRef(null)

  useEffect(() => {
    if(elementRef.current){
      originalPosition.current = { x: elementRef.current.offsetLeft, y: elementRef.current.offsetTop }
      originalStyle.current = elementRef.current.style
    }
  }, [elementRef, originalParent,originalPosition, id])

  const handleMouseDown = (e) => {
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
        if (tryDropOn && tryDropOn(areaId)) {
          dropped = true
          setDroppedArea(areaId)
        }
      }
    })

    // If not dropped on a valid area, return to original position
    if (!dropped) {
      setDroppedArea('')
      api.start({ 
        x: originalPosition.current.x, 
        y: originalPosition.current.y,
        immediate: false,
        config: { tension: 300, friction: 20 }
      })
    }
  }, [isDragging, api, tryDropOn])

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

  // Effect for managing parent container
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Store original parent on first mount
    if (!originalParent.current) {
      originalParent.current = element.parentElement
    }

    if (droppedArea) {
      console.log("droppedArea", droppedArea)
      const targetArea = document.querySelector(`[data-area-id="${droppedArea}"]`)
      console.log("found target area", targetArea)
      if (targetArea) {
        // Calculate position relative to the drop area
        const elementRect = element.getBoundingClientRect()
        const areaRect = targetArea.getBoundingClientRect()
        
        // Move the element to the drop area
        element.style.position = 'absolute'
        element.style.left = `${elementRect.left - areaRect.left}px`
        element.style.top = `${elementRect.top - areaRect.top}px`
        
        targetArea.appendChild(element)
        api.start({ x: 0, y: 0, immediate: true })
        if(onDrop){ onDrop({dropAreaId: droppedArea, draggableId: id}) }
      }
    } else if (originalParent.current) {
      console.log("returning to original position", originalPosition.current, originalParent.current)
      // Return to original position
      originalParent.current.appendChild(element)
      elementRef.current.style.position = 'absolute'
      elementRef.current.style.left = `unset`
      elementRef.current.style.top = `unset`
      api.start({ x: originalPosition.current.x, y: originalPosition.current.y, immediate: true })
      if(onDrop){ onDrop({dropAreaId: "", draggableId: id}) }
    }
  }, [droppedArea, api, style?.position])

  return (
    <animated.div
      ref={elementRef}
      style={{
        ...style,
        cursor: isDragging ? 'grabbing' : 'grab',
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

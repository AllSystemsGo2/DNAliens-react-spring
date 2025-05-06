import React, { useState, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'

const Draggable = ({ children, id, tryDropOn, dropArea, style }) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
  const [isDragging, setIsDragging] = useState(false)
  const originalPosition = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const elementRef = useRef(null)
  
  const handleMouseDown = (e) => {
    setIsDragging(true)
    dragStart.current = { x: e.clientX - x.get(), y: e.clientY - y.get() }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newX = e.clientX - dragStart.current.x
    const newY = e.clientY - dragStart.current.y
    api.start({ x: newX, y: newY, immediate: true })
  }

  const handleMouseUp = (e) => {
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
          
          // Get the current element
          const element = elementRef.current
          if (!element) return

          // Calculate position relative to the drop area
          const elementRect = element.getBoundingClientRect()
          const areaRect = area.getBoundingClientRect()
          
          // Move the element to the drop area
          element.style.position = 'absolute'
          element.style.left = `${e.clientX - areaRect.left - (elementRect.width / 2)}px`
          element.style.top = `${e.clientY - areaRect.top - (elementRect.height / 2)}px`
          
          // Physically move the DOM element
          area.appendChild(element)
          
          // Reset spring animation
          api.start({ x: 0, y: 0, immediate: true })
        }
      }
    })

    // If not dropped on a valid area, return to original position
    if (!dropped) {
      api.start({ 
        x: originalPosition.current.x, 
        y: originalPosition.current.y,
        immediate: false,
        config: { tension: 300, friction: 20 }
      })
    }
  }

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

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

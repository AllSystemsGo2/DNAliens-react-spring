import { useState, useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useTranslation } from 'react-i18next'

/**
 * ImageMap - A specialized component for creating interactive image maps
 * that detect hover only on non-transparent areas of PNG images.
 * 
 * @param {string} imageSrc - The source of the PNG image
 * @param {string} mapSrc - The source of the PNG image map
 * @param {object} areas - Map of named areas with their data, "{ HEXcolor: id string }" is used to identify the area
 * @param {object} areaData - Map of area data, "{ id: { nameKey: string, name: string, description: string } }"
 * @param {function} onHover - Callback when hovering over a region
 * @param {function} onClick - Callback when clicking a region
 * @param {object} style - Additional styles for the container
 * @param {boolean} showDebug - Show debug overlay for transparent areas
 * @param {boolean} showLabels - Show text labels for each area
 * @param {string} labelPosition - Position of labels ('inside', 'top', 'bottom', etc.)
 */
const DropImageMap = ({ 
  id,
  enabled = true,
  imageSrc, 
  mapSrc,
  areas = {},
  areaData = {},
  labelPositions = {},
  mouseInput= {x:0,y:0},
  onHover, 
  onClick,
  style, 
  showDebug = false,
  labelOnHover = false,
  showLabels = false,
  hoverZoom = true, children
}) => {
  // Get the translation function at the component level
  const { t } = useTranslation()
  const [hoveredArea, setHoveredArea] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  
  // Animation for hover effects
  const springProps = useSpring({
    scale: (hoveredArea && hoverZoom) ? 1.05 : 1,
    config: { tension: 300, friction: 10 }
  })

  useEffect(() => {
    handleMouseMove(mouseInput)
  }, [mouseInput])

  // Load the image and prepare canvas for alpha detection
  useEffect(() => {
    const img = new Image()
    img.src = mapSrc
    img.onload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        setImageDimensions({ width: img.width, height: img.height })
        setImageLoaded(true)
      }
    }
  }, [mapSrc])

  // Handle mouse movement to check alpha values
  const handleMouseMove = (e) => {
    if (!imageLoaded || !canvasRef.current || !containerRef.current) return
    
    const canvas = canvasRef.current
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    
    setTooltipPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    // Calculate relative position within the image
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width))
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height))
    
    // Get pixel data at mouse position
    const ctx = canvas.getContext('2d')
    const pixel = ctx.getImageData(x, y, 1, 1).data
    
    // Check if pixel is not transparent (alpha > 0)
    const hasAlpha = pixel[3] > 0
    setPosition({ x, y })
    
    // Only trigger hover events when over non-transparent areas
    if (hasAlpha) {
      // Determine which area we're hovering based on pixel color
      // This assumes each area has a distinct color in your PNG
      const areaKey = determineAreaFromPixel(pixel)
      
      if (areaKey && areaKey !== hoveredArea) {
        setHoveredArea(areaKey)
        if (onHover) onHover(areaData[areaKey] || { id: areaKey })
      }
    } else if (hoveredArea) {
      setHoveredArea(null)
      if (onHover) onHover(null)
    }
  }

  // Determine which area we're hovering based on pixel color
  // This uses the hex color code of the pixel to identify the area
  const determineAreaFromPixel = (pixel) => {
    const [r, g, b] = pixel
    
    // Convert RGB to hex color code
    const hexColor = (
      (r < 16 ? '0' : '') + r.toString(16).toUpperCase() + 
      (g < 16 ? '0' : '') + g.toString(16).toUpperCase() + 
      (b < 16 ? '0' : '') + b.toString(16).toUpperCase()
    );
    
    // Use the hex color to look up the area in the translation
    // This allows mapping specific colors to specific organelles
    const areaName = areas[hexColor]
    
    if (areaName) {
      // If we have a translation for this color, return the area name
      return areaName.toLowerCase().replace(/\s+/g, '');
    }
    
    return null;
  }


  const handleMouseLeave = () => {
    if (hoveredArea) {
      setHoveredArea(null)
      if (onHover) onHover(null)
    }
  }
  
  const handleClick = () => {
    if (hoveredArea && onClick) {
      onClick(areaData[hoveredArea] || { id: hoveredArea })
    }
  }

  return (
    <div 
    id={id}
      ref={containerRef}
      style={{ 
        position: 'relative',
        ...style 
      }}
      data-drop-area="true"
      data-area-id={hoveredArea}
      data-enabled={enabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Hidden canvas for alpha detection */}
      <canvas 
        ref={canvasRef}
        style={{ 
          display: showDebug ? 'block' : 'none',
          position: showDebug ? 'absolute' : 'fixed',
          pointerEvents: 'none',
          zIndex: showDebug ? 100 : -1,
          opacity: showDebug ? 0.5 : 0
        }} 
      />
      
      {/* Visible image with hover effects */}
      <animated.div style={{ 
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        transform: springProps.scale.to(s => `scale(${s})`),
        cursor: hoveredArea ? 'pointer' : 'default'
      }} />
      
      {/* Labels for areas */}
      {showLabels && Object.entries(areaData).map(([key, area]) => (
        <div
          id={`${key}-label`}
          key={`${key}-label`}
          style={{
            position: 'static',
            ...(getLabelPosition(key)),
            opacity: hoveredArea === key ? 1 : 0.7,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px',
            pointerEvents: 'none',
            transition: 'opacity 0.2s ease',
            transform: hoveredArea === key ? 'scale(1.1)' : 'scale(1)',
            zIndex: 10
          }}
        >
          {t(area.nameKey, { defaultValue: area.name || key })}
        </div>
      ))}
      
      {/* Tooltip for hovered area */}
      {labelOnHover &&hoveredArea && areaData[hoveredArea] && (
        <div
          id={`${hoveredArea}-tooltip`}
          style={{
            position: 'absolute',
            top: tooltipPosition.y + 20,
            left: tooltipPosition.x + 20,
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '8px 12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 100,
            maxWidth: '250px',
            pointerEvents: 'none'
            
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            {t(areaData[hoveredArea].nameKey, { defaultValue: areaData[hoveredArea].name || hoveredArea })}
          </div>
          {areaData[hoveredArea].description && (
            <div>
              {t(areaData[hoveredArea].descriptionKey, { defaultValue: areaData[hoveredArea].description })}
            </div>
          )}
        </div>
      )}
      
      {/* Debug info */}
      {showDebug && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px',
          fontSize: '12px',
          zIndex: 101
        }}>
          Position: {position.x}, {position.y} | Hovering: {hoveredArea || 'None'}
        </div>
      )}
      {children}
    </div>
  )
  
  // Helper function to position labels
  function getLabelPosition(areaKey) {
    // In a real implementation, you would have predefined positions for each area
    // This is just a placeholder implementation
    
    return labelPositions[areaKey] || { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  }
}

export default DropImageMap

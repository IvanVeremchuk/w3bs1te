import { useEffect, useState } from 'react'
import { useControls as useLevaControls } from 'leva'

// Shared control schema - all components using this will share values
const controlSchema = {
  Lighting: {
    directionalIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
    pointIntensity: { value: 2, min: 0, max: 5, step: 0.1 },
    mouseSensitivity: { value: 0.5, min: 0, max: 2, step: 0.1 },
  },
  Bloom: {
    intensity: { value: 1.2, min: 0, max: 5, step: 0.1 },
    threshold: { value: 0.85, min: 0, max: 1, step: 0.01 },
    smoothing: { value: 0.025, min: 0, max: 0.1, step: 0.001 },
  },
  Model: {
    rotationSpeed: { value: 0.5, min: 0, max: 2, step: 0.1 },
  },
}

// Hook that components can use to access shared Leva controls
// Using the same schema ensures all components share the same control values
export const useControls = () => {
  return useLevaControls(controlSchema)
}

function LevaControls() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Toggle with 'G' key (when not typing in inputs)
      if (e.key.toLowerCase() === 'g' && 
          !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey &&
          e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        setIsVisible(prev => !prev)
        
        // Toggle Leva panel visibility
        const levaRoot = document.querySelector('[data-leva-root]') || 
                         document.querySelector('._leva_1') ||
                         document.querySelector('[class*="leva"]')
        if (levaRoot) {
          levaRoot.style.display = isVisible ? 'none' : 'block'
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isVisible])

  // Initialize controls (first call creates the panel)
  useControls()

  return null
}

export default LevaControls

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from './LevaControls'

function Lighting() {
  const directionalLightRef = useRef()
  const pointLightRef = useRef()
  const { mouse } = useThree()
  const levaControls = useControls()

  useFrame(() => {
    if (!directionalLightRef.current || !pointLightRef.current || !levaControls) return

    const sensitivity = levaControls.Lighting?.mouseSensitivity ?? 0.5
    const directionalIntensity = levaControls.Lighting?.directionalIntensity ?? 1.5
    const pointIntensity = levaControls.Lighting?.pointIntensity ?? 2

    // Update light intensities from Leva
    directionalLightRef.current.intensity = directionalIntensity
    pointLightRef.current.intensity = pointIntensity

    // React to mouse movement for dynamic lighting
    const mouseX = mouse.x * sensitivity
    const mouseY = mouse.y * sensitivity

    // Adjust directional light position based on mouse
    directionalLightRef.current.position.x = mouseX * 5
    directionalLightRef.current.position.y = 3 + mouseY * 2
    directionalLightRef.current.position.z = 5 + mouseX * 2

    // Adjust point light position for rim lighting effect
    pointLightRef.current.position.x = -mouseX * 3
    pointLightRef.current.position.y = 2 + mouseY * 2
    pointLightRef.current.position.z = -5 - mouseX * 3
  })

  return (
    <>
      {/* Main Directional Light */}
      <directionalLight
        ref={directionalLightRef}
        position={[5, 3, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Accent Point Light */}
      <pointLight
        ref={pointLightRef}
        position={[-5, 2, -5]}
        intensity={2}
        distance={20}
        decay={2}
      />

      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />
    </>
  )
}

export default Lighting


import { Canvas, useThree } from '@react-three/fiber'
import { Environment, PerspectiveCamera, OrbitControls, ContactShadows, Float, Grid } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import Model3D from './Model3D'
import { useControls } from './LevaControls'

// Cap pixel ratio to 1.5 for better performance on high-end displays
function SetPixelRatio() {
  const { gl } = useThree()

  useEffect(() => {
    // Cap pixel ratio to maximum of 1.5
    const cappedPixelRatio = Math.min(window.devicePixelRatio, 1.0)
    gl.setPixelRatio(cappedPixelRatio)
  }, [gl])

  return null
}

// Pause rendering when tab is hidden or use demand mode when not auto-rotating
function PauseWhenHidden() {
  const { gl, set } = useThree()

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        gl.setAnimationLoop(null)
      } else {
        // Resume animation loop
        gl.setAnimationLoop((time) => {
          gl.render()
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [gl, set])

  return null
}

function Scene({ canvasRef }) {
  const levaControls = useControls()
  const [isInteracting, setIsInteracting] = useState(false)
  const controlsRef = useRef()

  // Reset camera when section leaves viewport
  useEffect(() => {
    if (!canvasRef?.current || !controlsRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting && controlsRef.current) {
          // Reset camera to initial position
          if (controlsRef.current.reset) {
            controlsRef.current.reset()
          }
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(canvasRef.current)
    return () => observer.disconnect()
  }, [canvasRef])

  return (
    <>
      {/* HDRI Environment for realistic reflections - Reduced resolution */}
      <Environment
        preset="sunset"
        environmentIntensity={1.0}
        background={false}
        resolution={64}
      />

      {/* Glowing grid on XZ plane - Optimized */}
      <Grid
        renderOrder={-1}
        position={[0, -1.8, 0]}
        infiniteGrid
        cellSize={0.5}
        cellThickness={0.3}
        cellColor="#0066ff"
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor="#00aaff"
        fadeDistance={6}
        fadeStrength={1.5}
      />

      {/* 3D Model with floating animation */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.5}
      >
        <Model3D url="/main/Nuclear Reset.gltf" />
      </Float>

      {/* Contact Shadows for grounding - Reduced quality */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.2}
        scale={8}
        blur={1}
        far={3}
        resolution={256}
      />

      {/* Camera Controls - auto-rotate with user interaction */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={!isInteracting}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={12}
        onStart={() => setIsInteracting(true)}
        onEnd={() => {
          setTimeout(() => setIsInteracting(false), 2000)
        }}
      />

      {/* Post-Processing Effects - Optimized */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={levaControls?.Bloom?.intensity ?? 0.8}
          threshold={levaControls?.Bloom?.threshold ?? 0.9}
          smoothing={levaControls?.Bloom?.smoothing ?? 0.05}
          luminanceSmoothing={levaControls?.Bloom?.smoothing ?? 0.05}
          resolutionScale={0.2}
          mipmapBlur={true}
        />
      </EffectComposer>

      {/* Cap pixel ratio to 1.5 */}
      <SetPixelRatio />

      {/* Pause rendering when tab is hidden */}
      <PauseWhenHidden />
    </>
  )
}

function Hero3D() {
  const canvasRef = useRef()

  return (
    <div
      ref={canvasRef}
      className="w-full h-full relative"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      <Canvas
        frameloop="demand"
        gl={{
          antialias: false,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: false,
        }}
        camera={{ position: [0, 0, 7], fov: 50 }}
        performance={{ min: 0.5 }}
        shadows={false}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
        <Scene canvasRef={canvasRef} />
      </Canvas>
    </div>
  )
}

export default Hero3D


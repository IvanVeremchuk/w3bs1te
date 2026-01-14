import { useState, useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'
import Model3D from '../components/Model3D'

// Cap pixel ratio for performance
function SetPixelRatio() {
  const { gl } = useThree()

  useEffect(() => {
    const cappedPixelRatio = Math.min(window.devicePixelRatio, 1.5)
    gl.setPixelRatio(cappedPixelRatio)
  }, [gl])

  return null
}

// Pause rendering when tab is hidden
function PauseWhenHidden() {
  const { gl } = useThree()

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        gl.setAnimationLoop(null)
      } else {
        gl.setAnimationLoop((time) => {
          gl.render()
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [gl])

  return null
}

// ParallaxCard component for dual-input 3D parallax effect
function ParallaxCard({ children }) {
  const groupRef = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })
  const isMobile = useRef(false)
  const maxRotation = 0.35 // ~20 degrees in radians

  // Detect mobile device
  useEffect(() => {
    isMobile.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  }, [])

  // Handle device orientation for mobile
  useEffect(() => {
    if (!isMobile.current) return

    const handleOrientation = async () => {
      // Request permission on iOS 13+
      if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission()
          if (permission !== 'granted') return
        } catch (error) {
          console.warn('Device orientation permission denied:', error)
          return
        }
      }

      const handleDeviceOrientation = (event) => {
        if (!event.beta || !event.gamma) return

        // Map beta (tilt front/back) to X rotation, gamma (tilt left/right) to Y rotation
        // Normalize values: beta is -180 to 180, gamma is -90 to 90
        const betaNormalized = Math.max(-90, Math.min(90, event.beta)) / 90 // -1 to 1
        const gammaNormalized = Math.max(-90, Math.min(90, event.gamma)) / 90 // -1 to 1

        // Apply to target rotation with constraints
        targetRotation.current.x = THREE.MathUtils.clamp(
          betaNormalized * maxRotation,
          -maxRotation,
          maxRotation
        )
        targetRotation.current.y = THREE.MathUtils.clamp(
          gammaNormalized * maxRotation,
          -maxRotation,
          maxRotation
        )
      }

      window.addEventListener('deviceorientation', handleDeviceOrientation)
      return () => window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }

    handleOrientation()
  }, [])

  // Animation loop with lerp smoothing
  useFrame((state) => {
    if (!groupRef.current) return

    // Desktop: use mouse input
    if (!isMobile.current) {
      targetRotation.current.x = THREE.MathUtils.clamp(
        state.mouse.y * maxRotation,
        -maxRotation,
        maxRotation
      )
      targetRotation.current.y = THREE.MathUtils.clamp(
        state.mouse.x * maxRotation,
        -maxRotation,
        maxRotation
      )
    }

    // Lerp to target rotation for smooth movement
    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      0.1
    )
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      0.1
    )

    // Apply rotation to group
    groupRef.current.rotation.x = currentRotation.current.x
    groupRef.current.rotation.y = currentRotation.current.y
  })

  return <group ref={groupRef}>{children}</group>
}

function HeraldicScene({ canvasRef, onImageClick }) {
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
      <Environment
        preset="sunset"
        environmentIntensity={1.0}
        background={false}
        resolution={64}
      />

      <ParallaxCard>
        <Model3D url="/heraldic/Untitled.gltf" />
      </ParallaxCard>

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={!isInteracting}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
        minDistance={3.5}
        maxDistance={10}
        onStart={() => setIsInteracting(true)}
        onEnd={() => {
          setTimeout(() => setIsInteracting(false), 2000)
        }}
      />

      <SetPixelRatio />
      <PauseWhenHidden />
    </>
  )
}

function Heraldic3DViewer({ onImageClick }) {
  const canvasRef = useRef()

  return (
    <div ref={canvasRef} className="w-full h-[70vh] min-h-[500px] relative rounded-xl overflow-hidden shadow-xl bg-[rgba(10,10,10,0.8)]">
      <Canvas
        frameloop="always"
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: "high-performance",
        }}
        dpr={[0.75, 1.25]}
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        performance={{ min: 0.5 }}
        shadows={false}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={50} />
        <Suspense fallback={null}>
          <HeraldicScene canvasRef={canvasRef} onImageClick={onImageClick} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function BusinessCard({ onImageClick }) {
  const [selectedMap, setSelectedMap] = useState('diffuse') // 'diffuse', 'normal', 'orm'

  const mapImages = {
    diffuse: '/heraldic/2.webp',
    normal: '/heraldic/5.webp',
    orm: '/heraldic/1-4-3.webp'
  }

  return (
    <section id="heraldic" className="min-h-screen w-full relative bg-[#0a0a0a] text-white scroll-snap-section py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 w-full">
        {/* Block 1: 3D Model Viewer - Full Width */}
        <section id="model" className="my-8">
          <Suspense fallback={
            <div className="w-full h-[70vh] min-h-[500px] flex items-center justify-center bg-[rgba(10,10,10,0.8)] rounded-xl">
              <div className="text-xl text-gray-400">Loading 3D Model...</div>
            </div>
          }>
            <Heraldic3DViewer onImageClick={onImageClick} />
          </Suspense>
        </section>

        {/* Block 2: Project Title & Overview with Specs Sidebar */}
        <section id="overview" className="my-12 md:my-14 lg:my-16">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl lg:text-[36px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 drop-shadow-md">
                  Heraldic Identity | Real-Time Material Study
                </h1>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-4">
                    A high-fidelity digital translation of traditional luxury print techniques. This project focuses on the intersection of Micro-Surface Relief and Physically Based Rendering (PBR), optimized for seamless web performance.
                  </p>

                  <h2 className="text-xl md:text-2xl lg:text-[24px] text-blue-400 font-bold font-['Oswald'] mt-8 mb-4">
                    Technical Breakdown
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg md:text-xl text-blue-300 font-semibold mb-2">
                        Surface Mastery (The Paper)
                      </h3>
                      <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                        Utilizes a high-frequency Roughness Map to simulate premium 300gsm matte cardstock, creating a distinct light absorption contrast against the reflective foil elements.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl text-blue-300 font-semibold mb-2">
                        Tactile Relief (The Heraldry)
                      </h3>
                      <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                        The central heraldic icon features custom Normal Mapping to simulate a physical "Debossed" effect, providing convincing depth and shadow-play without increasing geometric complexity.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl text-blue-300 font-semibold mb-2">
                        Metallurgical Accuracy (The Foil)
                      </h3>
                      <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                        Engineered with a specific Metallic/Roughness workflow to replicate 24k gold leaf. The "Gilded Edges" (Perimeter) utilize mirrored UV coordinates to ensure a continuous metallic sheen across the card's thickness.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl text-blue-300 font-semibold mb-2">
                        Performance Optimization
                      </h3>
                      <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                        The entire asset is powered by a single 2K Texture Atlas and a low-poly mesh (76 triangles), achieving AAA-quality visuals while maintaining a 60FPS refresh rate on mobile and desktop browsers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-[rgba(30,30,30,0.6)] rounded-xl p-6 border border-white/5 sticky top-24">
                  <h3 className="text-xl text-blue-400 font-bold font-['Oswald'] mb-4">
                    Specs
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-blue-300 font-semibold text-sm mb-1">Format</dt>
                      <dd className="text-gray-400 text-sm">WebGL / Three.js</dd>
                    </div>
                    <div>
                      <dt className="text-blue-300 font-semibold text-sm mb-1">Geometry</dt>
                      <dd className="text-gray-400 text-sm">124 Triangles</dd>
                    </div>
                    <div>
                      <dt className="text-blue-300 font-semibold text-sm mb-1">Textures</dt>
                      <dd className="text-gray-400 text-sm">4x 2048px (Diffuse, Normal, ORM)</dd>
                    </div>
                    <div>
                      <dt className="text-blue-300 font-semibold text-sm mb-1">Workflow</dt>
                      <dd className="text-gray-400 text-sm">SubD to Low-Poly Baking</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 3: View Maps Section */}
        <section id="maps" className="my-12 md:my-14 lg:my-16">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl lg:text-[30px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 text-center drop-shadow-md">
              View Maps
            </h2>

            {/* Toggle Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedMap('diffuse')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedMap === 'diffuse'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-[rgba(30,30,30,0.6)] text-gray-300 hover:bg-[rgba(40,40,40,0.8)] hover:text-white'
                }`}
              >
                Diffuse
              </button>
              <button
                onClick={() => setSelectedMap('normal')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedMap === 'normal'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-[rgba(30,30,30,0.6)] text-gray-300 hover:bg-[rgba(40,40,40,0.8)] hover:text-white'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setSelectedMap('orm')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedMap === 'orm'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-[rgba(30,30,30,0.6)] text-gray-300 hover:bg-[rgba(40,40,40,0.8)] hover:text-white'
                }`}
              >
                ORM
              </button>
            </div>

            {/* Map Image Display */}
            <div className="text-center">
              <div
                className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => onImageClick(mapImages[selectedMap])}
              >
                <img
                  src={mapImages[selectedMap]}
                  alt={`${selectedMap.charAt(0).toUpperCase() + selectedMap.slice(1)} Map`}
                  className="w-full h-auto block"
                />
              </div>
              <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                {selectedMap.charAt(0).toUpperCase() + selectedMap.slice(1)} Map
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default BusinessCard

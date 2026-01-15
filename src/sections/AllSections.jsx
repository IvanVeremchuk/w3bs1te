import { useState, useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera, OrbitControls, ContactShadows, Float, Grid } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Suspense } from 'react'
import Model3D from '../components/Model3D'
import { useControls } from '../components/LevaControls'
import useVideoIntersectionObserver from '../hooks/useVideoIntersectionObserver'

// ===== SHARED HELPER COMPONENTS =====

// Cap pixel ratio for performance
function SetPixelRatio() {
  const { gl } = useThree()

  useEffect(() => {
    const cappedPixelRatio = Math.min(window.devicePixelRatio, 1.0)
    gl.setPixelRatio(cappedPixelRatio)
  }, [gl])

  return null
}

// Pause rendering when tab is hidden
function PauseWhenHidden() {
  const { gl, set } = useThree()

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
  }, [gl, set])

  return null
}

function useInView(targetRef, rootMargin = '200px') {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!targetRef?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin, threshold: 0.1 }
    )

    observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [targetRef, rootMargin])

  return isInView
}

// ParallaxCard component for dual-input 3D parallax effect
function ParallaxCard({ children }) {
  const groupRef = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })
  const isMobile = useRef(false)
  const maxRotation = 0.5 // Stronger tilt range for mobile
  const gyroMultiplier = 1.6
  const mouseMultiplier = 1.2
  const springBackStrength = 0.08
  const flatReturnStrength = 0.02
  const flatThreshold = 0.03
  const depthShift = 0.15
  const hasPermission = useRef(false)
  const hasListener = useRef(false)
  const orientationHandlerRef = useRef(null)

  // Detect mobile device
  useEffect(() => {
    isMobile.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  }, [])

  const setupOrientationListener = () => {
    if (hasListener.current) return

    const handleDeviceOrientation = (event) => {
      if (event.beta == null || event.gamma == null) return

      const betaNormalized = Math.max(-90, Math.min(90, event.beta)) / 90
      const gammaNormalized = Math.max(-90, Math.min(90, event.gamma)) / 90

      targetRotation.current.x = THREE.MathUtils.clamp(
        betaNormalized * maxRotation * gyroMultiplier,
        -maxRotation,
        maxRotation
      )
      targetRotation.current.y = THREE.MathUtils.clamp(
        gammaNormalized * maxRotation * gyroMultiplier,
        -maxRotation,
        maxRotation
      )
    }

    orientationHandlerRef.current = handleDeviceOrientation
    window.addEventListener('deviceorientation', handleDeviceOrientation)
    hasListener.current = true
  }

  const requestOrientationPermission = async () => {
    if (!isMobile.current || hasPermission.current) return

    if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission()
        if (permission !== 'granted') return
        hasPermission.current = true
      } catch (error) {
        console.warn('Device orientation permission denied:', error)
        return
      }
    } else {
      hasPermission.current = true
    }

    setupOrientationListener()
  }

  // Handle device orientation for mobile (non-iOS permission flow)
  useEffect(() => {
    if (!isMobile.current) return

    if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
      return () => {
        if (orientationHandlerRef.current) {
          window.removeEventListener('deviceorientation', orientationHandlerRef.current)
        }
      }
    }

    setupOrientationListener()

    return () => {
      if (orientationHandlerRef.current) {
        window.removeEventListener('deviceorientation', orientationHandlerRef.current)
      }
    }
  }, [])

  // Animation loop with lerp smoothing
  useFrame((state) => {
    if (!groupRef.current) return

    // Desktop: use mouse input
    if (!isMobile.current) {
      targetRotation.current.x = THREE.MathUtils.clamp(
        state.mouse.y * maxRotation * mouseMultiplier,
        -maxRotation,
        maxRotation
      )
      targetRotation.current.y = THREE.MathUtils.clamp(
        state.mouse.x * maxRotation * mouseMultiplier,
        -maxRotation,
        maxRotation
      )
    }

    const isFlat =
      isMobile.current &&
      Math.abs(targetRotation.current.x) < flatThreshold &&
      Math.abs(targetRotation.current.y) < flatThreshold

    if (isFlat) {
      targetRotation.current.x = THREE.MathUtils.lerp(
        targetRotation.current.x,
        0,
        flatReturnStrength
      )
      targetRotation.current.y = THREE.MathUtils.lerp(
        targetRotation.current.y,
        0,
        flatReturnStrength
      )
    }

    const shouldSpringBack =
      isFlat ||
      (Math.abs(targetRotation.current.x) < 0.02 &&
        Math.abs(targetRotation.current.y) < 0.02)

    const lerpStrength = shouldSpringBack ? springBackStrength : 0.1

    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      shouldSpringBack ? 0 : targetRotation.current.x,
      lerpStrength
    )
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      shouldSpringBack ? 0 : targetRotation.current.y,
      lerpStrength
    )

    // Apply rotation to group
    groupRef.current.rotation.x = currentRotation.current.x
    groupRef.current.rotation.y = currentRotation.current.y
    groupRef.current.position.x = currentRotation.current.y * 0.6
    groupRef.current.position.y = -currentRotation.current.x * 0.6
    groupRef.current.position.z = -depthShift * (
      Math.abs(currentRotation.current.x) +
      Math.abs(currentRotation.current.y)
    )
  })

  return (
    <group
      ref={groupRef}
      onPointerDown={requestOrientationPermission}
      onTouchStart={requestOrientationPermission}
    >
      {children}
    </group>
  )
}

// ===== BUSINESS CARD SECTION =====

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
  const isInView = useInView(canvasRef)

  return (
    <div ref={canvasRef} className="w-full h-[70vh] min-h-[500px] relative rounded-xl overflow-hidden shadow-xl bg-[rgba(10,10,10,0.8)]">
      {isInView ? (
        <Canvas
          frameloop="always"
          gl={{
            antialias: true,
            alpha: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          performance={{ min: 0.5 }}
          shadows={false}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={50} />
          <Suspense fallback={null}>
            <HeraldicScene canvasRef={canvasRef} onImageClick={onImageClick} />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  )
}

function BusinessCard({ onImageClick }) {
  const [selectedMap, setSelectedMap] = useState('diffuse') // 'diffuse', 'normal', 'orm'
  const [isOverviewOpen, setIsOverviewOpen] = useState(false)

  const mapImages = {
    diffuse: '/heraldic/2.webp',
    normal: '/heraldic/5.webp',
    orm: '/heraldic/1-4-3.webp'
  }

  return (
    <section id="heraldic" className="min-h-screen w-full relative bg-[#0a0a0a] text-white scroll-snap-section py-8 md:py-16">
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
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOverviewOpen ? 'max-h-[2000px]' : 'max-h-72'
              }`}
            >
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
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setIsOverviewOpen((prev) => !prev)}
                className="px-5 py-2 text-sm font-semibold rounded-full bg-[rgba(30,30,30,0.6)] text-gray-200 hover:bg-[rgba(45,45,45,0.8)] transition-colors"
              >
                {isOverviewOpen ? 'Show less' : 'Read more'}
              </button>
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

// ===== KITCHEN SECTION =====

function KitchenScene({ canvasRef }) {
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

function KitchenHero3D() {
  const canvasRef = useRef()
  const isInView = useInView(canvasRef)

  return (
    <div
      ref={canvasRef}
      className="w-full h-full relative"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      {isInView ? (
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
          <KitchenScene canvasRef={canvasRef} />
        </Canvas>
      ) : null}
    </div>
  )
}

function Kitchen() {
  return (
    <section id="kitchen" className="min-h-screen w-full bg-[#0a0a0a] text-white scroll-snap-section">
      <div className="w-full relative flex items-center justify-center px-5 md:px-8 lg:px-16 py-8 md:py-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-[36px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 drop-shadow-md">
                  The Optimized Aperture | High-to-Low Poly Workflow
                </h2>
                <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 md:mb-0">
                  A detailed study of natural lighting, material interaction, and environmental storytelling through architectural visualization.
                </p>
              </div>
              <div className="bg-[rgba(30,30,30,0.6)] rounded-xl p-6 border border-white/5">
                <h3 className="text-xl text-blue-400 font-bold font-['Oswald'] mb-4">
                  Technical Specs
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-blue-300 font-semibold text-sm mb-1">Polycount</dt>
                    <dd className="text-gray-400 text-sm">18.3k Tris (Reduced from 800k)</dd>
                  </div>
                  <div>
                    <dt className="text-blue-300 font-semibold text-sm mb-1">Baking</dt>
                    <dd className="text-gray-400 text-sm">Blender (4K Normal Map downscaled to 1K)</dd>
                  </div>
                  <div>
                    <dt className="text-blue-300 font-semibold text-sm mb-1">Optimization</dt>
                    <dd className="text-gray-400 text-sm">Custom LODs for mobile browsers</dd>
                  </div>
                  <div>
                    <dt className="text-blue-300 font-semibold text-sm mb-1">Textures</dt>
                    <dd className="text-gray-400 text-sm">PBR Metallic/Roughness workflow (WebP compressed)</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="w-full h-[70vh] min-h-[500px] relative rounded-xl overflow-hidden shadow-xl bg-[rgba(10,10,10,0.8)]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-xl text-gray-400">Loading 3D Model...</div>
              </div>
            }>
              <KitchenHero3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== TESLA SECTION =====

function Tesla({ onImageClick }) {
  const [posterOpacity, setPosterOpacity] = useState(1)
  const posterRef = useRef(null)
  const turntableWrapperRef = useRef(null)
  const turntableIframeRef = useRef(null)
  const drivingWrapperRef = useRef(null)
  const drivingIframeRef = useRef(null)

  useVideoIntersectionObserver({
    targetRef: turntableWrapperRef,
    iframeRef: turntableIframeRef,
  })
  useVideoIntersectionObserver({
    targetRef: drivingWrapperRef,
    iframeRef: drivingIframeRef,
  })

  useEffect(() => {
    // Hide poster when Vimeo iframe loads
    const timer = setTimeout(() => {
      setPosterOpacity(0)
      setTimeout(() => {
        if (posterRef.current) {
          posterRef.current.style.display = 'none'
        }
      }, 500)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="product" className="min-h-screen w-full bg-[#0a0a0a] text-white scroll-snap-section py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16">
        {/* Block 1: 360 Turntable */}
        <section id="turntable" className="my-8">
          <div
            ref={turntableWrapperRef}
            className="relative rounded-xl overflow-hidden shadow-xl"
            style={{ paddingBottom: '100%' }}
          >
            <img
              ref={posterRef}
              src="/images/tesla_hero.jpg"
              alt="360° Turntable Preview"
              className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none z-[1]"
              style={{ opacity: posterOpacity }}
            />
            <iframe
              ref={turntableIframeRef}
              src="https://player.vimeo.com/video/1147930210?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&loop=1&muted=1&background=1&dnt=1&playsinline=1&quality=720p"
              className="absolute top-0 left-0 w-full h-full z-[2]"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Turntable"
              loading="eager"
              allowFullScreen
            />
          </div>
        </section>

        {/* Block 2: Project Details */}
        <section id="overview" className="my-12 md:my-14 lg:my-16">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl lg:text-[30px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 text-center drop-shadow-md">
              Project Overview
            </h2>
            <p className="text-blue-400 font-semibold text-base lg:text-lg mb-3 lg:mb-4">
              Role: Technical Artist (Rigging, Shading, Lighting, Animation)
            </p>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
              A technical study focused on automotive animation pipelines. I developed a custom rig for this asset to handle steering, suspension, and wheel rotation.
            </p>
          </div>
        </section>

        <div className="relative">
          <div className="flex md:block gap-6 md:gap-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-smooth scrollbar-hide px-3 md:px-0">
            {/* Block 3: Technical Proof */}
            <section id="technical" className="my-12 md:my-14 lg:my-16 w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-start">
              <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
                <div className="text-center">
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    onClick={() => onImageClick('/images/tesla_technical.jpg')}
                  >
                    <img
                      src="/images/tesla_technical.jpg"
                      alt="Clay/Wireframe Render - Technical Breakdown"
                      className="w-full h-auto block"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Clay/Wireframe Render - Technical Breakdown
                  </p>
                </div>
              </div>
            </section>

            {/* Block 4: Optional Render - Wet Road Environment */}
            <section id="wet-road" className="my-12 md:my-14 lg:my-16 w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-start">
              <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
                <div className="text-center">
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    onClick={() => onImageClick('/images/tesla_hero_wet_road.jpg')}
                  >
                    <img
                      src="/images/tesla_hero_wet_road.jpg"
                      alt="Wet Road Environment - Optional Render"
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Wet Road Environment - Optional Render
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[rgba(10,10,10,0.9)] to-transparent md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[rgba(10,10,10,0.9)] to-transparent md:hidden" />
        </div>

        {/* Block 5: Vertical Driving Video */}
        <section id="driving" className="my-12 md:my-14 lg:my-16">
          <div className="w-full max-w-[550px] lg:max-w-[600px] mx-auto">
            <div
              ref={drivingWrapperRef}
              className="relative rounded-xl overflow-hidden shadow-xl"
              style={{ paddingBottom: '177.78%' }}
            >
              <iframe
                ref={drivingIframeRef}
                src="https://player.vimeo.com/video/1147960015?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&loop=1&muted=1&background=1&dnt=1&playsinline=1&quality=720p"
                className="absolute top-0 left-0 w-full h-full z-[1]"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Automotive Physics & Environment Study"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <p className="text-center mt-4 lg:mt-5 text-sm lg:text-base text-gray-400 leading-relaxed max-w-[500px] lg:max-w-[550px] mx-auto">
              Automotive Physics & Environment Study: Testing suspension rigging, wheel-ground contact, and motion-blur integration in a dynamic environment.
            </p>
          </div>
        </section>
      </div>
    </section>
  )
}

// ===== CONSTRUCTION SECTION =====

function Construction({ onImageClick }) {
  return (
    <section id="work" className="min-h-screen w-full bg-[#0a0a0a] text-white scroll-snap-section py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16">
        {/* Construction Section */}
        <section id="construction" className="my-12 md:my-14 lg:my-16">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl lg:text-[30px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 text-center drop-shadow-md">
              Construction
            </h2>
            <div className="relative">
              <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-smooth scrollbar-hide px-3 md:px-0">
                <div className="text-center">
                  <div
                    className="relative w-[85vw] sm:w-[70vw] md:w-full snap-start shrink-0 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    style={{ paddingBottom: '75%' }}
                    onClick={() => onImageClick('/images/IMG_20250220_085702286_HDR.webp')}
                  >
                    <img
                      src="/images/IMG_20250220_085702286_HDR.webp"
                      alt="Exposed steel beam supporting original timber joists"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      decoding="async"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Exposed steel beam supporting original timber joists after partial floor removal.
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="relative w-[85vw] sm:w-[70vw] md:w-full snap-start shrink-0 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    style={{ paddingBottom: '75%' }}
                    onClick={() => onImageClick('/images/IMG_20250219_103925097_HDR.webp')}
                  >
                    <img
                      src="/images/IMG_20250219_103925097_HDR.webp"
                      alt="Traditional rafter roof system"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Traditional rafter roof system with collar ties and metal gusset connections.
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="relative w-[85vw] sm:w-[70vw] md:w-full snap-start shrink-0 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    style={{ paddingBottom: '75%' }}
                    onClick={() => onImageClick('/images/IMG_20250204_161447576_HDR.webp')}
                  >
                    <img
                      src="/images/IMG_20250204_161447576_HDR.webp"
                      alt="Exposed masonry wall"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Exposed masonry wall showing layered plaster failure and long-term material decay.
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="relative w-[85vw] sm:w-[70vw] md:w-full snap-start shrink-0 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    style={{ paddingBottom: '75%' }}
                    onClick={() => onImageClick('/images/IMG_20250131_130444773_HDR.webp')}
                  >
                    <img
                      src="/images/IMG_20250131_130444773_HDR.webp"
                      alt="Interior service corridor"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Interior service corridor with raw stone, timber framing, and exposed electrical runs.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[rgba(10,10,10,0.9)] to-transparent md:hidden" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[rgba(10,10,10,0.9)] to-transparent md:hidden" />
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

// ===== CHARACTER SECTION =====

function Character({ onImageClick }) {
  const [posterOpacity, setPosterOpacity] = useState(1)
  const posterRef = useRef(null)
  const turntableWrapperRef = useRef(null)
  const turntableIframeRef = useRef(null)

  useVideoIntersectionObserver({
    targetRef: turntableWrapperRef,
    iframeRef: turntableIframeRef,
  })

  useEffect(() => {
    // Hide poster when Vimeo iframe loads
    const timer = setTimeout(() => {
      setPosterOpacity(0)
      setTimeout(() => {
        if (posterRef.current) {
          posterRef.current.style.display = 'none'
        }
      }, 500)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="game-art" className="min-h-screen w-full bg-[#0a0a0a] text-white scroll-snap-section py-8 md:py-16">
      {/* Block 1: 360 Turntable - Wider container */}
      <section id="turntable" className="my-8">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
          <div
            ref={turntableWrapperRef}
            className="relative rounded-xl overflow-hidden shadow-xl"
            style={{ paddingBottom: '100%' }}
          >
            <img
              ref={posterRef}
              src="/images/The-Details.jpg"
              alt="360° Turntable Preview"
              className="absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-500 pointer-events-none z-[1]"
              style={{ opacity: posterOpacity }}
            />
            <div className="absolute top-0 left-0 w-full h-full z-[2] overflow-hidden">
              <iframe
                ref={turntableIframeRef}
                src="https://player.vimeo.com/video/1153730375?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&loop=1&muted=1&background=1&dnt=1&playsinline=1&quality=720p"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Turntable"
                loading="eager"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16">
        {/* Block 2: Wireframe */}
        <section id="technical" className="my-12 md:my-14 lg:my-16">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl lg:text-[30px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 text-center drop-shadow-md">
              Wireframe
            </h2>
            <div className="space-y-8 md:space-y-10">
              {/* Wireframe - Full Width */}
              <div className="text-center">
                <div
                  className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                  onClick={() => onImageClick('/images/Wireframe.webp')}
                >
                  <img
                    src="/images/Wireframe.webp"
                    alt="Wireframe Topology"
                    className="w-full h-auto block"
                  />
                </div>
                <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                  Clean Quad Topology for Deformation.
                </p>
              </div>

              {/* Albedo & Roughness - Side by Side */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
                <div className="text-center">
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    onClick={() => onImageClick('/images/Texture-Map-D.webp')}
                  >
                    <img
                      src="/images/Texture-Map-D.webp"
                      alt="Albedo Map & UV Layout"
                      className="w-full h-auto block"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Albedo Map & UV Layout
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    onClick={() => onImageClick('/images/Texture-Map-R.webp')}
                  >
                    <img
                      src="/images/Texture-Map-R.webp"
                      alt="Roughness Map"
                      className="w-full h-auto block"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Roughness Map
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 3: The Details */}
        <section id="details" className="my-12 md:my-14 lg:my-16">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <div className="text-center">
              <div
                className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => onImageClick('/images/The-Details.jpg')}
              >
                {/* Mobile: Vertical image */}
                <img
                  src="/images/The-Details.jpg"
                  alt="Detail Close-ups - Texture Quality"
                  className="w-full h-auto block md:hidden"
                />
                {/* Desktop: Horizontal image */}
                <img
                  src="/images/The-Details.jpg"
                  alt="Detail Close-ups - Texture Quality"
                  className="w-full h-auto hidden md:block"
                />
              </div>
              <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed text-center">
                Detail Close-ups - Texture Quality
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

// ===== RENDERS SECTION =====

// Portfolio render images - using images from your existing portfolio
const renders = [
  { id: 1, src: '/images/The-Beige-Living-Room-1.jpg', title: 'The Beige Living Room' },
  { id: 2, src: '/images/The-Art-Room-2.jpg', title: 'The Art Room' },
  { id: 3, src: '/images/The-Dark-Living-Room-3.jpg', title: 'The Dark Living Room' },
  { id: 4, src: '/images/The-Kitchen-Top-Down-View-4.jpg', title: 'The Kitchen Top Down View' },
  { id: 5, src: '/images/The-Beige-Room-with-Steps-5.jpg', title: 'The Beige Room with Steps' },
  { id: 6, src: '/images/The-Dark-Dining-Room-6.jpg', title: 'The Dark Dining Room' },
]

function Renders({ onImageClick }) {
  return (
    <section id="renders" className="min-h-screen md:min-h-0 w-full bg-[#0a0a0a] text-white scroll-snap-section py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-blue-400 font-['Oswald']">
          Portfolio Renders
        </h2>

        <div className="relative">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-smooth scrollbar-hide px-3 md:px-0">
            {renders.map((render, index) => (
              <div
                key={render.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3] bg-gray-900 w-[85vw] sm:w-[70vw] md:w-full snap-start shrink-0"
                onClick={() => onImageClick(render.src)}
              >
                <img
                  src={render.src}
                  alt={render.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  {...(index > 0 ? { loading: 'lazy' } : {})}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white font-semibold text-lg">{render.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[rgba(10,10,10,0.9)] to-transparent md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[rgba(10,10,10,0.9)] to-transparent md:hidden" />
        </div>
      </div>
    </section>
  )
}

// ===== MAIN ALL SECTIONS COMPONENT =====

function AllSections({ onImageClick }) {
  return (
    <>
      <BusinessCard onImageClick={onImageClick} />
      <Kitchen />
      <Tesla onImageClick={onImageClick} />
      <Construction onImageClick={onImageClick} />
      <Character onImageClick={onImageClick} />
      <Renders onImageClick={onImageClick} />
    </>
  )
}

export default AllSections

import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera, OrbitControls, ContactShadows, Float, Grid } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import Model3D from './Model3D'
import { useControls } from './LevaControls'

function Scene() {
  const levaControls = useControls()

  return (
    <>
      {/* HDRI Environment for realistic reflections */}
      <Environment
        preset="city"
        environmentIntensity={1.2}
        background={false}
      />

      {/* Glowing grid on XZ plane */}
      <Grid
        renderOrder={-1}
        position={[0, -1.8, 0]}
        infiniteGrid
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#0066ff"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#00aaff"
        fadeDistance={15}
        fadeStrength={1}
      />

      {/* 3D Model with floating animation */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.5}
      >
        <Model3D url="/Nuclear Reset.gltf" />
      </Float>

      {/* Contact Shadows for grounding */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      />

      {/* Camera Controls - auto-rotate with user interaction */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
        minDistance={3.2}
        maxDistance={8}
      />

      {/* Post-Processing Effects */}
      <EffectComposer>
        <Bloom
          intensity={levaControls?.Bloom?.intensity ?? 1.2}
          threshold={levaControls?.Bloom?.threshold ?? 0.85}
          smoothing={levaControls?.Bloom?.smoothing ?? 0.025}
          luminanceSmoothing={levaControls?.Bloom?.smoothing ?? 0.025}
        />
      </EffectComposer>
    </>
  )
}

function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 50 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />
        <Scene />
      </Canvas>
    </div>
  )
}

export default Hero3D


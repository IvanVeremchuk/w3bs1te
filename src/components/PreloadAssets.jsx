import { useGLTF } from '@react-three/drei'

// Preload all 3D models - call preload at module level
if (typeof window !== 'undefined') {
  useGLTF.preload('/main/Nuclear Reset.gltf')
  useGLTF.preload('/heraldic/Untitled.gltf')
}

// Component wrapper (preload happens at import time)
function PreloadAssets() {
  return null
}

export default PreloadAssets

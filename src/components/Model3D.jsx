import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Model3D({ url }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef()

  // Clone the scene to avoid modifying the original
  const clonedScene = scene.clone()

  // Traverse and update materials to PBR materials
  clonedScene.traverse((child) => {
    if (child.isMesh) {
      // Use MeshPhysicalMaterial for better PBR rendering
      if (child.material) {
        const originalMaterial = child.material

        // Fix texture flipY for Blender UV export compatibility
        const textureMaps = [
          originalMaterial.map,
          originalMaterial.normalMap,
          originalMaterial.roughnessMap,
          originalMaterial.metalnessMap,
          originalMaterial.emissiveMap,
          originalMaterial.aoMap
        ]
        
        textureMaps.forEach(texture => {
          if (texture) {
            texture.flipY = false
          }
        })

        // Create new physical material preserving textures
        const newMaterial = new THREE.MeshPhysicalMaterial({
          map: originalMaterial.map,
          normalMap: originalMaterial.normalMap,
          roughnessMap: originalMaterial.roughnessMap,
          metalnessMap: originalMaterial.metalnessMap,
          emissiveMap: originalMaterial.emissiveMap,
          aoMap: originalMaterial.aoMap,
          
          // PBR properties
          metalness: originalMaterial.metalness !== undefined ? originalMaterial.metalness : 0.1,
          roughness: originalMaterial.roughness !== undefined ? originalMaterial.roughness : 0.5,
          emissive: originalMaterial.emissive || new THREE.Color(0x000000),
          emissiveIntensity: originalMaterial.emissiveIntensity || 1,
          
          // Physical material properties
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
          transmission: 0,
          thickness: 0.5,
        })

        // Alpha/transparency fixes for materials with textures
        if (originalMaterial.map) {
          newMaterial.transparent = true
          newMaterial.alphaTest = 0.5
          newMaterial.side = THREE.DoubleSide
        }

        child.material = newMaterial
        child.castShadow = true
        child.receiveShadow = true
      }
    }
  })

  return <primitive ref={modelRef} object={clonedScene} scale={1} position={[0, 0, 0]} />
}

export default Model3D


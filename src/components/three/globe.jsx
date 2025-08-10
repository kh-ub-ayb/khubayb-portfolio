import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { TextureLoader } from 'three'

function Earth() {
  const meshRef = useRef(null)
  const colorMap = useLoader(TextureLoader, '/assets/3d/texture_earth.jpg')
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshStandardMaterial map={colorMap} roughness={0.9} metalness={0.05} />
    </mesh>
  )
}

export default function GlobeCanvas() {
  return (
    <div className="h-[320px] w-full md:h-[420px]">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
        <color attach="background" args={["#0b0c10"]} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Earth />
          <Environment preset="studio" />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}



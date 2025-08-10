import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Environment, ContactShadows } from '@react-three/drei'

function Desk() {
  return (
    <group>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.12, 2]} />
        <meshStandardMaterial color="#2a2d39" metalness={0.1} roughness={0.9} />
      </mesh>
      {[-1.9, 1.9].map((x) =>
        [-0.9, 0.9].map((z, i) => (
          <mesh key={x + ':' + z + ':' + i} position={[x, 0.3, z]} castShadow receiveShadow>
            <boxGeometry args={[0.12, 0.6, 0.12]} />
            <meshStandardMaterial color="#1e2029" roughness={0.8} />
          </mesh>
        ))
      )}
      <mesh position={[-1.4, 0.91, -0.4]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.4]} />
        <meshStandardMaterial color="#171820" />
      </mesh>
      <group position={[0.2, 1.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.3, 0.75, 0.06]} />
          <meshStandardMaterial color="#0f1117" />
        </mesh>
        <mesh position={[0, 0.01, -0.035]}>
          <boxGeometry args={[1.24, 0.69, 0.01]} />
          <meshStandardMaterial color="#101317" emissive="#12a0ff" emissiveIntensity={0.05} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.14, 0.4, 0.12]} />
          <meshStandardMaterial color="#0f1117" />
        </mesh>
      </group>
      <mesh position={[0.3, 0.67, 0.35]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.35]} />
        <meshStandardMaterial color="#0d0f15" emissive="#a855f7" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[1.1, 0.69, 0.2]} castShadow>
        <boxGeometry args={[0.22, 0.04, 0.14]} />
        <meshStandardMaterial color="#101317" emissive="#f43f5e" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[-0.6, 0.86, 0.4]} castShadow>
        <boxGeometry args={[0.06, 0.5, 0.06]} />
        <meshStandardMaterial color="#13151c" />
      </mesh>
    </group>
  )
}

function Chair() {
  const group = useRef(null)
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.2
  })
  return (
    <group ref={group} position={[1.5, 0.45, -0.4]}>
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
        <meshStandardMaterial color="#141720" />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#0e1017" />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.8, 0.12, 0.8]} />
        <meshStandardMaterial color="#0f1420" />
      </mesh>
      <mesh position={[0, 0.95, -0.32]} rotation={[Math.PI * 0.05, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.9, 0.12]} />
        <meshStandardMaterial color="#131a28" />
      </mesh>
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, 0.7, 0]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.8]} />
          <meshStandardMaterial color="#0f1117" />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ autoRotate = false }) {
  const rig = useRef(null)
  useFrame((_, dt) => {
    if (autoRotate && rig.current) rig.current.rotation.y += dt * 0.2
  })
  return (
    <group ref={rig} position={[0, 0, 0]}>
      <Desk />
      <Chair />
      <ContactShadows position={[0, 0, 0]} opacity={0.35} blur={1.8} scale={8} />
    </group>
  )
}

export function GamingSetupCanvas({ className = '', autoRotate = true }) {
  return (
    <div className={["w-full h-full", className].join(' ')}>
      <Canvas shadows camera={{ position: [4.5, 3, 6], fov: 50 }}>
        <color attach="background" args={["#0b0c10"]} />
        <hemisphereLight args={["#ffffff", "#0b0c10", 0.25]} />
        <spotLight position={[8, 12, 10]} angle={0.3} penumbra={0.5} intensity={1.2} castShadow />
        <Suspense fallback={<Html center className="text-xs text-white/60">Loading 3D…</Html>}>
          <Scene autoRotate={autoRotate} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={4} maxDistance={9} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  )
}



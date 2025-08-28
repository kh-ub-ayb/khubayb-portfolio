import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, Environment, Html, OrbitControls, useGLTF, ContactShadows, Bounds } from '@react-three/drei'
import { ErrorBoundary } from 'react-error-boundary'

function GLTFModel({ src, scale = 1 }) {
  const { scene } = useGLTF(src)
  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  )
}

export default function ModelCanvas({
  src,
  className = '',
  scale = 1,
  autoRotate = true,
  rotateSpeed = 0.8,
  cameraPosition,
  initialZoomSteps,
  initialZoomOutFactor,
  fit,
  boundsMargin,
}) {
  const controlsRef = useRef(null)

  useEffect(() => {
    const ctrl = controlsRef.current
    if (!ctrl) return

    let factor = 1
    if (initialZoomSteps && initialZoomSteps > 0) {
      const perStep = 0.95
      factor *= Math.pow(perStep, initialZoomSteps)
    }
    if (initialZoomOutFactor && initialZoomOutFactor > 1) {
      factor *= initialZoomOutFactor
    }
    if (factor > 1.0001 && typeof ctrl.dollyOut === 'function') {
      ctrl.dollyOut(factor)
      if (typeof ctrl.update === 'function') ctrl.update()
    }
  }, [initialZoomSteps, initialZoomOutFactor])

  return (
    <ErrorBoundary fallback={<div className="text-red-500">Error rendering 3D model</div>}>
      <div className={['w-full h-full', className].join(' ')}>
        <Canvas camera={{ position: cameraPosition ?? [4.5, 3, 6], fov: 50 }} shadows>
          <color attach="background" args={["#0b0c10"]} />
          <hemisphereLight args={["#ffffff", "#0b0c10", 0.3]} />
          <spotLight position={[8, 12, 10]} angle={0.3} penumbra={0.5} intensity={1.1} castShadow />
          <Suspense fallback={
            <Html center>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="spinner" style={{
                  width: 48,
                  height: 48,
                  border: '5px solid #f3f3f3',
                  borderTop: '5px solid #ff4ecd',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: 12
                }} />
                <span style={{
                  fontWeight: 700,
                  fontSize: 18,
                  background: 'linear-gradient(90deg, #ff4ecd, #ff6aee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: 1
                }}>Loading</span>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            </Html>
          }>
            {fit ? (
              <Bounds fit clip margin={boundsMargin ?? 1.4}>
                <GLTFModel src={src} scale={scale} />
              </Bounds>
            ) : (
              <GLTFModel src={src} scale={scale} />
            )}
            <ContactShadows position={[0, -0.2, 0]} opacity={0.35} blur={1.8} scale={10} />
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={rotateSpeed}
            maxPolarAngle={Math.PI / 2.05}
          />
        </Canvas>
      </div>
    </ErrorBoundary>
  )
}

useGLTF.preload('/assets/3d/desk.glb')
useGLTF.preload('/assets/3d/hacker-room.glb')
useGLTF.preload('/assets/3d/coder.compressed.glb')
useGLTF.preload('/assets/3d/globe.compressed.glb')



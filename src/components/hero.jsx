import React, { lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ModelCanvas = lazy(() => import('@/components/three/model-canvas.jsx'))

export default function Hero() {
  const onContactClick = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
        >
          <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">
            Coding Dreams
          </span>
          <span className="block bg-gradient-to-r from-rose-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
            Into Reality
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-lg text-white/70"
        >
          Think, Code, Create, Repeat...
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContactClick}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-black px-6 py-3 font-medium"
          style={{
            boxShadow:
              '0 0 10px rgba(168,85,247,0.6), 0 0 30px rgba(244,63,94,0.45), inset 0 0 10px rgba(244,63,94,0.25)',
          }}
        >
          <span
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/30 via-violet-500/25 to-rose-500/30 blur-md"
            aria-hidden="true"
          />
          <span className="relative flex items-center gap-2">
            Contact Me
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 aspect-video w-full overflow-visible md:-ml-6 lg:-ml-10 xl:-ml-16 2xl:-ml-20"
      >
        <React.Suspense fallback={null}>
          <ModelCanvas
            src="./assets/3d/hacker-room.glb"
            autoRotate
            rotateSpeed={0.8}
            scale={1.35}
            cameraPosition={[3.6, 2.2, 5.4]}
          />
        </React.Suspense>
      </motion.div>
    </div>
  )
}



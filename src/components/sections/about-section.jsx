import React, { lazy } from 'react'
import { motion } from 'framer-motion'
import GlowCard from '@/components/ui/glow-card.jsx'

const ModelCanvas = lazy(() => import('@/components/three/model-canvas.jsx'))

export default function AboutSection() {
  const Card = ({ title, children }) => (
    <GlowCard className="p-6">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="text-sm text-white/75">{children}</div>
    </GlowCard>
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center text-3xl font-bold"
      >
        <span className="bg-gradient-to-r from-fuchsia-400 to-rose-400 bg-clip-text text-transparent">About Me</span>
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Hi I’m Syed Khubayb Ur Rahman">
          <p>
            I am an undergraduate student , currently pursuing a B.E. in Computer Science and Engineering. I am passionate about coding and programming, developing everything from interactive applications to innovative solutions. I enjoy solving complex problems, exploring new technologies, and creating impactful digital experiences.
          </p>
        </Card>

        <GlowCard className="p-6">
          <h3 className="mb-3 text-lg font-semibold">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {/* {['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Three.js', 'Node.js',].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs transition-colors hover:bg-gradient-to-r hover:from-fuchsia-500/30 hover:to-rose-500/30"
              >
                {t}
              </span>
            ))} */}
            <p className="text-sm text-white/75">
            I work with a diverse set of languages, frameworks, and tools to bring ideas to life from intuitive, visually appealing front-end designs to powerful backend architectures and optimized databases. I believe in blending creativity with technical excellence, utilizing modern development workflows and cloud technologies for smooth, reliable, and scalable deployment.
            </p>
            
          </div>
        </GlowCard>

        <Card title="I'm very flexible with time zone, communications & locations">
          <p>
          I'm based in India, Bangalore, but my work knows no boundaries. I'm open to remote work opportunities worldwide and excited to collaborate with teams from diverse backgrounds. Feel free to reach out if you're looking for a dedicated and passionate team member!!
          </p>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <GlowCard className="p-0 overflow-hidden md:col-span-1">
          <div className="h-[320px] w-full md:h-[420px]">
            <React.Suspense fallback={null}>
              <ModelCanvas src="./assets/3d/coder.compressed.glb" autoRotate rotateSpeed={0.6} fit boundsMargin={1.5} />
            </React.Suspense>
          </div>
        </GlowCard>
        <GlowCard className="md:col-span-2 p-0 overflow-hidden">
          <div className="h-[320px] w-full md:h-[420px]">
            <React.Suspense fallback={null}>
              <ModelCanvas src="./assets/3d/globe.compressed.glb" autoRotate rotateSpeed={0.6} fit boundsMargin={1.4} />
            </React.Suspense>
          </div>
        </GlowCard>
      </div>
    </div>
  )
}



import React from 'react'
import { motion } from 'framer-motion'
import GlowCard from '@/components/ui/glow-card.jsx'

const ITEMS = [
  {
    id: 1,
    title: "Seeking for opportunities",
    company: "",
    duration: "",
    description: ""
  },
  // {
  //   id: 2,
  //   title: "",
  //   company: "",
  //   duration: "month 20XX - Present",
  //   description: ""
  // }
]

export default function ExperienceSection() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center text-3xl font-bold"
      >
        <span className="bg-gradient-to-r from-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
          Experience
        </span>
      </motion.h2>

      <div className="relative mx-auto max-w-3xl">
        <div className="pointer-events-none absolute left-5 top-0 h-full w-[3px] bg-gradient-to-b from-fuchsia-500 via-violet-400 to-rose-400" />
        <ul className="space-y-8">
          {ITEMS.map((it, idx) => (
            <motion.li
              key={it.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="relative ml-10"
            >
              <div className="absolute left-[-31px] top-6 h-8 w-8 rounded-full bg-gradient-to-b from-fuchsia-600 to-rose-600 shadow-[0_8px_30px_rgba(168,85,247,0.5)]" />
              <GlowCard className="p-5">
                <div className="text-lg font-semibold text-white">{it.title}</div>
                <div className="text-sm text-white/60">{it.company} — {it.duration}</div>
                <p className="mt-2 text-sm text-white/70">{it.description}</p>
              </GlowCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}




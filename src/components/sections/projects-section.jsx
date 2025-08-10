import React from 'react'
import { motion } from 'framer-motion'
import GlowCard from '@/components/ui/glow-card.jsx'
import { ArrowUpRight } from 'lucide-react'

// Replace your CARDS definition with this:
import { useState } from "react";

const CARDS = [
  {
    id: 1,
    title: "3D Portfolio Website",
    tag: "3D models website using three.js",
    link: "https://github.com/kh-ub-ayb/khubayb-portfolio",
    image: "./public/assets-projects/portfolio.png",
    description: "Designed and developed a visually stunning portfolio website to showcase intricate 3D models, with a focus on responsive design and user interaction. This portfolio project features a collection of interactive 3D models, rendered using Three.js. The website is built with modern frontend technologies including React, Vite, and Tailwind CSS, ensuring a seamless and engaging user experience across all devices. It highlights technical skills in 3D modeling, web development, and creating dynamic user interfaces.."
  },
  {
    id: 2,
    title: "GitHub Profile Readme",
    tag: "Personal and interactive GitHub profile README",
    link: "https://github.com/kh-ub-ayb/kh-ub-ayb",
    image: "./public/assets-projects/github.png",
    description: "Created a personal and interactive GitHub profile README to effectively showcase skills, projects, and contributions in a visually engaging format. This project involved designing and implementing a dynamic GitHub profile README using Markdown and GitHub Actions. It features embedded statistics, technology icons, and a custom snake animation to visualize contribution activity. The goal was to create an engaging and informative overview of my technical expertise and development activities, providing visitors with a clear and compelling summary of my skills.."
  },
];

export default function ProjectsSection() {
  // Track which card is showing details
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center text-3xl font-bold"
      >
        <span className="bg-gradient-to-r from-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
          My Projects
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
          >
            <GlowCard className="p-5 group">
              {activeCard === c.id ? (
                // Details view
                <div className="flex flex-col h-full justify-between">
                  <p className="text-white/80">{c.description}</p>
                  <button
                    onClick={() => setActiveCard(null)}
                    className="mt-4 inline-flex items-center justify-center rounded-md border border-white/10 bg-red-500/20 px-3 py-1 text-xs text-red-200 hover:bg-red-500/30"
                  >
                    ✕ Close
                  </button>
                </div>
              ) : (
                // Normal view
                <>
                  {/* Project Image */}
                  <div
                    className="aspect-video w-full rounded-xl border border-white/10 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url(${c.image})` }}
                  />

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-semibold text-white">{c.title}</h3>

                  {/* Tag + Buttons */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveCard(c.id)}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 hover:bg-white/10"
                      >
                        Details
                      </button>
                      <span className="text-sm text-white/70">{c.tag}</span>
                    </div>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 transition hover:bg-gradient-to-r hover:from-fuchsia-500/20 hover:to-rose-500/20 hover:text-white"
                    >
                      Open <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </>
              )}
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}




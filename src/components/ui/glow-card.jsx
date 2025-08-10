import React, { useRef } from 'react'

export default function GlowCard({ children, as = 'div', className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--x', `${x}px`)
    el.style.setProperty('--y', `${y}px`)
  }

  const Comp = as
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      className={[
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl',
        'transition-all duration-300 will-change-transform hover:-translate-y-1',
        "shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_24px_60px_-20px_rgba(168,85,247,0.45),0_10px_30px_-18px_rgba(244,63,94,0.35)]",
        'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300',
        'before:[background:radial-gradient(160px_120px_at_var(--x,50%)_var(--y,50%),rgba(168,85,247,0.35),transparent_60%)]',
        'hover:before:opacity-100',
        className,
      ].join(' ')}
    >
      {children}
    </Comp>
  )
}



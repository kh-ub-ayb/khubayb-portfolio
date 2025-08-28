import React, { useEffect, useState } from 'react'
import { cn } from '@/utils/utils'

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false) // Close menu after navigation
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all',
        scrolled ? 'backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">
            Syed Khubayb Ur Rahman
          </span>
        </div>
        <ul className="hidden gap-6 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="relative text-sm text-white/90 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-fuchsia-400 after:to-rose-400 after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden rounded-md bg-white/5 px-2 py-1 text-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80">
          <div className="sticky inset-0 -z-10" />
          <div className="flex flex-col items-start p-6  bg-black opacity-80">
            <button
              className="mb-4 text-white text-lg"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="w-full mb-4 text-white text-lg bg-white/10 px-4 py-2 hover:bg-white/20"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}



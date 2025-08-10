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
        <select
          aria-label="Navigate sections"
          className="md:hidden rounded-md bg-white/5 px-2 py-1 text-sm"
          onChange={(e) => {
            const v = e.target.value
            const el = document.querySelector(v)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Menu
          </option>
          {NAV.map((i) => (
            <option key={i.href} value={i.href}>
              {i.label}
            </option>
          ))}
        </select>
      </nav>
    </header>
  )
}



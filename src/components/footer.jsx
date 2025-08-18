import React, { useEffect, useState } from 'react'
import { Github, Linkedin, Twitter, Instagram, Copyright } from 'lucide-react'

function VisitorCounter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // Check if we've already counted this session to prevent double counting
        const sessionKey = 'khubayb-visitor-session'
        const hasCountedThisSession = sessionStorage.getItem(sessionKey)
        
        if (hasCountedThisSession) {
          // Just get the current count without incrementing
          const response = await fetch('https://api.countapi.xyz/get/khubayb-portfolio/visits')
          const data = await response.json()
          
          if (data.value) {
            setCount(data.value)
          } else {
            // Fallback to localStorage if API fails
            const key = 'khubayb-visitor-count-fallback'
            const stored = Number(localStorage.getItem(key) || '0')
            setCount(stored)
          }
        } else {
          // First time this session - increment the count
          const response = await fetch('https://api.countapi.xyz/hit/khubayb-portfolio/visits')
          const data = await response.json()
          
          if (data.value) {
            setCount(data.value)
            // Mark this session as counted
            sessionStorage.setItem(sessionKey, 'true')
          } else {
            // Fallback to localStorage if API fails
            const key = 'khubayb-visitor-count-fallback'
            const prev = Number(localStorage.getItem(key) || '0')
            const next = prev + 1
            localStorage.setItem(key, String(next))
            setCount(next)
            sessionStorage.setItem(sessionKey, 'true')
          }
        }
      } catch (error) {
        console.error('Failed to fetch visitor count:', error)
        // Fallback to localStorage if API fails
        const key = 'khubayb-visitor-count-fallback'
        const prev = Number(localStorage.getItem(key) || '0')
        const next = prev + 1
        localStorage.setItem(key, String(next))
        setCount(next)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitorCount()
  }, [])

  if (loading) {
    return <span className="font-medium">...</span>
  }

  return <span className="font-medium">{count.toLocaleString()}</span>
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/in/syed-khubayb-ur-rahman-a0b34a2a5/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-md p-2 hover:bg-white/10">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="rounded-md p-2 hover:bg-white/10">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="https://www.instagram.com/its_syed_khubayb/" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-md p-2 hover:bg-white/10">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://github.com/kh-ub-ayb" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-md p-2 hover:bg-white/10">
            <Github className="h-5 w-5" />
          </a>
        </div>

        <div className="text-sm text-white/70">Visitors: <VisitorCounter /></div>

        <div className="flex items-center gap-2 text-xs text-white/60">
          <Copyright className="h-4 w-4" />
          <span>{new Date().getFullYear()} Syed Khubayb Ur Rahman. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

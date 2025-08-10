import React, { useState, lazy } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Send } from 'lucide-react'
import GlowCard from '@/components/ui/glow-card.jsx'
import emailjs from '@emailjs/browser'

const ModelCanvas = lazy(() => import('@/components/three/model-canvas.jsx'))

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    if (submitting) return
    setError('')

    setSubmitting(true)
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_4m9mzo2'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!templateId || !publicKey) {
        setError('Missing EmailJS config. Add VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to your .env file.')
        return
      }

      const looksLikePlaceholder = (v) => typeof v === 'string' && /your_.*(template|public)_key/i.test(v)
      if (looksLikePlaceholder(templateId) || looksLikePlaceholder(publicKey)) {
        setError('EmailJS env values look like placeholders. Replace them in .env and restart the dev server.')
        return
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          user_name: name,
          from_email: email,
          user_email: email,
          reply_to: email,
          message,
        },
        { publicKey }
      )

      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('EmailJS send error:', err)
      const detailed = err?.text || err?.message
      setError(detailed ? `Failed to send: ${detailed}` : 'Failed to send. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
      <GlowCard className="p-6">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-3xl font-bold"
        >
          Get in Touch – Let’s Connect
        </motion.h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-white/80">Your name</label>
            <Input
              required
              name="name"
              placeholder="What's your good name?"
              className="bg-white/5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/80">Your email</label>
            <Input
              required
              type="email"
              name="email"
              placeholder="What's your email address?"
              className="bg-white/5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/80">Your message</label>
            <Textarea
              required
              name="message"
              placeholder="How can I help you?"
              rows={6}
              className="bg-white/5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <Button
            type="submit"
            disabled={submitting}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-black py-6 text-base font-medium"
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
              {sent ? 'Message sent!' : submitting ? 'Sending...' : 'Send message'}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Button>
        </form>
      </GlowCard>

      <GlowCard className="p-0 overflow-hidden">
        <div className="aspect-video w-full">
          <React.Suspense fallback={null}>
            <ModelCanvas
              src="./assets/3d/desk.glb"
              autoRotate
              fit
              boundsMargin={1.65}
              cameraPosition={[3.2, 2.2, 5.8]}
              className=""
            />
          </React.Suspense>
        </div>
      </GlowCard>
    </div>
  )
}



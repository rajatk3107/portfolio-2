'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

// ─── Animated name reveal ─────────────────────────────────────

function NameReveal() {
  const name = 'RAJAT'
  return (
    <div className="flex overflow-hidden" aria-label={name}>
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          className="block font-display font-medium leading-none"
          style={{
            fontSize: 'clamp(5rem, 14vw, 14rem)',
            color: 'var(--text)',
            letterSpacing: '-0.02em',
          }}
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.5 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

// ─── Scroll indicator ─────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      {/* Mouse outline */}
      <div className="w-5 h-8 rounded-full border border-[var(--muted)] flex items-start justify-center p-1.5">
        <motion.div
          className="w-0.5 h-2 bg-[var(--accent)] rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <span
        className="font-mono text-[9px] text-[var(--muted)] tracking-[0.25em] uppercase"
        style={{ writingMode: 'vertical-rl' }}
      >
        Scroll
      </span>
    </motion.div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── 3D Canvas — full screen background ── */}
      <div className="absolute inset-0">
        <Scene3D mouse={mouse} />
      </div>

      {/* ── Radial ambient glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(196,162,90,0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── Left-side content fade ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, #080808 28%, rgba(8,8,8,0.82) 52%, transparent 75%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-4xl">
        {/* Badge */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.3em] uppercase">
            Available for new projects
          </span>
        </motion.div>

        {/* Name */}
        <NameReveal />

        {/* Sub-name line */}
        <motion.div
          className="overflow-hidden mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <span
            className="font-display italic font-light"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 5rem)',
              color: 'var(--muted)',
              letterSpacing: '-0.01em',
            }}
          >
            Kumar
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-body text-base md:text-lg text-[var(--muted)] max-w-md mt-8 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Full-stack developer crafting precision digital
          experiences — where engineering meets craft.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-[var(--accent)] text-[#080808]
                       font-heading font-semibold text-sm tracking-wide
                       hover:bg-[#dfc07a] transition-colors duration-300 overflow-hidden"
            data-hover
          >
            <span className="relative z-10">View Work</span>
          </a>

          <a
            href="#contact"
            className="group px-8 py-4 border border-[var(--border)]
                       text-[var(--muted)] font-heading font-medium text-sm tracking-wide
                       hover:border-[var(--accent)] hover:text-[var(--text)]
                       transition-all duration-300"
            data-hover
          >
            Get in touch
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          className="flex gap-8 mt-14 pt-8 border-t border-[var(--border)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          {[
            { n: '5+',  l: 'Years' },
            { n: '50+', l: 'Projects' },
            { n: '20+', l: 'Clients' },
          ].map(({ n, l }) => (
            <div key={l}>
              <div className="font-display text-2xl md:text-3xl text-[var(--text)]">{n}</div>
              <div className="font-mono text-[9px] text-[var(--muted)] tracking-widest uppercase mt-0.5">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}

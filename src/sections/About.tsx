'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Reveal wrapper ───────────────────────────────────────────

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Floating stat card ───────────────────────────────────────

function StatCard({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="glass rounded-xl px-5 py-4 flex flex-col gap-1 hover:border-[var(--border-warm)] transition-colors duration-500">
      <span className="font-display text-4xl text-[var(--text)] leading-none">{value}</span>
      <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.2em] uppercase">{label}</span>
      {note && <span className="font-body text-xs text-[var(--muted)] mt-1">{note}</span>}
    </div>
  )
}

// ─── About Section ────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px' })

  return (
    <section id="about" ref={sectionRef} className="section-pad">
      <div className="max-w-7xl mx-auto">
        {/* ── Section label ── */}
        <Reveal className="mb-16">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em]">01</span>
            <div className="w-10 h-px bg-[var(--accent)]" />
            <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.25em] uppercase">About</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT — story ── */}
          <div>
            {/* Oversized section number */}
            <div
              className="font-display text-[10rem] leading-none select-none pointer-events-none
                         absolute -translate-y-16 -translate-x-4 opacity-[0.025]"
            >
              01
            </div>

            <Reveal delay={0.1}>
              <h2
                className="font-display font-medium leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', color: 'var(--text)' }}
              >
                Building digital<br />
                <em className="italic font-light text-[var(--muted)]">experiences that</em><br />
                leave an impression.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-body text-[var(--muted)] text-base leading-relaxed max-w-lg">
                I'm Rajat — a full-stack developer with a designer's eye and an engineer's
                precision. I've spent five years building products that don't just work,
                but feel inevitable. The kind of software people notice without knowing why.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="font-body text-[var(--muted)] text-base leading-relaxed max-w-lg mt-5">
                My process starts with understanding the problem deeply, then engineering
                solutions that are both technically rigorous and genuinely delightful to use.
                I believe performance and beauty are not trade-offs — they're the same thing.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.38} className="grid grid-cols-3 gap-4 mt-12">
              <StatCard value="5+"  label="Years exp." />
              <StatCard value="4"   label="Companies" />
              <StatCard value="3M+" label="Users reached" />
            </Reveal>
          </div>

          {/* ── RIGHT — visual card ── */}
          <Reveal delay={0.15} className="relative lg:mt-8">

            {/* Main glass card */}
            <div
              className="glass rounded-2xl p-8 relative overflow-hidden"
              style={{ minHeight: '440px' }}
            >
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(196,162,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,162,90,1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Ambient glow */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(196,162,90,0.08) 0%, transparent 70%)',
                }}
              />

              {/* Large ambient initial */}
              <div
                className="absolute bottom-4 right-6 font-display italic font-bold select-none pointer-events-none"
                style={{ fontSize: '9rem', color: 'rgba(196,162,90,0.06)', lineHeight: 1 }}
              >
                RK
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-10">
                  <div>
                    <div className="font-mono text-[10px] text-[var(--muted)] tracking-widest uppercase mb-2">
                      Currently
                    </div>
                    <div className="font-heading font-semibold text-[var(--text)] text-lg">
                      Senior Frontend Engineer
                    </div>
                    <div className="font-body text-[var(--muted)] text-sm mt-0.5">
                      @ Vercel — San Francisco, CA
                    </div>
                  </div>
                  <div className="glass-warm rounded-lg px-3 py-1.5">
                    <span className="font-mono text-[10px] text-[var(--accent)] tracking-widest">OPEN</span>
                  </div>
                </div>

                {/* Info rows */}
                {[
                  { label: 'Location',    value: 'India 🇮🇳',           sub: 'Available remotely' },
                  { label: 'Focus',       value: 'Web & Mobile Apps',    sub: 'Full-stack' },
                  { label: 'Education',   value: 'B.Tech Computer Sci.', sub: 'IIT Graduate' },
                  { label: 'Side quests', value: 'Open source • Writing', sub: '12k GitHub stars' },
                ].map(row => (
                  <div
                    key={row.label}
                    className="flex items-start justify-between py-4 border-t border-[var(--border)]
                               hover:border-[var(--border-warm)] transition-colors duration-300"
                  >
                    <span className="font-mono text-[10px] text-[var(--muted)] tracking-widest uppercase w-28 shrink-0 pt-0.5">
                      {row.label}
                    </span>
                    <div className="text-right">
                      <div className="font-body text-[var(--text)] text-sm">{row.value}</div>
                      <div className="font-mono text-[10px] text-[var(--muted)] tracking-wide mt-0.5">{row.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating accent chip — top-right offset */}
            <motion.div
              className="absolute -top-4 -right-4 glass-warm rounded-xl px-4 py-3 z-10"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase">
                ✦ Available
              </div>
            </motion.div>

            {/* Floating bottom-left chip */}
            <motion.div
              className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 z-10"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <div className="font-mono text-[10px] text-[var(--muted)] tracking-wide">↗ 12k GitHub stars</div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────

const timeline = [
  {
    period:   '2023 — Present',
    role:     'Senior Frontend Engineer',
    company:  'Vercel',
    location: 'San Francisco (Remote)',
    desc:
      'Lead engineer on the deployment UI. Rebuilt the project dashboard from scratch — ' +
      'reduced time-to-meaningful-interaction by 60%. Shipped the new Analytics product ' +
      'used by 500k+ developers.',
    tags:  ['Next.js', 'React', 'TypeScript', 'Rust'],
    live:  true,
  },
  {
    period:   '2021 — 2023',
    role:     'Full-Stack Developer',
    company:  'Linear',
    location: 'Remote',
    desc:
      'Core contributor to the issue tracking engine. Designed and implemented the ' +
      'real-time sync protocol that handles 10M+ updates/day. Built the GitHub and ' +
      'Figma integrations used by 8,000+ teams.',
    tags: ['React', 'Node.js', 'CRDTs', 'PostgreSQL'],
  },
  {
    period:   '2020 — 2021',
    role:     'Frontend Developer',
    company:  'Framer',
    location: 'Amsterdam (Remote)',
    desc:
      'Built the animation engine for Framer Motion v4 — the most widely adopted ' +
      'React animation library. Worked on the visual editor and component publishing pipeline.',
    tags: ['React', 'TypeScript', 'WebGL', 'Framer Motion'],
  },
  {
    period:   '2019 — 2020',
    role:     'Software Engineer',
    company:  'Razorpay',
    location: 'Bangalore, India',
    desc:
      'Developed the merchant dashboard UI for one of India\'s largest payment processors. ' +
      'Optimised critical rendering paths, achieving 3× performance improvement on mobile.',
    tags: ['React', 'Python', 'Django', 'Redis'],
  },
]

// ─── Timeline Item ────────────────────────────────────────────

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLast = index === timeline.length - 1

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_3fr] lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">

      {/* ── Left: date / dot / line ── */}
      <div className="flex flex-col items-end gap-0">
        <motion.div
          className="font-mono text-[10px] text-[var(--muted)] tracking-wide text-right leading-relaxed mt-0.5"
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {item.period}
        </motion.div>

        {/* Connector */}
        <div className="flex flex-col items-center mt-4 flex-1">
          {/* Dot */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full border-2 relative z-10"
              style={{
                borderColor: item.live ? 'var(--accent)' : 'var(--muted)',
                background:  item.live ? 'var(--accent)' : 'transparent',
              }}
            />
            {item.live && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: 'var(--accent)', opacity: 0.3 }}
              />
            )}
          </motion.div>

          {/* Vertical line */}
          {!isLast && (
            <motion.div
              className="flex-1 w-px mt-3"
              style={{
                background: 'linear-gradient(to bottom, var(--border), transparent)',
                transformOrigin: 'top',
              }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
          )}
        </div>
      </div>

      {/* ── Right: content ── */}
      <motion.div
        className="pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="glass rounded-2xl p-7 hover:border-[var(--border-warm)]
                     transition-all duration-500 group"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="font-heading font-semibold text-[var(--text)] text-lg mb-0.5">
                {item.role}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className="font-display italic text-xl"
                  style={{ color: 'var(--accent)' }}
                >
                  {item.company}
                </span>
                <span className="text-[var(--muted)] text-sm">—</span>
                <span className="font-mono text-[10px] text-[var(--muted)] tracking-wide">
                  {item.location}
                </span>
              </div>
            </div>

            {item.live && (
              <span className="glass-warm px-3 py-1.5 rounded-lg font-mono text-[10px] text-[var(--accent)] tracking-widest">
                CURRENT
              </span>
            )}
          </div>

          <p className="font-body text-[var(--muted)] text-sm leading-relaxed mb-6">
            {item.desc}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[10px] text-[var(--muted)] px-2.5 py-1
                           border border-[var(--border)] rounded
                           group-hover:border-[rgba(196,162,90,0.2)] transition-colors duration-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Experience Section ───────────────────────────────────────

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="section-pad bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto">

        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em]">04</span>
          <div className="w-10 h-px bg-[var(--accent)]" />
          <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.25em] uppercase">Experience</span>
        </motion.div>

        {/* Heading */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20 items-end">
          <motion.h2
            className="font-display font-medium leading-[1.1]"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: 'var(--text)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Five years<br />
            <em className="italic font-light text-[var(--muted)]">in the arena.</em>
          </motion.h2>
          <motion.p
            className="font-body text-[var(--muted)] text-base leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            From scaling startups to world-class developer tools.
            Each role shaped my approach to building software that lasts.
          </motion.p>
        </div>

        {/* Timeline */}
        <div>
          {timeline.map((item, i) => (
            <TimelineItem key={item.company} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

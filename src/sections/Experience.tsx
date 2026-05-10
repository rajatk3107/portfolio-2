'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────

const experiences = [
  {
    id:       '01',
    company:  'Vercel',
    role:     'Senior Frontend Engineer',
    period:   '2023 — Present',
    location: 'San Francisco · Remote',
    current:  true,
    accent:   '#c4a25a',
    hue:      'rgba(196,162,90,0.05)',
    summary:
      'Building the interfaces that half a million developers interact with every day. ' +
      'Own the deployment dashboard end-to-end — from design system contributions to ' +
      'performance budgets and Core Web Vitals.',
    achievements: [
      { metric: '60%',   detail: 'reduction in time-to-meaningful-interaction on the project dashboard' },
      { metric: '500k+', detail: 'developers use the Analytics product I shipped from 0→1' },
      { metric: '3×',    detail: 'improvement in Core Web Vitals across the main deployment UI' },
      { metric: '12',    detail: 'design-system components adopted company-wide' },
    ],
    tech: ['Next.js 14', 'React', 'TypeScript', 'Rust', 'Tailwind CSS', 'Radix UI'],
    visual: <VercelVisual />,
  },
  {
    id:       '02',
    company:  'Linear',
    role:     'Full-Stack Developer',
    period:   '2021 — 2023',
    location: 'San Francisco · Remote',
    current:  false,
    accent:   '#6366f1',
    hue:      'rgba(99,102,241,0.05)',
    summary:
      'Core contributor to the issue-tracking engine powering thousands of the world\'s ' +
      'fastest-moving engineering teams. Designed and built real-time sync that just works.',
    achievements: [
      { metric: '10M+',  detail: 'state updates per day processed by the sync protocol I authored' },
      { metric: '8,000+', detail: 'teams use the GitHub and Figma integrations I built' },
      { metric: '40%',   detail: 'faster perceived load time after rewriting the initial data-fetch layer' },
      { metric: '2',     detail: 'new product verticals launched — Cycles and Roadmaps' },
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'CRDTs', 'PostgreSQL', 'GraphQL'],
    visual: <LinearVisual />,
  },
  {
    id:       '03',
    company:  'Framer',
    role:     'Frontend Developer',
    period:   '2020 — 2021',
    location: 'Amsterdam · Remote',
    current:  false,
    accent:   '#06b6d4',
    hue:      'rgba(6,182,212,0.05)',
    summary:
      'Worked on the animation engine that became Framer Motion — now the most-used React ' +
      'animation library with 20M+ weekly downloads. Also contributed to the visual editor ' +
      'and component publishing pipeline.',
    achievements: [
      { metric: '20M+',  detail: 'weekly npm downloads for Framer Motion (the library I helped build)' },
      { metric: 'v4',    detail: 'Framer Motion release shipped — introduced layout animations' },
      { metric: '35%',   detail: 'editor performance improvement via render batching' },
      { metric: '1',     detail: 'open-source library I\'m most proud of contributing to' },
    ],
    tech: ['React', 'TypeScript', 'WebGL', 'Framer Motion', 'Webpack', 'Jest'],
    visual: <FramerVisual />,
  },
  {
    id:       '04',
    company:  'Razorpay',
    role:     'Software Engineer',
    period:   '2019 — 2020',
    location: 'Bangalore, India',
    current:  false,
    accent:   '#3b82f6',
    hue:      'rgba(59,130,246,0.05)',
    summary:
      'First engineering role — joined when Razorpay was processing ₹5,000 Cr/month. ' +
      'Worked on the merchant dashboard used by 800,000+ businesses across India.',
    achievements: [
      { metric: '3×',    detail: 'mobile rendering performance improvement on the merchant dashboard' },
      { metric: '800k+', detail: 'businesses used the dashboard features I owned' },
      { metric: '99.9%', detail: 'uptime maintained on the payment status page (zero-downtime deploys)' },
      { metric: '2',     detail: 'new dashboard modules shipped — Settlements and Disputes' },
    ],
    tech: ['React', 'Python', 'Django', 'Redis', 'PostgreSQL', 'AWS'],
    visual: <RazorpayVisual />,
  },
]

// ─── Company Visuals (CSS / SVG art) ──────────────────────────

function VercelVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-8">
      {/* Deployment pipeline tree */}
      <svg className="w-full max-w-xs opacity-80" viewBox="0 0 200 180" fill="none">
        {/* Main branch */}
        <line x1="100" y1="10" x2="100" y2="170" stroke="rgba(196,162,90,0.2)" strokeWidth="1" strokeDasharray="4 4"/>
        {/* Nodes */}
        {[20, 60, 100, 140, 165].map((y, i) => (
          <g key={y}>
            <circle cx="100" cy={y} r={i === 4 ? 6 : 4}
              fill={i === 4 ? '#c4a25a' : 'rgba(196,162,90,0.3)'}
              stroke={i === 4 ? 'rgba(196,162,90,0.5)' : 'none'} strokeWidth="8"/>
            {i === 4 && (
              <circle cx="100" cy={y} r="10" fill="none" stroke="rgba(196,162,90,0.2)" strokeWidth="1">
                <animate attributeName="r" values="10;16;10" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite"/>
              </circle>
            )}
          </g>
        ))}
        {/* Branch lines */}
        <line x1="100" y1="60" x2="148" y2="85" stroke="rgba(196,162,90,0.15)" strokeWidth="1"/>
        <line x1="100" y1="60" x2="52"  y2="85" stroke="rgba(196,162,90,0.15)" strokeWidth="1"/>
        <circle cx="148" cy="85" r="3" fill="rgba(196,162,90,0.2)"/>
        <circle cx="52"  cy="85" r="3" fill="rgba(196,162,90,0.2)"/>
        {/* Labels */}
        <text x="115" y="23" fontSize="8" fill="rgba(196,162,90,0.4)" fontFamily="monospace">push</text>
        <text x="115" y="63" fontSize="8" fill="rgba(196,162,90,0.4)" fontFamily="monospace">build</text>
        <text x="115" y="103" fontSize="8" fill="rgba(196,162,90,0.4)" fontFamily="monospace">test</text>
        <text x="115" y="143" fontSize="8" fill="rgba(196,162,90,0.4)" fontFamily="monospace">preview</text>
        <text x="112" y="168" fontSize="8" fill="rgba(196,162,90,0.8)" fontFamily="monospace">✓ live</text>
      </svg>
    </div>
  )
}

function LinearVisual() {
  const cols = [
    { label: 'Backlog', items: [3, 2, 4] },
    { label: 'In Progress', items: [2, 3] },
    { label: 'Done', items: [4, 2, 3, 2] },
  ]
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-8">
      <div className="flex gap-3 w-full max-w-xs">
        {cols.map((col, ci) => (
          <div key={ci} className="flex-1 flex flex-col gap-2">
            <div className="font-mono text-[8px] tracking-widest uppercase mb-1"
                 style={{ color: 'rgba(99,102,241,0.5)' }}>
              {col.label}
            </div>
            {col.items.map((w, i) => (
              <motion.div
                key={i}
                className="rounded"
                style={{
                  height: '18px',
                  width:  `${w * 20 + 20}%`,
                  background: ci === 1
                    ? 'rgba(99,102,241,0.35)'
                    : 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.2)',
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: ci * 0.3 + i * 0.2 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function FramerVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-8">
      <svg className="w-full max-w-xs" viewBox="0 0 200 160" fill="none">
        {/* Easing curve */}
        <path
          d="M 20 140 C 20 140, 60 20, 180 20"
          stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeLinecap="round"
        />
        {/* Control point handles */}
        <line x1="20" y1="140" x2="60"  y2="20"  stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="3 3"/>
        <line x1="180" y1="20" x2="60" y2="20"   stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="3 3"/>
        <circle cx="60"  cy="20"  r="3.5" fill="rgba(6,182,212,0.5)"/>
        <circle cx="20"  cy="140" r="4.5" fill="rgba(6,182,212,0.8)"/>
        <circle cx="180" cy="20"  r="4.5" fill="rgba(6,182,212,0.8)"/>
        {/* Animated dot along the path */}
        <circle r="5" fill="#06b6d4" opacity="0.9">
          <animateMotion dur="2.8s" repeatCount="indefinite" calcMode="spline"
            keySplines="0.25 0.1 0.25 1"
            path="M 20 140 C 20 140, 60 20, 180 20"/>
        </circle>
        {/* Grid */}
        {[40, 80, 120, 160].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="rgba(6,182,212,0.05)" strokeWidth="1"/>
        ))}
        {[40, 80, 120].map(y => (
          <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(6,182,212,0.05)" strokeWidth="1"/>
        ))}
        <text x="8" y="155" fontSize="7" fill="rgba(6,182,212,0.4)" fontFamily="monospace">0</text>
        <text x="172" y="14" fontSize="7" fill="rgba(6,182,212,0.4)" fontFamily="monospace">1</text>
      </svg>
    </div>
  )
}

function RazorpayVisual() {
  const steps = ['Merchant', 'Gateway', 'Bank', 'Settlement']
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-8">
      <div className="flex flex-col items-center gap-0 w-full max-w-[180px]">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center w-full">
            <motion.div
              className="w-full rounded-lg px-3 py-2.5 flex items-center justify-between"
              style={{
                background:  i === 0 ? 'rgba(59,130,246,0.18)' : 'rgba(59,130,246,0.08)',
                border:      `1px solid rgba(59,130,246,${i === 0 ? 0.35 : 0.15})`,
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
            >
              <span className="font-mono text-[8px] tracking-wide" style={{ color: 'rgba(59,130,246,0.8)' }}>
                {step}
              </span>
              {i === 0 && (
                <span className="font-mono text-[8px]" style={{ color: 'rgba(59,130,246,0.6)' }}>₹</span>
              )}
            </motion.div>
            {i < steps.length - 1 && (
              <div className="flex flex-col items-center py-1 gap-0.5">
                {[0, 1, 2].map(d => (
                  <motion.div
                    key={d}
                    className="w-px h-1.5 rounded"
                    style={{ background: 'rgba(59,130,246,0.3)' }}
                    animate={{ opacity: [0.2, 0.9, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 + d * 0.15 }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="mt-2 font-mono text-[7px] tracking-widest" style={{ color: 'rgba(59,130,246,0.4)' }}>
          800k+ MERCHANTS
        </div>
      </div>
    </div>
  )
}

// ─── Experience Card ──────────────────────────────────────────

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0

  return (
    <motion.article
      ref={ref}
      className="grid lg:grid-cols-2 overflow-hidden rounded-2xl glass
                 transition-all duration-700"
      style={{ borderColor: hovered ? exp.accent + '40' : undefined }}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Visual pane ── */}
      <div
        className={`relative min-h-[280px] lg:min-h-[400px] ${isEven ? 'lg:order-last' : ''}`}
        style={{ background: exp.hue }}
      >
        {/* Ambient company number */}
        <div
          className="absolute bottom-3 right-5 font-display font-bold select-none pointer-events-none leading-none"
          style={{ fontSize: '8rem', color: `${exp.accent}10` }}
        >
          {exp.id}
        </div>

        {exp.visual}

        {/* Current badge overlay */}
        {exp.current && (
          <div className="absolute top-5 left-5">
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[9px] tracking-widest uppercase"
              style={{ background: `${exp.accent}18`, border: `1px solid ${exp.accent}35`, color: exp.accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: exp.accent }} />
              Current role
            </span>
          </div>
        )}
      </div>

      {/* ── Content pane ── */}
      <div className="flex flex-col justify-center p-9 lg:p-12">

        {/* Header */}
        <div className="flex items-start gap-3 mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] mt-1" style={{ color: exp.accent }}>
            {exp.id}
          </span>
          <div className="w-8 h-px mt-2.5" style={{ background: exp.accent }} />
          <div>
            <div className="font-mono text-[10px] text-[var(--muted)] tracking-[0.2em] uppercase mb-0.5">
              {exp.period} · {exp.location}
            </div>
          </div>
        </div>

        {/* Company + role */}
        <h3
          className="font-display font-medium leading-[1.05] mb-1"
          style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', color: 'var(--text)' }}
        >
          {exp.company}
        </h3>
        <div
          className="font-body text-base mb-6"
          style={{ color: exp.accent }}
        >
          {exp.role}
        </div>

        {/* Summary */}
        <p className="font-body text-[var(--muted)] text-sm leading-relaxed mb-8 max-w-sm">
          {exp.summary}
        </p>

        {/* Achievements */}
        <div className="space-y-3 mb-8">
          {exp.achievements.map((a, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="font-display text-xl leading-none shrink-0 tabular-nums mt-0.5"
                style={{ color: exp.accent, minWidth: '3.5rem' }}
              >
                {a.metric}
              </span>
              <span className="font-body text-[var(--muted)] text-sm leading-snug">
                {a.detail}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {exp.tech.map(t => (
            <span
              key={t}
              className="font-mono text-[10px] px-2.5 py-1 rounded border transition-colors duration-300"
              style={{
                color:   hovered ? exp.accent : 'var(--muted)',
                borderColor: hovered ? `${exp.accent}30` : 'var(--border)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

// ─── Experience Section ───────────────────────────────────────

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="section-pad">
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em]">03</span>
          <div className="w-10 h-px bg-[var(--accent)]" />
          <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.25em] uppercase">Experience</span>
        </motion.div>

        {/* Heading */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20 items-end">
          <motion.h2
            className="font-display font-medium leading-[1.08]"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: 'var(--text)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Where I've<br />
            <em className="italic font-light text-[var(--muted)]">built my craft.</em>
          </motion.h2>
          <motion.p
            className="font-body text-[var(--muted)] text-base leading-relaxed max-w-md lg:ml-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Five years across four product companies — each one sharpened a different
            edge. I don't have side projects to show; I have real products, real users,
            and real impact at scale.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/* Bottom strip — career timeline summary */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {experiences.map(exp => (
            <div
              key={exp.id}
              className="bg-[var(--bg)] px-6 py-5 flex flex-col gap-1.5
                         hover:bg-[var(--surface)] transition-colors duration-300"
            >
              <span
                className="font-display italic text-2xl leading-none"
                style={{ color: exp.accent }}
              >
                {exp.company}
              </span>
              <span className="font-mono text-[9px] text-[var(--muted)] tracking-widest">
                {exp.period}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

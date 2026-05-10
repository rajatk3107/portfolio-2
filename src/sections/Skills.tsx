'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Word-by-word heading reveal ─────────────────────────────

function SplitHeading({ lines }: { lines: Array<{ text: string; muted?: boolean }> }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  let wordIndex = 0

  return (
    <div ref={ref} className="font-display font-medium leading-[1.1]"
         style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: 'var(--text)' }}>
      {lines.map((line, li) => (
        <div key={li} className={`flex flex-wrap gap-x-[0.28em] ${line.muted ? 'italic font-light' : ''}`}
             style={{ color: line.muted ? 'var(--muted)' : 'var(--text)' }}>
          {line.text.split(' ').map((word) => {
            const wi = wordIndex++
            return (
              <div key={wi} className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.75, delay: wi * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────

const categories = [
  {
    id:    'frontend',
    label: 'Frontend',
    desc:  'Interfaces that feel inevitable.',
    skills: [
      { name: 'React / Next.js',  level: 98 },
      { name: 'TypeScript',       level: 95 },
      { name: 'Three.js / WebGL', level: 83 },
      { name: 'Framer Motion',    level: 91 },
      { name: 'Tailwind CSS',     level: 97 },
    ],
  },
  {
    id:    'backend',
    label: 'Backend',
    desc:  'Reliable foundations, invisible craft.',
    skills: [
      { name: 'Node.js / Bun',    level: 90 },
      { name: 'Python / FastAPI', level: 84 },
      { name: 'PostgreSQL',       level: 87 },
      { name: 'GraphQL / REST',   level: 88 },
      { name: 'Redis / Caching',  level: 80 },
    ],
  },
  {
    id:    'tools',
    label: 'Tools & Cloud',
    desc:  'Shipping with confidence.',
    skills: [
      { name: 'AWS / Vercel',     level: 85 },
      { name: 'Docker / K8s',     level: 79 },
      { name: 'CI/CD pipelines',  level: 88 },
      { name: 'Figma / Design',   level: 86 },
      { name: 'Git / Monorepos',  level: 94 },
    ],
  },
]

const tech = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'Three.js', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker',
  'Tailwind', 'Prisma', 'Redis', 'Figma', 'Rust',
]

// ─── Reveal ───────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Individual skill bar ─────────────────────────────────────

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const delay = index * 0.07

  return (
    <div ref={ref} className="group py-3 border-b border-[var(--border)] last:border-0">
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-body text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300">
          {name}
        </span>
        <motion.span
          className="font-mono text-[10px] text-[var(--muted)] tracking-widest"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.6, duration: 0.4 }}
        >
          {level}
        </motion.span>
      </div>

      {/* Track */}
      <div className="h-px bg-[var(--border)] relative overflow-visible">
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--accent)] to-[rgba(196,162,90,0.4)]"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ transformOrigin: 'left', width: `${level}%` }}
          transition={{
            duration: 1.4,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        {/* Glowing tip */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
          style={{ left: `${level}%`, translateX: '-50%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 1.4, duration: 0.3 }}
        >
          <div
            className="absolute inset-0 rounded-full bg-[var(--accent)] animate-pulse"
            style={{ filter: 'blur(3px)', opacity: 0.6 }}
          />
        </motion.div>
      </div>
    </div>
  )
}

// ─── Category card ────────────────────────────────────────────

function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  return (
    <Reveal delay={index * 0.12} className="glass rounded-2xl p-8 hover:border-[var(--border-warm)] transition-all duration-500">
      <div className="mb-8">
        <div className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] mb-3 uppercase">
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="font-heading font-semibold text-[var(--text)] text-xl mb-1">{cat.label}</h3>
        <p className="font-body text-[var(--muted)] text-sm italic">{cat.desc}</p>
      </div>

      <div>
        {cat.skills.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
        ))}
      </div>
    </Reveal>
  )
}

// ─── Skills Section ───────────────────────────────────────────

export default function Skills() {
  return (
    <section id="skills" className="section-pad bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <Reveal className="mb-16">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em]">02</span>
            <div className="w-10 h-px bg-[var(--accent)]" />
            <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.25em] uppercase">Skills</span>
          </div>
        </Reveal>

        {/* Heading */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20 items-end">
          <SplitHeading lines={[
            { text: 'Tools of the' },
            { text: 'trade.', muted: true },
          ]} />
          <Reveal delay={0.12}>
            <p className="font-body text-[var(--muted)] text-base leading-relaxed max-w-md lg:ml-auto">
              Five years of building across the full stack — from pixel-perfect UIs to
              distributed backend systems. Each tool chosen for a reason.
            </p>
          </Reveal>
        </div>

        {/* Skill cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>

        {/* Tech ticker strip */}
        <Reveal>
          <div className="border-t border-b border-[var(--border)] py-5 overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
                 style={{ background: 'linear-gradient(90deg, var(--surface), transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
                 style={{ background: 'linear-gradient(-90deg, var(--surface), transparent)' }} />

            <motion.div
              className="flex gap-12 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              {/* Duplicate for seamless loop */}
              {[...tech, ...tech].map((t, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] text-[var(--muted)] tracking-[0.25em] uppercase"
                >
                  {t}
                  <span className="ml-12 text-[var(--accent)] opacity-40">✦</span>
                </span>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

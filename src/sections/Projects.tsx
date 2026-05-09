'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────

const projects = [
  {
    id:   '01',
    name: 'Lumina',
    cat:  'AI Design Collaboration',
    year: '2024',
    desc:
      'A real-time design collaboration platform with AI-powered suggestions, component inference, ' +
      'and one-click code export. Built for design teams that move fast.',
    impact: ['12k active teams', '40% faster design cycles', '$2.4M ARR'],
    tech:   ['Next.js 14', 'WebSockets', 'OpenAI API', 'PostgreSQL', 'Figma Plugin SDK'],
    hue:    'rgba(196,162,90,0.06)',
    accent: '#c4a25a',
    visual: <LuminaVisual />,
  },
  {
    id:   '02',
    name: 'Apex',
    cat:  'Analytics Dashboard',
    year: '2024',
    desc:
      'High-performance analytics infrastructure processing 4 million events/day. ' +
      'Sub-100ms query times across datasets spanning 3 years of data.',
    impact: ['4M events/day', '<100ms queries', 'Fortune 500 client'],
    tech:   ['React', 'D3.js', 'ClickHouse', 'Rust', 'WebGL'],
    hue:    'rgba(74,136,186,0.06)',
    accent: '#4a88ba',
    visual: <ApexVisual />,
  },
  {
    id:   '03',
    name: 'Habitat',
    cat:  'Real Estate Marketplace',
    year: '2023',
    desc:
      'A premium property marketplace with immersive 3D virtual tours, AI price prediction, ' +
      'and a recommendation engine trained on 2M listings.',
    impact: ['200k listings', '8min avg. session', '3.2× conversion'],
    tech:   ['Next.js', 'Three.js', 'Python/FastAPI', 'TensorFlow', 'Mapbox'],
    hue:    'rgba(122,106,154,0.06)',
    accent: '#7a6a9a',
    visual: <HabitatVisual />,
  },
]

// ─── Project Visual Placeholders (CSS art) ────────────────────

function LuminaVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Layers */}
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-xl border border-[rgba(196,162,90,0.2)] bg-[rgba(196,162,90,0.03)]"
          style={{
            width:  `${70 - i * 12}%`,
            height: `${65 - i * 10}%`,
            rotate: i * 3,
            zIndex: 4 - i,
          }}
          animate={{ rotate: [i * 3, i * 3 + 1, i * 3] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Color swatches */}
      <div className="absolute top-8 right-8 flex gap-2">
        {['#c4a25a', '#4a88ba', '#7a6a9a', '#2d2d2d'].map(c => (
          <div key={c} className="w-5 h-5 rounded-full border border-white/10" style={{ background: c }} />
        ))}
      </div>
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(196,162,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,162,90,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <span className="relative font-display italic text-[var(--accent)] text-7xl opacity-20 select-none">L</span>
    </div>
  )
}

function ApexVisual() {
  const bars = [68, 82, 55, 91, 74, 88, 62, 95, 71, 84]
  return (
    <div className="relative w-full h-full flex items-end justify-center pb-12 px-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(74,136,186,1) 1px, transparent 1px)',
          backgroundSize: '100% 20%',
        }}
      />
      <div className="flex items-end gap-3 w-full max-w-sm">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ background: `rgba(74,136,186,${0.2 + i * 0.06})`, height: `${h}%` }}
            animate={{ height: [`${h}%`, `${h + 8}%`, `${h}%`] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
          />
        ))}
      </div>
      {/* Trend line */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none">
        <polyline
          points="20,160 60,130 100,145 140,100 180,115 220,80 260,95 300,60 340,75 380,40"
          fill="none"
          stroke="#4a88ba"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function HabitatVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Property cards */}
      {[
        { x: '-55%', y: '10%',  rotate: '-6deg' },
        { x: '0%',   y: '-5%',  rotate: '2deg'  },
        { x: '55%',  y: '8%',   rotate: '7deg'  },
      ].map((style, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-40 rounded-xl overflow-hidden border border-[rgba(122,106,154,0.25)]"
          style={{
            left: '50%',
            top:  '50%',
            translateX: style.x,
            translateY: style.y,
            rotate: style.rotate,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        >
          <div
            className="w-full h-3/5"
            style={{ background: `linear-gradient(135deg, rgba(122,106,154,${0.15 + i * 0.08}), rgba(8,8,8,0.9))` }}
          />
          <div className="p-2">
            <div className="h-1.5 w-14 rounded bg-[rgba(122,106,154,0.3)] mb-1.5" />
            <div className="h-1 w-10 rounded bg-[rgba(122,106,154,0.15)]" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl glass
                 hover:border-[var(--border-warm)] transition-all duration-700"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual pane — order swaps on even rows */}
      <div
        className={`relative min-h-[320px] lg:min-h-[420px] ${isEven ? 'lg:order-last' : ''}`}
        style={{ background: project.hue }}
      >
        {/* Project number — large ambient */}
        <div
          className="absolute bottom-4 right-6 font-display font-bold select-none pointer-events-none"
          style={{ fontSize: '8rem', color: `${project.accent}12`, lineHeight: 1 }}
        >
          {project.id}
        </div>

        {project.visual}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `rgba(8,8,8,0.7)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 border border-[var(--accent)]
                       text-[var(--accent)] font-mono text-xs tracking-widest uppercase
                       hover:bg-[var(--accent)] hover:text-[#080808] transition-all duration-300"
            data-hover
          >
            View Case Study ↗
          </a>
        </motion.div>
      </div>

      {/* Info pane */}
      <div className="flex flex-col justify-center p-10 lg:p-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: project.accent }}>
            {project.id}
          </span>
          <div className="w-8 h-px" style={{ background: project.accent }} />
          <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.2em] uppercase">
            {project.cat}
          </span>
          <span className="ml-auto font-mono text-[10px] text-[var(--muted)] tracking-wide">
            {project.year}
          </span>
        </div>

        <h3
          className="font-display font-medium text-[var(--text)] mb-5 leading-[1.1]"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
        >
          {project.name}
        </h3>

        <p className="font-body text-[var(--muted)] text-sm leading-relaxed mb-8 max-w-sm">
          {project.desc}
        </p>

        {/* Impact stats */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.impact.map(stat => (
            <span
              key={stat}
              className="px-3 py-1.5 rounded-md font-mono text-[10px] tracking-wide"
              style={{
                background: `${project.accent}12`,
                border:     `1px solid ${project.accent}30`,
                color:      project.accent,
              }}
            >
              {stat}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span
              key={t}
              className="font-mono text-[10px] text-[var(--muted)] tracking-wide px-2.5 py-1
                         border border-[var(--border)] rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#"
          className="mt-10 flex items-center gap-2 text-[var(--text)] font-heading font-medium text-sm
                     group w-fit"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
          data-hover
        >
          <span>View full case study</span>
          <motion.span
            className="inline-block"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            →
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  )
}

// ─── Projects Section ─────────────────────────────────────────

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="section-pad">
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
          <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.25em] uppercase">Selected Work</span>
        </motion.div>

        {/* Heading */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20 items-end">
          <motion.h2
            className="font-display font-medium leading-[1.1]"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: 'var(--text)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Things I've<br />
            <em className="italic font-light text-[var(--muted)]">built & shipped.</em>
          </motion.h2>
          <motion.p
            className="font-body text-[var(--muted)] text-base leading-relaxed max-w-md lg:ml-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Each project is a case study in solving real problems with precision engineering
            and thoughtful design. These aren't side projects — they're shipped, used, loved.
          </motion.p>
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Archive CTA */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="#"
            className="group flex items-center gap-3 font-mono text-[11px] text-[var(--muted)]
                       tracking-widest uppercase hover:text-[var(--accent)] transition-colors duration-300"
            data-hover
          >
            <span className="w-8 h-px bg-[var(--muted)] group-hover:bg-[var(--accent)] group-hover:w-12 transition-all duration-300" />
            View all projects
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

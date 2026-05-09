'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Work',       href: '#projects' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-16
          flex items-center justify-between transition-all duration-500
          ${scrolled
            ? 'py-4 bg-[rgba(8,8,8,0.85)] backdrop-blur-xl border-b border-[var(--border)]'
            : 'py-7'}
        `}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-display italic text-[var(--text)] text-2xl leading-none select-none"
          data-hover
        >
          rk.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="font-mono text-[10px] text-[var(--muted)] tracking-[0.2em] uppercase
                         hover:text-[var(--text)] transition-colors duration-300 relative group"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.08, duration: 0.6 }}
              data-hover
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5
                     border border-[var(--accent)] text-[var(--accent)]
                     font-mono text-[10px] tracking-[0.2em] uppercase
                     hover:bg-[var(--accent)] hover:text-[#080808]
                     transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          data-hover
        >
          Hire me
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-px bg-[var(--text)]"
            animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-4 h-px bg-[var(--text)]"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-px bg-[var(--text)]"
            animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(8,8,8,0.97)] backdrop-blur-2xl
                       flex flex-col items-center justify-center gap-10 md:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 4%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 4%)' }}
            exit={{   opacity: 0, clipPath: 'circle(0% at 95% 4%)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="font-display italic text-5xl text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-8 py-3 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs tracking-widest uppercase"
            >
              Hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

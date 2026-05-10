'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'

const links = [
  { label: 'Experience', href: '#experience' },
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Contact',    href: '#contact'    },
]

// ─── Sun / Moon icons ─────────────────────────────────────────

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5"  />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22"   x2="6.34" y2="6.34"   />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78"  x2="6.34" y2="17.66"  />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

// ─── Theme toggle button ──────────────────────────────────────

function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <motion.button
      onClick={toggle}
      className="relative w-8 h-8 flex items-center justify-center rounded-full
                 border border-[var(--border)] text-[var(--muted)]
                 hover:border-[var(--accent)] hover:text-[var(--accent)]
                 transition-colors duration-300"
      whileTap={{ scale: 0.85 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      data-hover
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate:  60, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

// ─── Navigation ───────────────────────────────────────────────

export default function Navigation() {
  const { theme } = useTheme()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrolledBg = theme === 'dark'
    ? 'bg-[rgba(8,8,8,0.88)] backdrop-blur-xl border-b border-[var(--border)]'
    : 'bg-[rgba(245,240,232,0.88)] backdrop-blur-xl border-b border-[var(--border)]'

  return (
    <>
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-16
          flex items-center justify-between transition-all duration-500
          ${scrolled ? `py-4 ${scrolledBg}` : 'py-7'}
        `}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
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
              className="font-mono text-[10px] tracking-[0.2em] uppercase
                         hover:text-[var(--text)] transition-colors duration-300 relative group"
              style={{ color: 'var(--nav-link)' }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: 0.9 + i * 0.08, duration: 0.6 }}
              data-hover
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Right controls */}
        <motion.div
          className="hidden md:flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5
                       border border-[var(--accent)] text-[var(--accent)]
                       font-mono text-[10px] tracking-[0.2em] uppercase
                       hover:bg-[var(--accent)] hover:text-[var(--bg)]
                       transition-all duration-300"
            data-hover
          >
            Hire me
          </a>
        </motion.div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <motion.span className="block w-6 h-px bg-[var(--text)]"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }} />
            <motion.span className="block w-4 h-px bg-[var(--text)]"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }} />
            <motion.span className="block w-6 h-px bg-[var(--text)]"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--bg)] backdrop-blur-2xl
                       flex flex-col items-center justify-center gap-10 md:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 4%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 4%)' }}
            exit={{    opacity: 0, clipPath: 'circle(0% at 95% 4%)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="font-display italic text-5xl text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0  }}
                transition={{ delay: i * 0.08 + 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-8 py-3 border border-[var(--accent)] text-[var(--accent)]
                         font-mono text-xs tracking-widest uppercase"
            >
              Hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

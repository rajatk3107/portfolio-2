'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import Loader        from '@/components/Loader'
import Navigation    from '@/components/Navigation'
import CustomCursor  from '@/components/CustomCursor'
import About         from '@/sections/About'
import Skills        from '@/sections/Skills'
import Projects      from '@/sections/Projects'
import Experience    from '@/sections/Experience'
import Contact       from '@/sections/Contact'

// Avoid SSR for the heavy hero (Three.js)
const Hero = dynamic(() => import('@/sections/Hero'), { ssr: false })

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth scroll via Lenis
  useEffect(() => {
    if (loading) return
    let lenis: import('lenis').default | null = null

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      function raf(time: number) {
        lenis!.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })

    return () => { lenis?.destroy() }
  }, [loading])

  if (!mounted) return null

  return (
    <>
      <CustomCursor />

      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <footer className="border-t border-[var(--border)] py-8 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display italic text-xl text-[var(--text)]">rk.</span>
          <span className="font-mono text-xs text-[var(--muted)] tracking-widest">
            © 2024 RAJAT K. — ALL RIGHTS RESERVED
          </span>
          <a
            href="#hero"
            className="font-mono text-xs text-[var(--muted)] tracking-widest hover:text-[var(--accent)] transition-colors duration-300"
          >
            BACK TO TOP ↑
          </a>
        </footer>
      </div>
    </>
  )
}

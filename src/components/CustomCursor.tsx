'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export default function CustomCursor() {
  const [pos,   setPos]   = useState({ x: -100, y: -100 })
  const [state, setState] = useState<'default' | 'hover' | 'click'>('default')
  const frameRef = useRef<number>(0)
  const { theme } = useTheme()

  const springCfg = { stiffness: 90, damping: 16, mass: 0.08 }
  const rx = useSpring(-100, springCfg)
  const ry = useSpring(-100, springCfg)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      rx.set(e.clientX)
      ry.set(e.clientY)
    }
    const onDown = () => setState('click')
    const onUp   = () => setState(s => s === 'click' ? 'default' : s)

    const attachHover = () => {
      document.querySelectorAll<HTMLElement>('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => setState('hover'))
        el.addEventListener('mouseleave', () => setState(s => s === 'hover' ? 'default' : s))
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })
    attachHover()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      observer.disconnect()
      cancelAnimationFrame(frameRef.current)
    }
  }, [rx, ry])

  const ringSize = state === 'hover' ? 52 : state === 'click' ? 22 : 32
  const ringOp   = state === 'click' ? 0.55 : 0.9
  const dotSize  = state === 'click' ? 3 : 5

  // 'screen' glows on dark; 'multiply' darkens on light — both make the cursor visible
  const blendMode = theme === 'light' ? 'multiply' : 'screen'

  // In light mode use a slightly darker, more opaque accent so multiply renders crisply
  const dotColor  = theme === 'light' ? '#7a5e28' : 'var(--accent)'
  const ringColor = theme === 'light' ? '#7a5e28' : 'var(--accent)'

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: rx,
          y: ry,
          width:      ringSize,
          height:     ringSize,
          translateX: -ringSize / 2,
          translateY: -ringSize / 2,
          opacity:    ringOp,
          border:     `1.5px solid ${ringColor}`,
          mixBlendMode: blendMode,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      />

      {/* Precise dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x:      pos.x - dotSize / 2,
          y:      pos.y - dotSize / 2,
          width:  dotSize,
          height: dotSize,
          background:   dotColor,
          mixBlendMode: blendMode,
        }}
      />
    </>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [state, setState] = useState<'default' | 'hover' | 'click'>('default')
  const frameRef = useRef<number>(0)
  const rawPos = useRef({ x: -100, y: -100 })

  const springCfg = { stiffness: 90, damping: 16, mass: 0.08 }
  const rx = useSpring(-100, springCfg)
  const ry = useSpring(-100, springCfg)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY }
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

    // Re-attach hover listeners after DOM changes
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

  const ringSize  = state === 'hover' ? 52 : state === 'click' ? 22 : 32
  const ringOp    = state === 'click' ? 0.5 : 0.85
  const dotSize   = state === 'click' ? 3   : 5

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-[var(--accent)]"
        style={{
          x: rx,
          y: ry,
          width:  ringSize,
          height: ringSize,
          translateX: -ringSize / 2,
          translateY: -ringSize / 2,
          opacity:    ringOp,
          mixBlendMode: 'screen',
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      />

      {/* Precise dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-[var(--accent)]"
        style={{
          x: pos.x - dotSize / 2,
          y: pos.y - dotSize / 2,
          width:  dotSize,
          height: dotSize,
          mixBlendMode: 'screen',
        }}
      />
    </>
  )
}

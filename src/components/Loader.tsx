'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [done,     setDone]     = useState(false)

  useEffect(() => {
    // Organic loading progress — not linear
    const steps = [12, 28, 47, 61, 73, 84, 92, 97, 100]
    let i = 0

    const tick = () => {
      if (i >= steps.length) return
      setProgress(steps[i++])
      if (i < steps.length) {
        setTimeout(tick, 120 + Math.random() * 180)
      } else {
        setTimeout(() => setDone(true), 400)
        setTimeout(onComplete, 1100)
      }
    }

    setTimeout(tick, 300)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[var(--bg)] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Large ambient initial */}
          <div
            className="absolute select-none pointer-events-none font-display italic"
            style={{
              fontSize: 'clamp(120px, 25vw, 280px)',
              color: 'rgba(196,162,90,0.04)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              lineHeight: 1,
            }}
          >
            R
          </div>

          {/* Progress number */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="font-mono text-[var(--accent)] tracking-[0.3em] text-sm">
              {String(Math.round(progress)).padStart(3, '0')}
            </div>

            {/* Progress track */}
            <div className="relative w-48 h-px bg-[var(--muted-2)] overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--accent)] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            <div className="font-mono text-[var(--muted)] tracking-widest text-[10px] uppercase">
              Loading portfolio
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

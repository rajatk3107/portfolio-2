'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
  as?: 'a' | 'button'
  type?: 'button' | 'submit'
  disabled?: boolean
  'data-hover'?: boolean
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.38,
  as: Tag = href ? 'a' : 'button',
  type,
  disabled,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width  / 2) * strength)
    y.set((e.clientY - rect.top  - rect.height / 2) * strength)
  }

  const handleLeave = () => { x.set(0); y.set(0) }

  const MotionTag = motion[Tag as 'a' | 'button']

  return (
    <MotionTag
      ref={ref as never}
      href={href}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      data-hover
    >
      {children}
    </MotionTag>
  )
}

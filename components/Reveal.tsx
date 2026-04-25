'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

export function Reveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  }

  const initialOffset = directionOffset[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1], // premium cubic-bezier ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

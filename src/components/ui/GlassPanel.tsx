import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'strong' | 'elevated'
  glow?: 'blue' | 'violet' | 'white' | 'none'
  hover?: boolean
  onClick?: () => void
}

export default function GlassPanel({
  children, className = '', variant = 'default', glow = 'none', hover = false, onClick,
}: GlassPanelProps) {
  const variantMap = {
    default: 'glass',
    strong: 'glass-strong',
    elevated: 'glass-elevated',
  }
  const glowMap = {
    blue: 'glow-blue', violet: 'glow-violet', white: 'glow-white', none: '',
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${variantMap[variant]} ${glowMap[glow]} ${className}`}
      whileHover={hover ? { scale: 1.015, y: -4, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } : undefined}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(59,130,246,0.02) 100%)',
        }}
      />
      {children}
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { useId } from 'react'

interface SunSVGProps {
  size?: number
  className?: string
  pulsating?: boolean
  showRays?: boolean
}

export default function SunSVG({ size = 200, className, pulsating = true, showRays = true }: SunSVGProps) {
  const uid = useId()

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      className={className}
      animate={pulsating ? { scale: [1, 1.02, 1] } : undefined}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        <radialGradient id={`${uid}-sun`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFF5E0" />
          <stop offset="25%" stopColor="#FFE066" />
          <stop offset="50%" stopColor="#FFB733" />
          <stop offset="75%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF6600AA" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="50%" stopColor="#FFB73344" />
          <stop offset="70%" stopColor="#FF8C0022" />
          <stop offset="100%" stopColor="#FF660000" />
        </radialGradient>
        <filter id={`${uid}-corona`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={`${uid}-glow-filter`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {showRays && (
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '200px 200px' }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x = 200 + Math.cos(angle) * 160
            const y = 200 + Math.sin(angle) * 160
            return (
              <motion.line
                key={i}
                x1="200" y1="200" x2={x} y2={y}
                stroke="#FFB733"
                strokeWidth={1.5}
                opacity={0.15}
                animate={{ opacity: [0.08, 0.2, 0.08] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
              />
            )
          })}
        </motion.g>
      )}

      <circle cx="200" cy="200" r={120} fill={`url(#${uid}-glow)`} filter={`url(#${uid}-corona)`} />

      <motion.circle
        cx="200" cy="200" r={90}
        fill={`url(#${uid}-sun)`}
        filter={`url(#${uid}-glow-filter)`}
        animate={pulsating ? { r: [90, 95, 90] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {showRays && (
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '200px 200px' }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180
            const x1 = 200 + Math.cos(angle) * 95
            const y1 = 200 + Math.sin(angle) * 95
            const x2 = 200 + Math.cos(angle) * 140
            const y2 = 200 + Math.sin(angle) * 140
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFE066" strokeWidth={2} opacity={0.1} strokeLinecap="round" />
            )
          })}
        </motion.g>
      )}

      <circle cx="200" cy="200" r={88} fill="none" stroke="#FFE066" strokeWidth={1} opacity={0.15} />

      <ellipse cx="155" cy="145" rx="35" ry="25" fill="white" opacity={0.08} style={{ filter: 'blur(12px)' }} />
    </motion.svg>
  )
}

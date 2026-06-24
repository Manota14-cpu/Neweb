import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface PremiumButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  href?: string
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

export default function MagneticButton({
  children, onClick, className = '', href, size = 'md', style,
}: PremiumButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15 })
  const sy = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25)
  }

  const sizeMap = {
    sm: 'px-4 py-2 text-[9px]',
    md: 'px-6 py-3 text-[10px]',
    lg: 'px-10 py-4 text-xs',
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: sx, y: sy, ...style }}
      className={`relative inline-flex items-center gap-2 rounded font-heading font-medium tracking-[0.2em] uppercase cursor-pointer overflow-hidden light-sweep ${sizeMap[size]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  )

  if (href) return <a href={href} className="inline-block">{content}</a>
  return <button onClick={onClick}>{content}</button>
}

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { getSharedMouse } from '@/hooks/useMousePosition'

export default function SunCorona() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let animId: number
    const tick = () => {
      const m = getSharedMouse()
      el.style.transform = `translate(-50%, -50%) translate(${m.normalizedX * -8}px, ${m.normalizedY * -8}px)`
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        width: '80vmin',
        height: '80vmin',
        left: '50%',
        top: '50%',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,200,100,0.15) 0%, rgba(255,150,50,0.08) 30%, rgba(255,100,30,0.03) 60%, transparent 80%)',
          filter: 'blur(30px)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-[5%] rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #FFD700 0%, #FF8C00 40%, #FF4500 70%, transparent 85%)',
          filter: 'blur(40px)',
          opacity: 0.4,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-[15%] rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.6), rgba(255,140,0,0.3) 50%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-[25%] rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,200,0.9), rgba(255,200,100,0.5) 30%, rgba(255,150,50,0.2) 60%, transparent)',
          filter: 'blur(8px)',
          boxShadow: '0 0 100px rgba(255,200,100,0.2), 0 0 200px rgba(255,150,50,0.1)',
        }}
      />

      <motion.div
        className="absolute inset-[35%] rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95), rgba(255,255,200,0.5) 50%, transparent)',
          filter: 'blur(4px)',
        }}
      />

      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const len = 45 + Math.sin(i * 2.7) * 15
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 2,
              height: `${len}%`,
              left: '50%',
              top: `${50 - len / 2}%`,
              transformOrigin: 'center center',
              rotate: `${(angle * 180) / Math.PI}deg`,
              background: `linear-gradient(to top, rgba(255,200,100,0.15), transparent)`,
              filter: 'blur(1px)',
            }}
            animate={{ opacity: [0.1, 0.3, 0.1], scaleY: [1, 1.3, 1] }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        )
      })}
    </motion.div>
  )
}

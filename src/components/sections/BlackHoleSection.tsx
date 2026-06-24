import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { fadeInUp, staggerContainer, easeOutExpo } from '@/animations/variants'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getSharedMouse } from '@/hooks/useMousePosition'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionHeader from '@/components/ui/SectionHeader'

export default function BlackHoleSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })
  const bhRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = bhRef.current
    const img = imgRef.current
    if (!el || !img) return
    let animId: number
    const tick = () => {
      const m = getSharedMouse()
      el.style.transform = `translate(${m.normalizedX * -15}px, ${m.normalizedY * -15}px)`
      img.style.transform = `translate(${m.normalizedX * 5}px, ${m.normalizedY * 5}px)`
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <motion.section id="black-hole" className="relative min-h-screen py-16 md:py-20 overflow-hidden flex items-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.img
          ref={imgRef}
          src="/black-hole.jpg"
          alt="M87* supermassive black hole"
          className="absolute w-[70vmin] h-[70vmin] object-cover rounded-full"
          style={{ filter: 'blur(2px) saturate(0.6)' }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          ref={bhRef}
          className="rounded-full"
          style={{
            width: '50vmin',
            height: '50vmin',
            background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(10,0,20,0.8) 30%, rgba(30,0,50,0.3) 60%, transparent 80%)',
            boxShadow: '0 0 200px rgba(127,92,255,0.05), inset 0 0 200px rgba(0,0,0,0.8)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute inset-[15%] rounded-full"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(127,92,255,0.1), transparent 60%)',
              filter: 'blur(30px)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-[5%] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(127,92,255,0.05), transparent, rgba(77,163,255,0.05), transparent)',
              filter: 'blur(20px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div ref={ref}>
          <SectionHeader title={t('blackhole.title')} subtitle={t('blackhole.subtitle')} tag={t('blackhole.tag')} />
        </div>

        <motion.div
          className="max-w-2xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.p
            className="text-base md:text-lg leading-relaxed font-body mb-8"
            style={{ color: 'white' }}
            variants={fadeInUp}
          >
            {t('blackhole.desc')}
          </motion.p>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={fadeInUp}>
            {[
              { label: t('blackhole.stat1.label'), value: t('blackhole.stat1.value') },
              { label: t('blackhole.stat2.label'), value: t('blackhole.stat2.value') },
              { label: t('blackhole.stat3.label'), value: t('blackhole.stat3.value') },
              { label: t('blackhole.stat4.label'), value: t('blackhole.stat4.value') },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl" style={{ background: 'rgba(127,92,255,0.03)', border: '1px solid rgba(127,92,255,0.06)' }}>
<p className="text-[10px] uppercase tracking-wider font-body mb-1 text-white">{stat.label}</p>
                <p className="text-xs text-white font-body">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

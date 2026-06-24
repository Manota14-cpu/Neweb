import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { fadeInUp, staggerContainer, easeOutExpo } from '@/animations/variants'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useLanguage } from '@/contexts/LanguageContext'
import MagneticButton from '@/components/ui/MagneticButton'

export default function DeepSpace() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const { ref: contentRef, isVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])
  const [audioOn, setAudioOn] = useState(false)

  useEffect(() => {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 55
    gain.gain.value = 0
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()

    if (audioOn) {
      gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 1)
    } else {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
    }

    return () => {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)
      setTimeout(() => { osc.stop(); ctx.close() }, 500)
    }
  }, [audioOn])

  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 1.2 + 0.3,
    delay: Math.random() * 5, duration: Math.random() * 4 + 2,
  }))

  return (
    <motion.section
      ref={ref}
      id="deep-space"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 0%, #000000 100%)',
        }}
      />

      {stars.map((star, i) => (
        <motion.div
          key={i} className="absolute rounded-full pointer-events-none"
          style={{
            left: `${star.x}%`, top: `${star.y}%`,
            width: star.size, height: star.size,
            background: '#C7D7FF',
            boxShadow: `0 0 ${star.size * 3}px rgba(199,215,255,0.15)`,
          }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.div variants={fadeInUp} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(199,215,255,0.02)', border: '1px solid rgba(199,215,255,0.04)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" />
            <span className="text-[8px] tracking-[0.35em] uppercase font-body text-white">
              {t('deepspace.title')}
            </span>
          </div>
        </motion.div>

        <motion.h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8" variants={fadeInUp}>
          <span className="text-cosmos-reverse">{t('deepspace.space')}</span>
          <br />
          <span className="text-white">{t('deepspace.neverEnds')}</span>
        </motion.h2>

        <motion.p className="text-base md:text-lg max-w-lg mx-auto mb-12 font-body font-light leading-relaxed text-white" variants={fadeInUp}>
          {t('deepspace.subtitle')}
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" variants={fadeInUp}>
          <MagneticButton
            className="text-white"
            style={{
              background: 'linear-gradient(135deg, rgba(77,163,255,0.12), rgba(127,92,255,0.12))',
              border: '1px solid rgba(199,215,255,0.08)',
            }}
            href="#hero"
          >
            <span className="flex items-center gap-2">
              {t('deepspace.rebegin')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </MagneticButton>

          <button
            onClick={() => setAudioOn(!audioOn)}
            className="px-6 py-4 rounded-full text-[10px] tracking-[0.2em] uppercase font-body transition-all duration-300"
            style={{
              background: audioOn ? 'rgba(77,163,255,0.08)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${audioOn ? 'rgba(77,163,255,0.15)' : 'rgba(199,215,255,0.04)'}`,
              color: audioOn ? 'white' : 'white',
            }}
          >
            <span className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                {audioOn ? (
                  <><path d="M2 4h2l3-3v10L4 8H2V4z" fill="currentColor"/><path d="M8 4a2.5 2.5 0 010 4M10 3a5 5 0 010 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></>
                ) : (
                  <><path d="M2 4h2l3-3v10L4 8H2V4z" fill="currentColor"/><path d="M8 4l3 4M11 4l-3 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></>
                )}
              </svg>
              {audioOn ? t('deepspace.audio.on') : t('deepspace.audio.off')}
            </span>
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

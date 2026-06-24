import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRef, useState, useEffect } from 'react'
import { staggerContainer, fadeIn, fadeInUp, easeOutExpo } from '@/animations/variants'
import { getSharedMouse } from '@/hooks/useMousePosition'
import { useLanguage } from '@/contexts/LanguageContext'
import SunCorona from '@/components/effects/SunCorona'
import MagneticButton from '@/components/ui/MagneticButton'
import PlanetSVG from '@/components/planets/PlanetSVG'
import starPulsar from '@/data/star-pulsar.json'

const LottiePlayer = dynamic(() => import('@/components/ui/LottiePlayer'), { ssr: false })

const easeOutBack: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

function ShootingStar() {
  const [pos, setPos] = useState({ x: 0, y: 0, active: false })

  useEffect(() => {
    const spawn = () => {
      setPos({
        x: Math.random() * 80 + 10,
        y: Math.random() * 40 + 5,
        active: true,
      })
      setTimeout(() => setPos(prev => ({ ...prev, active: false })), 1500)
    }
    spawn()
    const interval = setInterval(spawn, 4000 + Math.random() * 4000)
    return () => clearInterval(interval)
  }, [])

  if (!pos.active) return null

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      initial={{ x: -100, y: -100, opacity: 0 }}
      animate={{ x: 300, y: 300, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <svg width="40" height="2" viewBox="0 0 40 2">
        <defs>
          <linearGradient id="shooting-star" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(199,215,255,0.6)" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
        </defs>
        <line x1="0" y1="1" x2="40" y2="1" stroke="url(#shooting-star)" strokeWidth="1" />
      </svg>
      <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-white" style={{ boxShadow: '0 0 6px 2px rgba(199,215,255,0.5)' }} />
    </motion.div>
  )
}

function LetterReveal({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -60 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: i * 0.025, duration: 0.5, ease: easeOutBack }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span className={className}>
      {displayed}
      {!done && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block w-[2px] h-[1em] ml-0.5 align-middle" style={{ background: 'rgba(199,215,255,0.3)' }} />}
    </span>
  )
}

function OrbitingPlanet({ index, color, size, distance, planetId }: { index: number; color: string; size: number; distance: number; planetId: string }) {
  const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
  const orbitRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = orbitRef.current
    if (!el) return
    let animId: number
    const tick = () => {
      const m = getSharedMouse()
      el.style.transform = `translate(${m.normalizedX * (index + 1) * 2}px, ${m.normalizedY * (index + 1) * 2}px)`
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [index])
  return (
    <motion.div
      ref={orbitRef}
      className="absolute"
      style={{
        width: 0, height: 0,
        left: '50%', top: '50%',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 40 + index * 15, repeat: Infinity, ease: 'linear' }}
    >
      <motion.div
        className="absolute"
        style={{
          left: -size / 2 - (index === 4 ? 60 : 0),
          top: -distance,
        }}
      >
        <PlanetSVG planetId={planets[index]} size={Math.max(6, size * 1.5)} animate={false} />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 0.92])
  const y = useTransform(scrollY, [0, 500], [0, -80])
  const { t } = useLanguage()

  const planets = [
    { color: '#B5B5B5', size: 6, distance: 180, id: 'mercury' },
    { color: '#E8C87A', size: 10, distance: 230, id: 'venus' },
    { color: '#4B7BE5', size: 12, distance: 280, id: 'earth' },
    { color: '#E07040', size: 8, distance: 330, id: 'mars' },
    { color: '#D4A574', size: 22, distance: 400, id: 'jupiter' },
    { color: '#E8D5A3', size: 18, distance: 480, id: 'saturn' },
    { color: '#7EC8E3', size: 12, distance: 550, id: 'uranus' },
    { color: '#3B5C9C', size: 11, distance: 620, id: 'neptune' },
  ]

  return (
    <motion.section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      <ShootingStar />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
        {planets.map((p, i) => (
          <OrbitingPlanet key={p.id} index={i} color={p.color} size={p.size} distance={p.distance} planetId={p.id} />
        ))}
      </div>

      <SunCorona />

      <motion.div
        className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, y }}
      >
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.03) 0%, transparent 60%)',
        }} />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ y }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn} className="mb-8">
          <span
            className="inline-block px-5 py-2 rounded-full text-[10px] tracking-[0.35em] uppercase font-body relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'white',
            }}
          >
            <motion.span
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {t('hero.badge')}
          </span>
        </motion.div>

        <motion.h1 className="font-heading text-6xl sm:text-7xl md:text-[9rem] lg:text-[11rem] font-bold leading-[0.85] mb-6 tracking-tight" variants={fadeInUp}>
          <span className="text-white">
            <LetterReveal text={t('hero.heading.line1')} />
          </span>
          <br />
          <span className="text-white">{t('hero.heading.line2')}</span>
          <br />
          <span className="text-white">{t('hero.heading.line3')}</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg max-w-xl mx-auto mb-10 font-body font-light leading-relaxed min-h-[1.5em] text-white"
          variants={fadeInUp}
        >
          <TypewriterText text={t('hero.subtitle')} />
        </motion.p>

        <motion.div variants={fadeInUp}>
          <MagneticButton
            className=""
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
            href="#planets"
          >
            <span className="flex items-center gap-3">
              {t('hero.cta')}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 right-12 z-10 pointer-events-none opacity-30">
        <LottiePlayer animationData={starPulsar} style={{ width: 120, height: 120 }} />
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[8px] tracking-[0.4em] uppercase font-body text-white">
          {t('hero.scroll')}
        </span>
        <motion.svg
          width="16" height="24" viewBox="0 0 16 24"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(250,250,250,0.12)" strokeWidth="1.5" fill="none" />
          <motion.circle
            cx="8" cy="8" r="2.5" fill="rgba(250,250,250,0.2)"
            animate={{ cy: [8, 16, 8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.svg>
      </motion.div>
    </motion.section>
  )
}

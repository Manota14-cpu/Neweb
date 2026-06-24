import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { planets } from '@/data/planets'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionHeader from '@/components/ui/SectionHeader'
import PlanetSVG from '@/components/planets/PlanetSVG'
import SunSVG from '@/components/planets/SunSVG'
import { getSharedMouse } from '@/hooks/useMousePosition'

function PlanetOrbit({ planet, index, isVisible }: { planet: typeof planets[0]; index: number; total: number; isVisible: boolean }) {
  const [hovered, setHovered] = useState(false)
  const orbitRadius = 160 + Math.log(planet.orbitRadius + 0.5) * 130
  const dotSize = 16 + Math.min(planet.size, 8) * 6
  const wrapperRef = useRef<HTMLDivElement>(null)
  const orbitDuration = 30 + index * 15

  useEffect(() => {
    const el = wrapperRef.current
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
      ref={wrapperRef}
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '50%', width: 0, height: 0 }}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: hovered ? 1 : 0.7 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8 }}
    >
      <svg
        className="absolute pointer-events-none"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
          left: -orbitRadius,
          top: -orbitRadius,
        }}
      >
        <circle
          cx={orbitRadius}
          cy={orbitRadius}
          r={orbitRadius - 1}
          fill="none"
          stroke={hovered ? `${planet.color}55` : 'rgba(199,215,255,0.05)'}
          strokeWidth={hovered ? 2.5 : 1.5}
          strokeDasharray="3 8"
          style={{ transition: 'stroke 0.3s' }}
        />
      </svg>

      <motion.div
        className="absolute"
        style={{
          left: 0,
          top: -orbitRadius,
          width: 0,
          height: 0,
          transformOrigin: `0 ${orbitRadius}px`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute"
          style={{
            left: -dotSize / 2,
            top: -dotSize / 2,
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.8, zIndex: 30 }}
        >
          <PlanetSVG planetId={planet.id} size={dotSize} animate={false} />
          <motion.span
            className="absolute whitespace-nowrap font-body tracking-wider uppercase"
            style={{
              left: '50%',
              top: dotSize + 8,
              translateX: '-50%',
              color: planet.color,
              fontSize: hovered ? '10px' : '8px',
              letterSpacing: '0.2em',
              textShadow: '0 0 20px rgba(0,0,0,0.8)',
            }}
            animate={{ opacity: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {planet.name}
            {hovered && (
              <span className="block text-[7px] font-normal mt-0.5 text-white">
                {planet.distanceFromSun}
              </span>
            )}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function OrbitSystem() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const { ref: headerRef, isVisible } = useIntersectionObserver({ threshold: 0.15 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])
  const sunRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sunRef.current
    if (!el) return
    let animId: number
    const tick = () => {
      const m = getSharedMouse()
      el.style.transform = `translate(-50%, -50%) translate(${m.normalizedX * 6}px, ${m.normalizedY * 6}px)`
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <motion.section id="solar-system" ref={ref} className="relative overflow-hidden" style={{ opacity }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headerRef}>
          <SectionHeader title={t('orbitsystem.title')} subtitle={t('orbitsystem.subtitle')} tag={t('orbitsystem.tag')} />
        </div>

        <motion.div className="relative w-full max-w-3xl lg:max-w-5xl mx-auto" style={{ aspectRatio: '1 / 1', scale, perspective: '1000px' }}>
          <div
            ref={sunRef}
            className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <SunSVG size={240} />
          </div>

          {planets.map((planet, i) => (
            <PlanetOrbit key={planet.id} planet={planet} index={i} total={planets.length} isVisible={isVisible} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

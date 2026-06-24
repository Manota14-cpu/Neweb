import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { discoveries } from '@/data/discoveries'
import { fadeInUp, staggerContainer, easeOutExpo } from '@/animations/variants'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getSharedMouse } from '@/hooks/useMousePosition'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionHeader from '@/components/ui/SectionHeader'

function DiscoveryItem({ discovery, index, t }: { discovery: typeof discoveries[0]; index: number; t: (key: any) => string }) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 })
  const parallaxRef = useRef<HTMLDivElement>(null)
  const isLeft = index % 2 === 0

  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return
    let animId: number
    const tick = () => {
      const m = getSharedMouse()
      el.style.transform = `translate(${m.normalizedX * (isLeft ? 5 : -5)}px, ${m.normalizedY * (isLeft ? 5 : -5)}px)`
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [isLeft])

  return (
    <motion.div ref={ref} className="relative mb-20 md:mb-28 last:mb-0">
      <div className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${isLeft ? '' : 'md:direction-rtl'}`}>
        <motion.div
          className={`relative ${isLeft ? 'md:order-1' : 'md:order-2'}`}
          initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <motion.div
            ref={parallaxRef}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${discovery.gradient})`,
            }}
          >
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent)',
            }} />
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-2">
              {discovery.stats.map((stat, si) => (
                <div key={stat.label} className="p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
                  <p className="text-[10px] font-bold text-white">{stat.value}</p>
                  <p className="text-[7px] text-white uppercase tracking-wider font-body">{t(`discoveries.item.${discovery.id}.stat.${si}`)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={`space-y-5 ${isLeft ? 'md:order-2' : 'md:order-1'}`}
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.span className="inline-block text-[10px] tracking-[0.3em] uppercase font-body text-white" variants={fadeInUp}>
            {t(`discoveries.item.${discovery.id}.date`)}
          </motion.span>
          <motion.h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-white" variants={fadeInUp}>
            {t(`discoveries.item.${discovery.id}.title`)}
          </motion.h3>
          <motion.p className="text-sm md:text-base leading-relaxed font-body text-white" variants={fadeInUp}>
            {t(`discoveries.item.${discovery.id}.description`)}
          </motion.p>
          <motion.div className="p-4 rounded-xl bg-white/5 border border-white/10" variants={fadeInUp}>
            <motion.p className="text-[10px] uppercase tracking-wider font-body mb-1 text-white">{t('discoveries.significance')}</motion.p>
            <p className="text-sm font-body text-white">{t(`discoveries.item.${discovery.id}.significance`)}</p>
          </motion.div>
          <motion.p className="text-xs font-body text-white" variants={fadeInUp}>
            {t(`discoveries.item.${discovery.id}.keyFigure`)}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Discoveries() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start end', 'end start'] })
  const lineH = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '100%', '100%'])

  return (
    <motion.section id="discoveries" className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader title={t('discoveries.title')} subtitle={t('discoveries.subtitle')} tag={t('discoveries.tag')} />

        <div ref={timelineRef} className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="w-full h-full" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }} />
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ height: lineH, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.15))' }}
            />
          </div>

          {discoveries.map((d, i) => (
            <div key={d.id} className="relative">
              <motion.div
                className="absolute left-0 md:left-1/2 top-12 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                style={{
                  background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))',
                  boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent)' }}
                  animate={{ scale: [1, 2.5, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <DiscoveryItem discovery={d} index={i} t={t} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

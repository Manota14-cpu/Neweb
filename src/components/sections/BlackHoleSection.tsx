import { motion } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionHeader from '@/components/ui/SectionHeader'

export default function BlackHoleSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <motion.section id="black-hole" className="relative min-h-screen py-16 md:py-20 overflow-hidden flex items-center">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <SectionHeader title={t('blackhole.title')} subtitle={t('blackhole.subtitle')} tag={t('blackhole.tag')} />
            <motion.p className="text-base md:text-lg leading-relaxed font-body mb-8 text-white" variants={fadeInUp}>
              {t('blackhole.desc')}
            </motion.p>
            <motion.div className="grid grid-cols-2 gap-4" variants={fadeInUp}>
              {[
                { label: t('blackhole.stat1.label'), value: t('blackhole.stat1.value') },
                { label: t('blackhole.stat2.label'), value: t('blackhole.stat2.value') },
                { label: t('blackhole.stat3.label'), value: t('blackhole.stat3.value') },
                { label: t('blackhole.stat4.label'), value: t('blackhole.stat4.value') },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[10px] uppercase tracking-wider font-body mb-1 text-white/50">{stat.label}</p>
                  <p className="text-xs text-white font-body">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            animate={isVisible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
          >
            <div className="relative w-[50vmin] h-[50vmin] max-w-[500px] max-h-[500px]">
              <img
                src="/black-hole.jpg"
                alt="M87* supermassive black hole"
                className="w-full h-full object-cover rounded-full"
                style={{ boxShadow: '0 0 80px rgba(255,100,50,0.15), 0 0 200px rgba(255,50,0,0.05)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

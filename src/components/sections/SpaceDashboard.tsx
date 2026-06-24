import { motion } from 'framer-motion'
import { spaceMetrics } from '@/data/universe'
import { planets } from '@/data/planets'
import { staggerContainer } from '@/animations/variants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

function MetricTile({ metric, index }: { metric: typeof spaceMetrics[0]; index: number }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="relative p-2 md:p-2.5 rounded-lg bg-black border border-gray-800/50"
      initial={{ opacity: 0, y: 12 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.16,1,0.3,1] }}
    >
      <p className="text-[8px] tracking-wider uppercase font-body text-white/40">{metric.label}</p>
      <p className="font-heading text-base md:text-lg font-bold text-white leading-tight">{metric.value}</p>
    </motion.div>
  )
}

function ScaleComparison() {
  const { t } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })
  const maxSize = Math.max(...planets.map((p) => p.size))

  return (
    <motion.div
      ref={ref}
      className="p-3 md:p-4 rounded-lg bg-black border border-gray-800/50"
      initial={{ opacity: 0, y: 12 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
    >
      <p className="text-[8px] tracking-wider uppercase font-body mb-2 text-white/40">{t('data.planetSizes')}</p>
      <div className="space-y-1">
        {planets.map((planet) => {
          const pct = Math.max(5, Math.pow(planet.size / maxSize, 0.45) * 100)
          return (
            <motion.div key={planet.id} className="flex items-center gap-2" initial={{ opacity: 0, x: -12 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ delay: planets.indexOf(planet) * 0.02 }}>
              <span className="w-14 text-right text-[9px] font-body text-white/50 truncate flex-shrink-0">{planet.name}</span>
              <div className="flex-1 flex items-center gap-1.5">
                <motion.div
                  className="h-1.5 rounded-full flex-shrink-0"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${planet.color}, ${planet.color}66)`,
                  }}
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${pct}%` } : {}}
                  transition={{ delay: planets.indexOf(planet) * 0.02, duration: 0.5, ease: [0.16,1,0.3,1] }}
                />
              </div>
              <span className="w-16 text-right text-[8px] font-body text-white/30 flex-shrink-0">{planet.diameter}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function SpaceDashboard() {
  const { t } = useLanguage()
  return (
    <section id="data" className="py-6 md:py-10">
      <div className="px-4 md:px-8">
        <header className="mb-3">
          <span className="inline-block px-2 py-0.5 rounded text-[8px] tracking-[0.2em] uppercase font-body mb-1.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'white' }}>
            {t('data.tag')}
          </span>
          <h2 className="font-heading text-xl md:text-2xl font-semibold text-white">{t('data.title')}</h2>
        </header>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 md:gap-2 mb-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {spaceMetrics.map((m, i) => <MetricTile key={m.label} metric={m} index={i} />)}
        </motion.div>

        <ScaleComparison />
      </div>
    </section>
  )
}

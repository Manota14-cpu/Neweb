import { motion } from 'framer-motion'
import { useState } from 'react'
import { universeTopics } from '@/data/universe'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionHeader from '@/components/ui/SectionHeader'

function TopicCard({ topic, index }: { topic: typeof universeTopics[0]; index: number }) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16,1,0.3,1] }}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded) } }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden cursor-pointer h-full bg-black border border-gray-800/50"
        animate={{ scale: expanded ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        whileHover={{ scale: 1.015 }}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-5">
            <span className="text-3xl">{topic.icon}</span>
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-800/50 border border-gray-700/50"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>

          <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1.5">{t(`universe.topic.${topic.id}.title`)}</h3>
          <p className="text-xs font-body mb-3" style={{ color: `${topic.color}99` }}>{t(`universe.topic.${topic.id}.subtitle`)}</p>
          <p className="text-sm leading-relaxed font-body text-white/70">{t(`universe.topic.${topic.id}.description`)}</p>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-gray-800/50">
                <p className="text-[10px] uppercase tracking-wider font-body mb-3 text-white/60">{t('universe.keyFacts')}</p>
                <ul className="space-y-2">
                  {topic.facts.map((fact, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-sm font-body text-white/70"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: topic.color }} />
                      {t(`universe.topic.${topic.id}.fact.${i}`)}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function UniverseExploration() {
  const { t } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 })

  return (
    <motion.section id="universe" className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader title={t('universe.title')} subtitle={t('universe.subtitle')} tag={t('universe.tag')} />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {universeTopics.map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} index={i} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

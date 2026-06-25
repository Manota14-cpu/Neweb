import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { planets, PlanetData } from '@/data/planets'
import { staggerContainer, easeOutExpo } from '@/animations/variants'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionHeader from '@/components/ui/SectionHeader'
import PlanetCard from '@/components/ui/PlanetCard'

function getTempRange(planet: PlanetData): 'cold' | 'moderate' | 'hot' {
  const nums = planet.temperature.match(/-?\d+/g)
  if (!nums) return 'moderate'
  const vals = nums.map(Number)
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length
  if (avg < -100) return 'cold'
  if (avg > 100) return 'hot'
  return 'moderate'
}

export default function PlanetSection() {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [tempFilter, setTempFilter] = useState('')

  const filtered = useMemo(() => {
    return planets.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.nameLatin.toLowerCase().includes(search.toLowerCase())) return false
      if (typeFilter && p.type !== typeFilter) return false
      if (tempFilter) {
        const range = getTempRange(p)
        if (range !== tempFilter) return false
      }
      return true
    })
  }, [search, typeFilter, tempFilter])

  const clearFilters = () => {
    setSearch('')
    setTypeFilter('')
    setTempFilter('')
  }

  const hasActiveFilters = search || typeFilter || tempFilter

  const typeOptions = [
    { label: t('planets.all'), value: '' },
    { label: t('planets.type.rocky'), value: 'rocky' },
    { label: t('planets.type.gas-giant'), value: 'gas-giant' },
    { label: t('planets.type.ice-giant'), value: 'ice-giant' },
  ]

  const tempOptions = [
    { label: t('planets.all'), value: '' },
    { label: t('planets.temp.cold'), value: 'cold' },
    { label: t('planets.temp.moderate'), value: 'moderate' },
    { label: t('planets.temp.hot'), value: 'hot' },
  ]

  return (
    <motion.section id="planets" className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title={t('planets.title')}
          subtitle={t('planets.subtitle')}
          tag={t('planets.tag')}
        />

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder={t('planets.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-10 py-3 rounded-full text-xs font-body outline-none transition-all duration-300 text-white bg-white/5 border border-white/10"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTypeFilter(typeFilter === opt.value ? '' : opt.value)}
                className="px-3 py-1.5 rounded-full text-[9px] tracking-wider uppercase font-body transition-all duration-300 text-white"
                style={{
                  background: typeFilter === opt.value ? 'rgba(77,163,255,0.12)' : 'rgba(199,215,255,0.02)',
                  border: `1px solid ${typeFilter === opt.value ? 'rgba(77,163,255,0.2)' : 'rgba(199,215,255,0.04)'}`,
                }}
              >
                {opt.label}
              </button>
            ))}
            <span className="w-px h-4" style={{ background: 'rgba(199,215,255,0.06)' }} />
            {tempOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTempFilter(tempFilter === opt.value ? '' : opt.value)}
                className="px-3 py-1.5 rounded-full text-[9px] tracking-wider uppercase font-body transition-all duration-300 text-white"
                style={{
                  background: tempFilter === opt.value ? 'rgba(77,163,255,0.12)' : 'rgba(199,215,255,0.02)',
                  border: `1px solid ${tempFilter === opt.value ? 'rgba(77,163,255,0.2)' : 'rgba(199,215,255,0.04)'}`,
                }}
              >
                {opt.label}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 rounded-full text-[9px] tracking-wider uppercase font-body text-white"
              >
                {t('planets.clear')}
              </button>
            )}
          </div>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((planet) => (
              <motion.div
                key={planet.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                <PlanetCard planet={planet} index={planets.indexOf(planet)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            className="text-center text-sm font-body mt-12 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t('planets.empty')}
          </motion.p>
        )}

      </div>
    </motion.section>
  )
}

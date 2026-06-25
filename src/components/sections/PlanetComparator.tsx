import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { planets, PlanetData } from '@/data/planets'
import { easeOutExpo } from '@/animations/variants'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionHeader from '@/components/ui/SectionHeader'
import PlanetSVG from '@/components/planets/PlanetSVG'

interface MetricBarProps {
  label: string
  valueA: number
  valueB: number
  maxValue: number
  colorA: string
  colorB: string
  unit?: string
}

function MetricBar({ label, valueA, valueB, maxValue, colorA, colorB, unit }: MetricBarProps) {
  const pctA = (valueA / maxValue) * 100
  const pctB = (valueB / maxValue) * 100

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-body text-white">
        <span>{label}</span>
        <span>{unit || ''}</span>
      </div>
      <div className="relative h-8 flex items-center gap-1">
        <motion.div
          className="h-3 rounded-l-full"
          style={{ background: colorA, width: `${pctA}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${pctA}%` }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        />
        <div className="flex-1 h-3 rounded-r-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>
      <div className="relative h-8 flex items-center gap-1 flex-row-reverse">
        <motion.div
          className="h-3 rounded-r-full"
          style={{ background: colorB, width: `${pctB}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${pctB}%` }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        />
        <div className="flex-1 h-3 rounded-l-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>
    </div>
  )
}

function PlanetSelect({ planets, selected, onSelect, label }: { planets: PlanetData[]; selected: PlanetData | null; onSelect: (p: PlanetData) => void; label: string }) {
  const { t } = useLanguage()
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider font-body mb-2 text-white">{label}</p>
      <div className="relative">
        <select
          value={selected?.id || ''}
          onChange={(e) => {
            const p = planets.find((pl) => pl.id === e.target.value)
            if (p) onSelect(p)
          }}
          className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none appearance-none cursor-pointer bg-white/5 border border-white/10 text-white"
        >
          <option value="" disabled>{t('comparator.selectPlanet')}</option>
          {planets.map((p) => (
            <option key={p.id} value={p.id} style={{ background: '#050816' }}>{p.name}</option>
          ))}
        </select>
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-white/40" viewBox="0 0 12 12" fill="none">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export default function PlanetComparator() {
  const { t } = useLanguage()
  const [planetA, setPlanetA] = useState<PlanetData | null>(null)
  const [planetB, setPlanetB] = useState<PlanetData | null>(null)

  const metricConfigs = [
    { label: t('comparator.metric.diameter'), key: (p: PlanetData) => parseFloat(p.diameter.replace(/,/g, '')), maxKey: (p: PlanetData) => 142984, unit: 'km' },
    { label: t('comparator.metric.gravity'), key: (p: PlanetData) => parseFloat(p.gravity), maxKey: () => 25, unit: 'm/s²' },
    { label: t('comparator.metric.dayLength'), key: (p: PlanetData) => {
      const d = p.dayLength
      if (d.includes('hours')) return parseFloat(d) / 24
      if (d.includes('days')) return parseFloat(d)
      return 1
    }, maxKey: () => 250, unit: 'Earth days' },
    { label: t('comparator.metric.moons'), key: (p: PlanetData) => p.moons, maxKey: () => 150, unit: '' },
  ]

  const metrics = useMemo(() => {
    if (!planetA || !planetB) return []
    return metricConfigs.map((m) => ({
      label: m.label,
      valueA: m.key(planetA),
      valueB: m.key(planetB),
      maxValue: Math.max(m.key(planetA), m.key(planetB), m.maxKey(planetA)),
      unit: m.unit,
    }))
  }, [planetA, planetB])

  return (
    <motion.section id="compare" className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title={t('comparator.title')}
          subtitle={t('comparator.subtitle')}
          tag={t('comparator.tag')}
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <PlanetSelect planets={planets} selected={planetA} onSelect={setPlanetA} label={t('comparator.planetA')} />
          <PlanetSelect planets={planets} selected={planetB} onSelect={setPlanetB} label={t('comparator.planetB')} />
        </div>

        <AnimatePresence mode="wait">
          {planetA && planetB ? (
            <motion.div
              key={`${planetA.id}-${planetB.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center">
                  <PlanetSVG planetId={planetA.id} size={140} showAtmosphere animate />
                  <p className="text-lg font-heading text-white mt-3">{planetA.name}</p>
                  <p className="text-[10px] font-body text-white">{planetA.type.replace('-', ' ')}</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-2xl text-white">{t('comparator.vs')}</span>
                </div>
                <div className="flex flex-col items-center">
                  <PlanetSVG planetId={planetB.id} size={140} showAtmosphere animate />
                  <p className="text-lg font-heading text-white mt-3">{planetB.name}</p>
                  <p className="text-[10px] font-body text-white">{planetB.type.replace('-', ' ')}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {metrics.map((m) => (
                  <MetricBar
                    key={m.label}
                    label={m.label}
                    valueA={m.valueA}
                    valueB={m.valueB}
                    maxValue={m.maxValue}
                    colorA={planetA.color}
                    colorB={planetB.color}
                    unit={m.unit}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-sm font-body text-white">{t('comparator.empty')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

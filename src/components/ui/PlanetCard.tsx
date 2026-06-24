import { motion } from 'framer-motion'
import { PlanetData } from '@/data/planets'
import { scaleIn } from '@/animations/variants'
import { useLanguage } from '@/contexts/LanguageContext'
import PlanetSVG from '@/components/planets/PlanetSVG'

interface PlanetCardProps {
  planet: PlanetData
  index: number
  onClick: (planet: PlanetData) => void
}

function TempBar({ temp }: { temp: string }) {
  const extractTemp = (t: string) => {
    const nums = t.match(/-?\d+/g)
    if (!nums) return 50
    const vals = nums.map(Number)
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length
    return Math.max(5, Math.min(95, ((avg + 273) / 500) * 100))
  }
  const pct = extractTemp(temp)
  const hue = 220 - (pct / 100) * 220
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-gray-800/50">
        <motion.div className="h-full rounded-full" style={{ width: `${pct}%`, background: `hsl(${hue}, 70%, 50%)` }} initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }} />
      </div>
      <span className="text-[9px] font-body text-white/60">{temp}</span>
    </div>
  )
}

export default function PlanetCard({ planet, index, onClick }: PlanetCardProps) {
  const { t } = useLanguage()

  const typeLabels: Record<string, string> = {
    'rocky': t('planets.type.rocky'),
    'gas-giant': t('planets.type.gas-giant'),
    'ice-giant': t('planets.type.ice-giant'),
  }

  const habitabilityConfig: Record<string, { label: string; color: string }> = {
    hostile: { label: t('planets.habitability.hostile'), color: '#FF6B6B' },
    potential: { label: t('planets.habitability.potential'), color: '#FFD93D' },
    habitable: { label: t('planets.habitability.habitable'), color: '#6BCB77' },
  }

  const hab = habitabilityConfig[planet.habitability]

  return (
    <motion.div
      className="group cursor-pointer"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onClick={() => onClick(planet)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(planet) } }}
      role="button"
      tabIndex={0}
      aria-label={`${t('planetCard.viewDetails')} ${planet.name}`}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden h-full bg-black border border-gray-800/50"
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-6 mb-4">
            <motion.div
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
            >
              <PlanetSVG planetId={planet.id} size={96} animate interactive />
            </motion.div>
            <div className="min-w-0">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white truncate">{planet.name}</h3>
              <p className="text-xs text-white/60 italic mt-0.5 font-body">{planet.nameLatin}</p>
            </div>
          </div>

          <div className="mb-3 flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[8px] tracking-wider uppercase font-body bg-gray-800/50 text-white/60 border border-gray-700/50">
              {typeLabels[planet.type] || planet.type}
            </span>
            <span className="px-2 py-0.5 rounded text-[8px] tracking-wider uppercase font-body flex items-center gap-1 bg-gray-800/50 border border-gray-700/50" style={{ color: hab.color }}>
              {hab.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: t('planetCard.stat.diameter'), value: planet.diameter },
              { label: t('planetCard.stat.distance'), value: planet.distanceFromSun },
              { label: t('planetCard.stat.gravity'), value: planet.gravity },
              { label: t('planetCard.stat.moons'), value: planet.moons.toString() },
            ].map((stat) => (
              <div key={stat.label} className="px-3 py-2 rounded-lg bg-gray-900/50">
                <p className="text-[10px] text-white/60 uppercase tracking-wider font-body">{stat.label}</p>
                <p className="text-xs text-white/80 mt-0.5 font-body">{stat.value}</p>
              </div>
            ))}
          </div>

          <TempBar temp={planet.temperature} />

          <div className="mt-3 flex items-center gap-2">
            <span className="text-[8px] font-body text-white/40">{t('planetCard.sizeVsEarth')}</span>
            <svg width="60" height="8" viewBox="0 0 60 8">
              <rect x="0" y="2" width="60" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
              <motion.rect x="0" y="2" height="4" rx="2" fill={planet.color} initial={{ width: 0 }} whileInView={{ width: `${Math.min(100, (planet.size / 11.21) * 60)}` }} transition={{ duration: 1, delay: 0.5 }} opacity={0.6} />
            </svg>
          </div>

          <motion.button
            className="w-full py-2.5 mt-4 rounded-lg text-xs tracking-[0.2em] uppercase font-medium text-black bg-white transition-all hover:bg-gray-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('planetCard.explore')}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { PlanetData } from '@/data/planets'
import { staggerContainer, fadeInUp, easeOutExpo } from '@/animations/variants'
import { getSharedMouse } from '@/hooks/useMousePosition'
import { useLanguage } from '@/contexts/LanguageContext'
import PlanetSVG from '@/components/planets/PlanetSVG'
import Planet3D from '@/components/planets/Planet3D'


interface PlanetDetailProps {
  planet: PlanetData | null
  onClose: () => void
}

function ComparisonTab({ planet }: { planet: PlanetData }) {
  const { t } = useLanguage()

  const parseNum = (s: string) => { const n = parseFloat(s.replace(/[^0-9.\-]/g, '')); return isNaN(n) ? 0 : n }

  const earth: Record<string, { val: number; unit: string }> = {
    diameter: { val: 12742, unit: 'km' },
    gravity: { val: 9.81, unit: 'm/s²' },
    day: { val: 24, unit: 'h' },
    orbital: { val: 365, unit: 'days' },
  }

  const vals = {
    diameter: parseNum(planet.diameter),
    gravity: parseNum(planet.gravity),
    day: parseNum(planet.dayLength),
    orbital: parseNum(planet.orbitalPeriod),
  }

  const ratio = (v: number, e: number) => {
    const r = v / e
    if (r < 0.01) return '—'
    return r >= 1000 ? `${(r / 1000).toFixed(1)}K×` : `${r.toFixed(r >= 10 ? 1 : r >= 1 ? 2 : r >= 0.1 ? 2 : 3)}×`
  }

  const items = [
    { key: 'diameter' as const, label: 'Diameter' },
    { key: 'gravity' as const, label: 'Gravity' },
    { key: 'day' as const, label: 'Day Length' },
    { key: 'orbital' as const, label: 'Orbital Period' },
  ]

  const pSize = Math.min(76, Math.max(24, 24 + (planet.size / 11.21) * 52))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
      <p className="text-[10px] uppercase tracking-wider font-body mb-4 text-white/40">{t('planetDetail.comparison.title')}</p>

      <div className="flex items-center justify-center gap-8 py-2 mb-6">
        <div className="text-center">
          <div className="mx-auto rounded-full transition-all" style={{
            width: pSize, height: pSize,
            background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.color}88)`,
            boxShadow: `0 0 40px ${planet.color}33`,
          }} />
          <p className="text-xs font-bold text-white mt-2">{planet.name}</p>
        </div>
        <div className="text-xs text-white/30 font-bold">VS</div>
        <div className="text-center">
          <div className="mx-auto rounded-full" style={{
            width: 22, height: 22,
            background: 'radial-gradient(circle at 35% 35%, #4B7BE5, #1A3A7C)',
          }} />
          <p className="text-xs font-bold text-white mt-2">Earth</p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const v = vals[item.key]
          const e = earth[item.key]
          const max = Math.max(v, e.val)
          return (
            <div key={item.key} className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3">
              <div className="text-[9px] font-body text-white tracking-widest uppercase mb-2">{item.label}</div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <span className="text-xs font-body text-white">Earth</span>
                  </div>
                  <span className="text-sm font-bold text-white ml-[14px]">{e.val.toLocaleString()} {e.unit}</span>
                </div>
                <span className="text-lg font-bold" style={{ color: planet.color }}>{ratio(v, e.val)}</span>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-xs font-body text-white">{planet.name}</span>
                    <div className="w-2 h-2 rounded-full" style={{ background: planet.color }} />
                  </div>
                  <span className="text-sm font-bold text-white mr-[14px]" style={{ color: planet.color }}>{v.toLocaleString()} {e.unit}</span>
                </div>
              </div>
              <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="absolute inset-y-0 rounded-full bg-white/20" style={{ width: `${(e.val / max) * 100}%`, left: 0 }} />
                <motion.div
                  className="absolute inset-y-0 rounded-full"
                  style={{ background: planet.color, left: 0 }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(v / max) * 100}%` }}
                  transition={{ duration: 1, ease: easeOutExpo }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

function MoonsTab({ planet }: { planet: PlanetData }) {
  const { t } = useLanguage()
  if (!planet.mainMoons || planet.mainMoons.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center">
        <p className="text-sm font-body text-white">{t('planetDetail.moons.none')}</p>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
      <p className="text-[10px] uppercase tracking-wider font-body mb-4 text-white">{t('planetDetail.moons.title')}</p>
      <div className="relative flex items-center justify-center py-8">
        <PlanetSVG planetId={planet.id} size={80} animate={false} />
        {planet.mainMoons.map((moon, i) => {
          const angle = (i / planet.mainMoons!.length) * 360
          const dist = 80 + i * 30
          return (
            <motion.div
              key={moon.name}
              className="absolute"
              style={{
                width: 0, height: 0,
                left: '50%', top: '50%',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
            >
              <div style={{
                position: 'absolute',
                width: 8 + i * 2,
                height: 8 + i * 2,
                left: -4 - i,
                top: -dist,
                borderRadius: '50%',
                background: `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.5), rgba(255,255,255,0.1))`,
              }} />
            </motion.div>
          )
        })}
      </div>
      <div className="space-y-2">
        {planet.mainMoons.map((moon) => (
          <div key={moon.name} className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/5">
            <div>
              <p className="text-sm text-white font-body">{moon.name}</p>
              <p className="text-[10px] font-body text-white">{moon.note}</p>
            </div>
            <span className="text-[10px] font-body text-white">{moon.diameter}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function copyToClipboard(text: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return
  navigator.clipboard.writeText(text).catch(() => {})
}

export default function PlanetDetail({ planet, onClose }: PlanetDetailProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'info' | 'compare' | 'moons'>('info')
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'planet-detail-lock'
    style.textContent = 'body, html { overflow: hidden !important; }'
    document.head.appendChild(style)
    return () => {
      const s = document.getElementById('planet-detail-lock')
      if (s) s.remove()
    }
  }, [])

  useEffect(() => {
    let animId: number
    const tick = () => {
      const m = getSharedMouse()
      setParallax({ x: m.normalizedX * 8, y: m.normalizedY * 8 })
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])
  if (!planet) return null

  const tabs = [
    { id: 'info' as const, label: t('planetDetail.tab.info') },
    { id: 'compare' as const, label: t('planetDetail.tab.comparison') },
    { id: 'moons' as const, label: `${t('planetDetail.tab.moons')} (${planet.moons})` },
  ]

  return (
    <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(60px)' }}
          onClick={onClose}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClose?.() } }}
          role="button" tabIndex={0} aria-label="Close"
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative w-full max-w-7xl max-h-[95vh] overflow-y-auto"
          style={{
            background: '#000000',
          }}
          initial={{ scale: 0.92, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 50, opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <motion.button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-20 bg-white/3 border border-white/6"
            aria-label="Close planet detail"
            onClick={onClose}
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.button>

          <div className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <motion.div
                className="relative flex flex-col items-center justify-center min-h-[280px]"
                style={{ x: parallax.x, y: parallax.y }}
              >
                <div className="w-full max-w-[280px] aspect-square">
                  <Planet3D planetId={planet.id} size={240} />
                </div>

                <motion.div
                  className="absolute w-[130%] h-[130%] rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${planet.color}11, transparent 60%)`,
                    filter: 'blur(30px)',
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.button
                  onClick={() => { copyToClipboard(planet.name); onClose() }}
                  className="mt-4 px-3 py-1.5 rounded-full text-[8px] tracking-wider uppercase font-body transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'white' }}
                  whileHover={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  {t('planetDetail.share')}
                </motion.button>

                <motion.button
                  className="mt-2 px-3 py-1.5 rounded-full text-[8px] tracking-wider uppercase font-body"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'white', cursor: 'default' }}
                  title={t('planetDetail.comingSoon')}
                >
                  {t('planetDetail.view3d')}
                </motion.button>
              </motion.div>

              <motion.div className="space-y-5" variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeInUp}>
                  <span className="text-[10px] tracking-[0.3em] uppercase font-body text-white">
                    {t('planetDetail.profile')}
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white mt-2">
                    {planet.name}
                  </h2>
                  <p className="text-sm text-white italic font-body">{planet.nameLatin}</p>
                </motion.div>

                <div className="flex gap-2 border-b border-white/5 pb-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-[10px] tracking-wider uppercase font-body transition-all ${
                        activeTab === tab.id ? 'bg-white/10 text-white' : 'bg-transparent text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'info' && (
                    <motion.div key="info" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                      <motion.p className="text-sm md:text-base leading-relaxed font-body text-white" variants={fadeInUp}>
                        {t(`planet.${planet.id}.description`)}
                      </motion.p>

                      <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4" variants={fadeInUp}>
                        {[
                          { label: t('planetDetail.stat.diameter'), value: planet.diameter },
                          { label: t('planetDetail.stat.distance'), value: planet.distanceFromSun },
                          { label: t('planetDetail.stat.orbitalPeriod'), value: planet.orbitalPeriod },
                          { label: t('planetDetail.stat.dayLength'), value: planet.dayLength },
                          { label: t('planetDetail.stat.gravity'), value: planet.gravity },
                          { label: t('planetDetail.stat.temperature'), value: planet.temperature },
                          { label: t('planetDetail.stat.moons'), value: planet.moons.toString() },
                          { label: t('planetDetail.stat.discovery'), value: planet.discovery.split(' — ')[0] },
                        ].map((s) => (
                          <div key={s.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[9px] uppercase tracking-wider font-body text-white">{s.label}</p>
                            <p className="text-xs text-white mt-1 font-body">{s.value}</p>
                          </div>
                        ))}
                      </motion.div>

                      <motion.div variants={fadeInUp} className="mt-4">
                        <p className="text-[10px] uppercase tracking-wider font-body mb-2 text-white">{t('planetDetail.atmosphere')}</p>
                        <p className="text-sm font-body text-white">{planet.atmosphere}</p>
                      </motion.div>

                      <motion.div variants={fadeInUp} className="mt-4">
                        <p className="text-[10px] uppercase tracking-wider font-body mb-3 text-white">{t('planetDetail.missions')}</p>
                        <div className="flex flex-wrap gap-2">
                          {planet.missions.map((m) => (
                            <span key={m} className="px-3 py-1.5 rounded-full text-[10px] font-body bg-white/5 border border-white/10 text-white">
                              {m}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div variants={fadeInUp} className="mt-4">
                        <p className="text-[10px] uppercase tracking-wider font-body mb-3 text-white">{t('planetDetail.facts')}</p>
                        <ul className="space-y-2">
                          {planet.facts.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm font-body text-white">
                              <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-white/50" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === 'compare' && <ComparisonTab key="compare" planet={planet} />}
                  {activeTab === 'moons' && <MoonsTab key="moons" planet={planet} />}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { planets, PlanetData } from '@/data/planets'
import { easeOutExpo } from '@/animations/variants'
import { useLanguage } from '@/contexts/LanguageContext'

const Planet3D = dynamic(() => import('@/components/planets/Planet3D'), { ssr: false })
import PlanetSVG from '@/components/planets/PlanetSVG'
import Link from 'next/link'

export async function getStaticPaths() {
  const paths = planets.map((p) => ({ params: { id: p.id } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: { planet: planets.find((p) => p.id === params.id) || null },
  }
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
    { key: 'diameter' as const, label: t('planetDetail.stat.diameter') },
    { key: 'gravity' as const, label: t('planetDetail.stat.gravity') },
    { key: 'day' as const, label: t('planetDetail.stat.dayLength') },
    { key: 'orbital' as const, label: t('planetDetail.stat.orbitalPeriod') },
  ]

  const pSize = Math.min(60, Math.max(20, 20 + (planet.size / 11.21) * 40))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <p className="text-[10px] uppercase tracking-wider font-body mb-5 text-white/40">{t('planetDetail.comparison.title')}</p>
      <div className="flex items-center justify-center gap-8 pb-5 mb-6 border-b border-white/5">
        <div className="text-center">
          <div className="mx-auto rounded-full" style={{
            width: pSize, height: pSize,
            background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.color}88)`,
            boxShadow: `0 0 24px ${planet.color}22`,
          }} />
          <p className="text-xs font-bold text-white mt-2">{planet.name}</p>
        </div>
        <span className="text-[10px] font-bold text-white/20">VS</span>
        <div className="text-center">
          <div className="mx-auto rounded-full" style={{
            width: 18, height: 18,
            background: 'radial-gradient(circle at 35% 35%, #4B7BE5, #1A3A7C)',
          }} />
          <p className="text-[10px] font-bold text-white mt-2">Earth</p>
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item) => {
          const v = vals[item.key]
          const e = earth[item.key]
          const max = Math.max(v, e.val)
          return (
            <div key={item.key} className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-4">
              <div className="text-[9px] font-body text-white/40 tracking-widest uppercase mb-3">{item.label}</div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-left min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                  <span className="text-xs text-white/60 truncate">Earth</span>
                  <span className="text-xs font-bold text-white/80">{e.val.toLocaleString()} {e.unit}</span>
                </div>
                <span className="text-base font-bold shrink-0" style={{ color: planet.color }}>{ratio(v, e.val)}</span>
                <div className="flex items-center gap-2 text-right min-w-0">
                  <span className="text-xs font-bold truncate" style={{ color: planet.color }}>{v.toLocaleString()} {e.unit}</span>
                  <span className="text-xs text-white/60 truncate">{planet.name}</span>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: planet.color }} />
                </div>
              </div>
              <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="absolute inset-y-0 rounded-full bg-white/10" style={{ width: `${(e.val / max) * 100}%`, left: 0 }} />
                <motion.div
                  className="absolute inset-y-0 rounded-full"
                  style={{ background: planet.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(v / max) * 100}%` }}
                  transition={{ duration: 0.8, ease: easeOutExpo }}
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
        <p className="text-sm font-body text-white/50">{t('planetDetail.moons.none')}</p>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <p className="text-[10px] uppercase tracking-wider font-body mb-5 text-white/50">{t('planetDetail.moons.title')}</p>
      <div className="relative flex items-center justify-center py-10">
        <PlanetSVG planetId={planet.id} size={60} animate={false} />
        {planet.mainMoons.map((moon, i) => {
          const dist = 60 + i * 24
          return (
            <motion.div
              key={moon.name}
              className="absolute"
              style={{ width: 0, height: 0, left: '50%', top: '50%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
            >
              <div style={{
                position: 'absolute',
                width: 6 + i * 2,
                height: 6 + i * 2,
                left: -3 - i,
                top: -dist,
                borderRadius: '50%',
                background: `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.5), rgba(255,255,255,0.1))`,
              }} />
            </motion.div>
          )
        })}
      </div>
      <div className="space-y-3">
        {planet.mainMoons.map((moon) => (
          <div key={moon.name} className="flex items-center justify-between px-5 py-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <div>
              <p className="text-sm text-white font-body">{moon.name}</p>
              <p className="text-[10px] font-body text-white/50 mt-0.5">{moon.note}</p>
            </div>
            <span className="text-[10px] font-body text-white/60">{moon.diameter}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function NavbarBack() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center px-3 md:px-6 pt-2">
      <div className="w-full max-w-7xl rounded-2xl" style={{
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(32px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.3)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="flex items-center justify-between h-12 md:h-14 px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] tracking-wider uppercase font-body transition-colors bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/70"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>

          <span className="text-[9px] tracking-wider uppercase font-body text-white/40">
            Solar System
          </span>

          <div className="w-16" />
        </div>
      </div>
    </nav>
  )
}

export default function PlanetPage({ planet }: { planet: PlanetData | null }) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'info' | 'compare' | 'moons'>('info')

  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#000000' }}>
        <div className="text-center">
          <p className="text-sm font-body text-white/50">{t('planetDetail.notFound')}</p>
          <Link href="/" className="inline-block mt-4 px-4 py-2 rounded-lg text-[9px] tracking-wider uppercase font-body bg-white/[0.04] border border-white/[0.06] text-white/70">
            {t('planetDetail.backToHome')}
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'info' as const, label: t('planetDetail.tab.info') },
    { id: 'compare' as const, label: t('planetDetail.tab.comparison') },
    { id: 'moons' as const, label: `${t('planetDetail.tab.moons')} (${planet.moons})` },
  ]

  return (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <NavbarBack />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 pb-16">
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: '#0A0A0A' }}>
          <div
            className="h-0.5"
            style={{ background: `linear-gradient(90deg, ${planet.color}, ${planet.color}66, transparent)` }}
          />

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  {planet.name}
                </h2>
                <p className="text-sm sm:text-base text-white/40 italic font-body mt-1">{planet.nameLatin}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 mb-8">
              <div className="relative flex items-center justify-center w-full sm:w-[200px] h-[200px] shrink-0 mx-auto sm:mx-0">
                <div className="w-full h-full">
                  <Planet3D planetId={planet.id} size={200} />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${planet.color}11, transparent 60%)`,
                    filter: 'blur(24px)',
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <p className="text-sm leading-relaxed font-body text-white/80">
                    {t(`planet.${planet.id}.description`)}
                  </p>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => { if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(planet.name).catch(() => {}) }}
                      className="px-4 py-2 rounded-lg text-[9px] tracking-wider uppercase font-body transition-colors bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/70"
                    >
                      {t('planetDetail.share')}
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg text-[9px] tracking-wider uppercase font-body bg-white/[0.02] border border-white/[0.04] text-white/40 cursor-default"
                      title={t('planetDetail.comingSoon')}
                    >
                      {t('planetDetail.view3d')}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 border-b border-white/[0.06] pb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-[10px] tracking-wider uppercase font-body transition-all ${
                        activeTab === tab.id
                          ? 'bg-white/[0.08] text-white'
                          : 'bg-transparent text-white/40 hover:text-white/70'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'info' && (
                <motion.div
                  key="info"
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-2 gap-4">
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
                      <div key={s.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <p className="text-[9px] uppercase tracking-wider font-body text-white/40">{s.label}</p>
                        <p className="text-sm text-white/90 mt-1.5 font-body font-medium">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <p className="text-[9px] uppercase tracking-wider font-body mb-3 text-white/50">{t('planetDetail.atmosphere')}</p>
                    <p className="text-sm font-body text-white/80 leading-relaxed">{planet.atmosphere}</p>
                  </div>

                  <div className="mt-8">
                    <p className="text-[9px] uppercase tracking-wider font-body mb-4 text-white/50">{t('planetDetail.missions')}</p>
                    <div className="flex flex-wrap gap-3">
                      {planet.missions.map((m) => (
                        <span key={m} className="px-3 py-1.5 rounded-full text-[10px] font-body bg-white/[0.03] border border-white/[0.06] text-white/70">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-[9px] uppercase tracking-wider font-body mb-4 text-white/50">{t('planetDetail.facts')}</p>
                    <ul className="space-y-3">
                      {planet.facts.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-body text-white/70 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: planet.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
              {activeTab === 'compare' && <ComparisonTab key="compare" planet={planet} />}
              {activeTab === 'moons' && <MoonsTab key="moons" planet={planet} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
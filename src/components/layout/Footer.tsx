import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useLanguage } from '@/contexts/LanguageContext'
import SocialIcons from '@/components/ui/SocialIcons'

function MiniSolarSystem() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" className="opacity-30">
      <circle cx="100" cy="50" r="6" fill="#FFD700" opacity={0.6} />
      {[15, 25, 35, 45, 60, 75, 85, 95].map((r, i) => (
        <circle key={i} cx="100" cy="50" r={r} fill="none" stroke="rgba(199,215,255,0.08)" strokeWidth="0.5" strokeDasharray="2 3" />
      ))}
      <circle cx="100" cy="35" r="2" fill="#B5B5B5" opacity={0.5} />
      <circle cx="108" cy="28" r="2.5" fill="#E8C87A" opacity={0.5} />
      <circle cx="115" cy="40" r="3" fill="#4B7BE5" opacity={0.5} />
      <circle cx="95" cy="60" r="2.5" fill="#E07040" opacity={0.5} />
      <circle cx="80" cy="38" r="5" fill="#D4A574" opacity={0.4} />
      <circle cx="70" cy="55" r="4.5" fill="#E8D5A3" opacity={0.4} />
      <circle cx="85" cy="70" r="3.5" fill="#7EC8E3" opacity={0.4} />
      <circle cx="130" cy="45" r="3.5" fill="#3B5C9C" opacity={0.4} />
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()
  const [logoClicks, setLogoClicks] = useState(0)

  return (
    <motion.footer
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
        <MiniSolarSystem />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          <motion.div className="md:col-span-2" variants={fadeInUp}>
            <div className="flex items-center gap-2.5 mb-4 cursor-pointer"
              role="button" tabIndex={0} aria-label="Easter egg"
              onClick={() => {
                const next = logoClicks + 1
                setLogoClicks(next)
                if (next >= 3) {
                  setLogoClicks(0)
                  document.documentElement.style.setProperty('--supernova', '1')
                  setTimeout(() => document.documentElement.style.removeProperty('--supernova'), 2000)
                }
              }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (e.currentTarget as HTMLDivElement).click() } }}
            >
              <img src="/logo.png" alt="BWL Studios" width="40" height="40" className="h-10 w-auto" loading="lazy" />
            </div>
            <div className="mt-4">
              <SocialIcons horizontal />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-body mb-4 text-white">{t('footer.explore')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('nav.planets'), href: '#planets' },
                { label: t('nav.discoveries'), href: '#discoveries' },
                { label: t('nav.universe'), href: '#universe' },
                { label: t('nav.data'), href: '#data' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm font-body text-white" onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-body mb-4 text-white">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              {[
                { label: 'NASA', url: 'https://www.nasa.gov' },
                { label: 'ESA', url: 'https://www.esa.int' },
                { label: 'JWST', url: 'https://webbtelescope.org' },
                { label: 'SpaceX', url: 'https://www.spacex.com' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-body text-white" onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" variants={fadeInUp} style={{ borderTop: '1px solid rgba(199,215,255,0.03)' }}>
          <p className="text-[10px] font-body text-white">&copy; 2026 BWL Studios Copyright</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

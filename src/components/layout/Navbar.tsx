import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { easePremium } from '@/animations/variants'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLanguage } from '@/contexts/LanguageContext'
import { languages, type LangCode } from '@/i18n/translations'

const links = [
  { key: 'nav.home' as const, href: '#hero', id: 'hero' },
  { key: 'nav.planets' as const, href: '#planets', id: 'planets' },
  { key: 'nav.discoveries' as const, href: '#discoveries', id: 'discoveries' },
  { key: 'nav.universe' as const, href: '#universe', id: 'universe' },
  { key: 'nav.data' as const, href: '#data', id: 'data' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const { lang, setLang, t } = useLanguage()
  const activeSection = useActiveSection(links.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
    setLangOpen(false)
  }, [lang])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 flex justify-center px-3 md:px-6 pt-2"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easePremium, delay: 0.5 }}
    >
      <div
        className="w-full max-w-7xl rounded-2xl transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(32px) saturate(1.3)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(1.3)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between h-12 md:h-14 px-4 md:px-6">
          <a href="#hero" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="BWL Studios" className="h-7 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={`relative px-3 py-1.5 text-[9px] tracking-[0.25em] uppercase font-body transition-all duration-300 ${activeSection === link.id ? 'text-white' : 'text-white/60'}`}
              >
                <span className="relative z-10">{t(link.key)}</span>
                {activeSection === link.id && (
                  <motion.div
                    className="absolute inset-0 rounded"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                    layoutId="nav-bg"
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                )}
                {activeSection === link.id && (
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-px"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div ref={langRef} className="relative">
              <button
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[9px] tracking-wider uppercase font-body transition-all duration-300"
                style={{
                  background: scrolled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'white',
                }}
                onClick={() => setLangOpen(!langOpen)}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={(e) => { const bg = scrolled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)'; e.currentTarget.style.background = bg }}
              >
                {lang.toUpperCase()}
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}>
                  <path d="M2 3l2 2 2-2" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-1.5 min-w-[130px] rounded-xl overflow-hidden border"
                    style={{
                      background: 'rgba(0,0,0,0.9)',
                      backdropFilter: 'blur(24px)',
                      borderColor: 'rgba(255,255,255,0.06)',
                    }}
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        className={`w-full text-left px-3.5 py-2 text-[10px] font-body transition-colors ${lang === l.code ? 'text-white' : 'text-white/50 hover:text-white'}`}
                        style={lang === l.code ? { background: 'rgba(255,255,255,0.04)' } : {}}
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = lang === l.code ? 'rgba(255,255,255,0.04)' : 'transparent' }}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#planets"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] tracking-wider uppercase font-body transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'white',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              </svg>
              {t('nav.explore')}
            </a>

            <button
              className="md:hidden relative w-7 h-7 flex flex-col items-center justify-center gap-1"
              onClick={() => setOpen(!open)}
              aria-label={t('nav.explore')}
            >
              <motion.span className="block w-4 h-px bg-white/30" animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }} />
              <motion.span className="block w-4 h-px bg-white/30" animate={open ? { opacity: 0 } : { opacity: 1 }} />
              <motion.span className="block w-4 h-px bg-white/30" animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}
            >
              <div className="px-4 py-2 space-y-0.5">
                {links.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    className={`block py-2.5 text-xs transition-colors font-body ${activeSection === link.id ? 'text-white' : 'text-white/60'}`}
                    onClick={() => setOpen(false)}
                  >
                    {t(link.key)}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SocialIcon {
  id: string
  label: string
  href: string
  color: string
  hoverBg: string
  renderIcon: (fill: string) => JSX.Element
}

const icons: SocialIcon[] = [
  {
    id: 'web',
    label: 'Website',
    href: 'https://manota14-cpu.github.io/BWL/#about',
    color: '#2563EB',
    hoverBg: 'linear-gradient(135deg, #2563EB, #06B6D4)',
    renderIcon: (fill) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joaquin-manota-4326603a6/',
    color: '#0A66C2',
    hoverBg: '#0A66C2',
    renderIcon: (fill) => (
      <svg viewBox="0 0 24 24" fill={fill} width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/joaco.manota/',
    color: '#DD2A7B',
    hoverBg: 'linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)',
    renderIcon: (fill) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function SocialIcons({ horizontal = false }: { horizontal?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<string | null>(null)

  return (
    <motion.div
      className={horizontal ? 'flex items-center gap-3' : 'flex flex-col items-center gap-3'}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {icons.map((item) => {
        const isHovered = hovered === item.id
        return (
          <motion.div key={item.id} variants={itemVariants} className="relative flex items-center justify-center">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full outline-none transition-all duration-500"
              style={{
                background: isHovered
                  ? item.hoverBg
                  : 'rgba(199,215,255,0.03)',
                border: isHovered
                  ? '1px solid transparent'
                  : '1px solid rgba(199,215,255,0.08)',
                boxShadow: isHovered
                  ? `0 0 24px ${item.color}44, inset 0 1px 0 ${item.color}33`
                  : '0 0 0 transparent',
                transform: isHovered ? 'scale(1.12)' : 'scale(1)',
              }}
              onMouseEnter={() => { setHovered(item.id); setTooltip(item.id) }}
              onMouseLeave={() => { setHovered(null); setTooltip(null) }}
              onFocus={() => setHovered(item.id)}
              onBlur={() => setHovered(null)}
              onKeyDown={(e) => { if (e.key === 'Escape') { (e.currentTarget as HTMLAnchorElement).blur(); setHovered(null); setTooltip(null) } }}
            >
              <span className="relative z-10 flex items-center justify-center" style={{ transition: 'filter 0.4s', filter: isHovered ? 'brightness(1.2)' : 'brightness(0.7)' }}>
                {item.renderIcon(isHovered ? '#FFFFFF' : 'rgba(199,215,255,0.5)')}
              </span>
            </a>

            {tooltip === item.id && !horizontal && (
              <motion.span
                className="absolute left-[calc(100%+12px)] whitespace-nowrap text-[10px] font-body tracking-wider uppercase px-3 py-1.5 rounded-lg pointer-events-none z-20"
                style={{
                  background: 'rgba(5,5,5,0.8)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(199,215,255,0.08)',
                  color: item.color,
                }}
                initial={{ opacity: 0, x: -6, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -6, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.label}
              </motion.span>
            )}

            {tooltip === item.id && horizontal && (
              <motion.span
                className="absolute -top-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-body tracking-wider uppercase px-3 py-1.5 rounded-lg pointer-events-none z-20"
                style={{
                  background: 'rgba(5,5,5,0.8)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(199,215,255,0.08)',
                  color: item.color,
                }}
                initial={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.label}
              </motion.span>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

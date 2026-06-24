import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { staggerContainer, fadeInUp, fadeIn, revealFromLeft } from '@/animations/variants'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  tag?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ title, subtitle, tag, align = 'center' }: SectionHeaderProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      className={`mb-4 md:mb-6 ${align === 'center' ? 'text-center' : 'text-left'}`}
      variants={staggerContainer}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {tag && (
        <motion.div variants={fadeIn} className={`mb-2 ${align === 'center' ? 'flex justify-center' : ''}`}>
          <span
            className="inline-block px-3 py-1 rounded text-[9px] tracking-[0.25em] uppercase font-body"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'white',
            }}
          >
            {tag}
          </span>
        </motion.div>
      )}

      <motion.h2
        className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight"
        variants={fadeInUp}
      >
        <span className="text-gradient">{title}</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          className="mt-1 text-base md:text-lg max-w-2xl font-body font-light leading-relaxed text-white"
          variants={fadeInUp}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className={`mt-3 h-px max-w-[60px] ${align === 'center' ? 'mx-auto' : ''}`}
        style={{
          background: 'linear-gradient(90deg, rgba(250,250,250,0.15), rgba(250,250,250,0.05))',
        }}
        variants={revealFromLeft}
      />
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { pageTransition } from '@/animations/variants'
import SectionErrorBoundary from '@/components/ui/SectionErrorBoundary'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import OrbitSystem from '@/components/sections/OrbitSystem'
import PlanetSection from '@/components/sections/PlanetSection'
import PlanetComparator from '@/components/sections/PlanetComparator'
import Discoveries from '@/components/sections/Discoveries'
import UniverseExploration from '@/components/sections/UniverseExploration'
import BlackHoleSection from '@/components/sections/BlackHoleSection'
import SpaceDashboard from '@/components/sections/SpaceDashboard'
import NasaHighlights from '@/components/sections/NasaHighlights'
import DeepSpace from '@/components/sections/DeepSpace'

const DeepSpaceBackground = dynamic(
  () => import('@/components/effects/DeepSpaceBackground'),
  { ssr: false }
)
const ParticleNetwork = dynamic(
  () => import('@/components/effects/ParticleNetwork'),
  { ssr: false }
)
const GsapParallax = dynamic(
  () => import('@/components/effects/GsapParallax'),
  { ssr: false }
)
const GsapReveal = dynamic(
  () => import('@/components/effects/GsapReveal'),
  { ssr: false }
)

export default function Home() {
  return (
    <motion.div
      className="relative min-h-screen"
      style={{ background: '#000000' }}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <DeepSpaceBackground />
      <ParticleNetwork count={70} />

      <Navbar />

      <main id="main-content" className="relative" style={{ zIndex: 2 }}>
        <Hero />

        <div className="relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="sticky top-0 h-screen w-full" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.01) 0%, transparent 50%)' }} />
          </div>

          <SectionErrorBoundary>
            <GsapParallax speed={0.15}>
              <OrbitSystem />
            </GsapParallax>
          </SectionErrorBoundary>
          <div className="section-divider" />
          <SectionErrorBoundary>
            <GsapReveal direction="up" distance={40}>
              <PlanetSection />
            </GsapReveal>
          </SectionErrorBoundary>
          <div className="section-divider" />
          <SectionErrorBoundary>
            <GsapReveal direction="up" distance={30}>
              <PlanetComparator />
            </GsapReveal>
          </SectionErrorBoundary>
          <div className="section-divider" />
          <SectionErrorBoundary>
            <GsapReveal direction="left" distance={50} delay={0.1}>
              <Discoveries />
            </GsapReveal>
          </SectionErrorBoundary>
          <div className="section-divider" />
          <SectionErrorBoundary>
            <UniverseExploration />
          </SectionErrorBoundary>
          <div className="section-divider" />
          <SectionErrorBoundary>
            <GsapParallax speed={-0.1} direction="down">
              <BlackHoleSection />
            </GsapParallax>
          </SectionErrorBoundary>
          <div className="section-divider" />
          <SectionErrorBoundary>
            <GsapReveal direction="up" distance={30}>
              <SpaceDashboard />
            </GsapReveal>
          </SectionErrorBoundary>
          <div className="section-divider" />
          <SectionErrorBoundary>
            <NasaHighlights />
          </SectionErrorBoundary>
        </div>

        <SectionErrorBoundary>
          <DeepSpace />
        </SectionErrorBoundary>
        <SectionErrorBoundary>
          <Footer />
        </SectionErrorBoundary>
      </main>
    </motion.div>
  )
}

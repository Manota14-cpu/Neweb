import { motion } from 'framer-motion'
import { useId, useRef, useEffect } from 'react'
import { getSharedMouse } from '@/hooks/useMousePosition'

export interface PlanetSVGConfig {
  id: string
  baseColor: string
  highlightColor: string
  shadowColor: string
  atmosphereColor: string
  atmosphereWidth: number
  hasBands: boolean
  hasRings: boolean
  hasCraters: boolean
  hasClouds: boolean
  rotationDuration: number
  rotationDirection: 1 | -1
}

export const planetConfigs: Record<string, PlanetSVGConfig> = {
  mercury: {
    id: 'mercury', baseColor: '#B5B5B5', highlightColor: '#D0D0D0', shadowColor: '#7A7A7A',
    atmosphereColor: '#B5B5B5', atmosphereWidth: 0, hasBands: false, hasRings: false, hasCraters: true, hasClouds: false,
    rotationDuration: 58, rotationDirection: 1,
  },
  venus: {
    id: 'venus', baseColor: '#E8C87A', highlightColor: '#F0D080', shadowColor: '#C8A050',
    atmosphereColor: '#E8C87A', atmosphereWidth: 0.18, hasBands: true, hasRings: false, hasCraters: false, hasClouds: true,
    rotationDuration: 243, rotationDirection: -1,
  },
  earth: {
    id: 'earth', baseColor: '#4B7BE5', highlightColor: '#6BAED6', shadowColor: '#1A3A7C',
    atmosphereColor: '#4B7BE5', atmosphereWidth: 0.1, hasBands: false, hasRings: false, hasCraters: false, hasClouds: true,
    rotationDuration: 24, rotationDirection: 1,
  },
  mars: {
    id: 'mars', baseColor: '#E07040', highlightColor: '#F09060', shadowColor: '#C85030',
    atmosphereColor: '#E07040', atmosphereWidth: 0.05, hasBands: false, hasRings: false, hasCraters: false, hasClouds: false,
    rotationDuration: 24.6, rotationDirection: 1,
  },
  jupiter: {
    id: 'jupiter', baseColor: '#D4A574', highlightColor: '#F0C888', shadowColor: '#B8764A',
    atmosphereColor: '#D4A574', atmosphereWidth: 0.08, hasBands: true, hasRings: false, hasCraters: false, hasClouds: true,
    rotationDuration: 10, rotationDirection: 1,
  },
  saturn: {
    id: 'saturn', baseColor: '#E8D5A3', highlightColor: '#F0E0B0', shadowColor: '#C8B080',
    atmosphereColor: '#E8D5A3', atmosphereWidth: 0.06, hasBands: true, hasRings: true, hasCraters: false, hasClouds: false,
    rotationDuration: 10.5, rotationDirection: 1,
  },
  uranus: {
    id: 'uranus', baseColor: '#7EC8E3', highlightColor: '#9EDAF5', shadowColor: '#5AABB5',
    atmosphereColor: '#7EC8E3', atmosphereWidth: 0.1, hasBands: false, hasRings: true, hasCraters: false, hasClouds: false,
    rotationDuration: 17, rotationDirection: 1,
  },
  neptune: {
    id: 'neptune', baseColor: '#3B5C9C', highlightColor: '#6080C0', shadowColor: '#2A4888',
    atmosphereColor: '#3B5C9C', atmosphereWidth: 0.08, hasBands: false, hasRings: false, hasCraters: false, hasClouds: true,
    rotationDuration: 16, rotationDirection: 1,
  },
}

interface PlanetSVGProps {
  planetId: string
  size?: number
  animate?: boolean
  showAtmosphere?: boolean
  interactive?: boolean
  className?: string
}

const TEX_PATH = '/textures/'

function TexturePlanet({ uid, planetId, animate, config }: { uid: string; planetId: string; animate: boolean; config: PlanetSVGConfig }) {
  const ext = planetId === 'saturn' ? 'png' : 'jpg'
  const texFile = config.id === 'venus' ? 'venus_surface' : config.id
  const src = `${TEX_PATH}${texFile}.${ext}`

  return (
    <motion.g
      animate={animate ? { rotate: config.rotationDirection * 360 } : undefined}
      transition={animate ? { duration: config.rotationDuration, repeat: Infinity, ease: 'linear' } : undefined}
      style={{ transformOrigin: '100px 100px' }}
    >
      <g clipPath={`url(#${uid}-tex-clip)`}>
        <image href={src} x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid slice" />
        <circle cx="100" cy="100" r="100" fill={`url(#${uid}-shadow)`} />
      </g>
    </motion.g>
  )
}

function SaturnSVG({ uid, planetId, animate, config }: { uid: string; planetId: string; animate: boolean; config: PlanetSVGConfig }) {
  const ringScale = 1.75
  const src = `${TEX_PATH}saturn.jpg`

  return (
    <g>
      <g style={{ transformOrigin: '100px 100px' }}>
        {[
          { r: 96 * ringScale, h: 28 * ringScale, w: 6, c: '#C8B080', o: 0.2 },
          { r: 88 * ringScale, h: 25 * ringScale, w: 12, c: '#E8D5A3', o: 0.5 },
          { r: 80 * ringScale, h: 22 * ringScale, w: 10, c: '#F0E0B0', o: 0.7 },
          { r: 72 * ringScale, h: 20 * ringScale, w: 3, c: '#00000022', o: 0.6 },
          { r: 60 * ringScale, h: 17 * ringScale, w: 8, c: '#C8B080', o: 0.3 },
        ].map((ring, i) => (
          <ellipse key={i} cx="100" cy="100" rx={ring.r} ry={ring.h} fill="none" stroke={ring.c} strokeWidth={ring.w} opacity={ring.o} />
        ))}
        <clipPath id={`${uid}-ring-clip`}>
          <rect x="0" y="100" width="200" height="100" />
        </clipPath>
        <g clipPath={`url(#${uid}-ring-clip)`}>
          {[
            { r: 96 * ringScale, h: 28 * ringScale, w: 6, c: '#C8B080', o: 0.35 },
            { r: 88 * ringScale, h: 25 * ringScale, w: 12, c: '#E8D5A3', o: 0.7 },
            { r: 80 * ringScale, h: 22 * ringScale, w: 10, c: '#F0E0B0', o: 0.9 },
            { r: 72 * ringScale, h: 20 * ringScale, w: 3, c: '#00000044', o: 0.8 },
            { r: 60 * ringScale, h: 17 * ringScale, w: 8, c: '#C8B080', o: 0.5 },
          ].map((ring, i) => (
            <ellipse key={i} cx="100" cy="100" rx={ring.r} ry={ring.h} fill="none" stroke={ring.c} strokeWidth={ring.w} opacity={ring.o} />
          ))}
        </g>
      </g>
      <motion.g
        animate={animate ? { rotate: 360 } : undefined}
        transition={animate ? { duration: 10.5, repeat: Infinity, ease: 'linear' } : undefined}
        style={{ transformOrigin: '100px 100px' }}
      >
        <g clipPath={`url(#${uid}-tex-clip)`}>
          <image href={src} x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid slice" />
          <circle cx="100" cy="100" r="100" fill={`url(#${uid}-shadow)`} />
        </g>
      </motion.g>
    </g>
  )
}

function ShadowGradient({ uid }: { uid: string }) {
  return (
    <radialGradient id={`${uid}-shadow`} cx="72%" cy="68%" r="50%">
      <stop offset="0%" stopColor="#00000000" />
      <stop offset="55%" stopColor="#00000055" />
      <stop offset="100%" stopColor="#000000CC" />
    </radialGradient>
  )
}

function AtmosphereGradient({ uid, color }: { uid: string; color: string }) {
  return (
    <radialGradient id={`${uid}-atmo`} cx="50%" cy="50%" r="50%">
      <stop offset="75%" stopColor="transparent" />
      <stop offset="90%" stopColor={`${color}55`} />
      <stop offset="100%" stopColor={`${color}22`} />
    </radialGradient>
  )
}

export default function PlanetSVG({ planetId, size = 200, animate = true, showAtmosphere = true, interactive = false, className }: PlanetSVGProps) {
  const cfg = planetConfigs[planetId]
  const uid = useId()
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!interactive) return
    const el = svgRef.current
    if (!el) return
    let animId: number
    const tick = () => {
      const m = getSharedMouse()
      const factor = planetId === 'jupiter' ? 8 : 4
      el.style.transform = `translate(${m.normalizedX * factor}px, ${m.normalizedY * factor}px)`
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [interactive, planetId])

  if (!cfg) return null

  return (
    <motion.svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      whileHover={interactive ? { scale: 1.05 } : undefined}
      transition={interactive ? { duration: 0.4 } : undefined}
    >
      <defs>
        <clipPath id={`${uid}-tex-clip`}>
          <circle cx="100" cy="100" r="100" />
        </clipPath>
        <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id={`${uid}-atmo-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <ShadowGradient uid={uid} />
        <AtmosphereGradient uid={uid} color={cfg.atmosphereColor} />
      </defs>

      <g>
        {planetId === 'saturn' ? (
          <SaturnSVG uid={uid} planetId={planetId} animate={animate} config={cfg} />
        ) : (
          <TexturePlanet uid={uid} planetId={planetId} animate={animate} config={cfg} />
        )}
      </g>

    </motion.svg>
  )
}
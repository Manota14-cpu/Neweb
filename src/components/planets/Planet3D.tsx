import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { planetConfigs } from './PlanetSVG'

const TEXTURE_BASE = '/textures/'

const texturePaths: Record<string, string> = {
  mercury: 'mercury.jpg',
  venus: 'venus_surface.jpg',
  earth: 'earth.jpg',
  mars: 'mars.jpg',
  jupiter: 'jupiter.jpg',
  saturn: 'saturn.jpg',
  uranus: 'uranus.jpg',
  neptune: 'neptune.jpg',
}

function fbm(x: number, y: number, octaves = 3): number {
  let value = 0
  let amplitude = 0.5
  let frequency = 1
  for (let i = 0; i < octaves; i++) {
    value += amplitude * (Math.sin(x * frequency * 12.9898 + y * frequency * 78.233) * 43758.5453 % 1)
    amplitude *= 0.5
    frequency *= 2
  }
  return value
}

function generateCloudTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  const imageData = ctx.createImageData(512, 256)
  const data = imageData.data

  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 512; x++) {
      const u = x / 512
      const v = y / 256
      const nx = Math.cos((v - 0.5) * Math.PI) * Math.cos(u * Math.PI * 2)
      const ny = Math.sin((v - 0.5) * Math.PI)
      const noise = fbm(nx * 4 + 0.5, ny * 4 + 0.5, 4)
      const val = Math.max(0, Math.min(255, noise * 300))
      const idx = (y * 512 + x) * 4
      data[idx] = val
      data[idx + 1] = val
      data[idx + 2] = val
      data[idx + 3] = val
    }
  }

  ctx.putImageData(imageData, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  return texture
}

function PlanetMesh({ planetId, size }: { planetId: string; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const cloudsRef = useRef<THREE.Mesh>(null!)
  const config = planetConfigs[planetId]
  const mapTexture = useTexture(TEXTURE_BASE + texturePaths[planetId])
  const cloudTexture = useMemo(() => planetId === 'earth' ? generateCloudTexture() : null, [planetId])

  const tilt: Record<string, number> = {
    mercury: 0.034, venus: 177.4, earth: 23.44, mars: 25.19,
    jupiter: 3.13, saturn: 26.73, uranus: 97.77, neptune: 28.32,
  }
  const radTilt = (tilt[planetId] || 0) * (Math.PI / 180)
  const scale = size / 200

  useFrame((_, delta) => {
    const speed = config.id === 'venus' ? -0.002 : config.id === 'mercury' ? 0.004 : 0.003
    meshRef.current.rotation.y += delta * speed * 4
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * speed * 4.5
    if (glowRef.current) glowRef.current.rotation.y += delta * speed * 3
  })

  const atmosphereColor = new THREE.Color(config.atmosphereColor)

  return (
    <group rotation={[0, 0, radTilt]}>
      <Sphere ref={meshRef} args={[scale, 64, 64]}>
        <meshPhysicalMaterial
          map={mapTexture}
          roughness={0.65}
          metalness={0.05}
        />
      </Sphere>

      {planetId === 'earth' && cloudTexture && (
        <Sphere ref={cloudsRef} args={[scale * 1.015, 48, 48]}>
          <meshBasicMaterial
            map={cloudTexture}
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </Sphere>
      )}

      <Sphere ref={glowRef} args={[scale * 1.12, 32, 32]}>
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>

      {planetId === 'saturn' && (
        <group rotation={[THREE.MathUtils.degToRad(26), 0, 0]}>
          {[
            { inner: 1.6, outer: 2.0, opacity: 0.45, color: '#D4C49A' },
            { inner: 2.05, outer: 2.25, opacity: 0.12, color: '#A89870' },
            { inner: 2.3, outer: 2.7, opacity: 0.3, color: '#C8B890' },
          ].map((ring, i) => (
            <mesh key={i}>
              <ringGeometry args={[scale * ring.inner, scale * ring.outer, 96]} />
              <meshBasicMaterial
                color={ring.color}
                transparent
                opacity={ring.opacity}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      )}

      {planetId === 'uranus' && (
        <mesh rotation={[THREE.MathUtils.degToRad(97), 0, 0]}>
          <ringGeometry args={[scale * 1.5, scale * 2.2, 64]} />
          <meshBasicMaterial
            color="#8CC8D8"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}

function Starfield() {
  const starsRef = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 50 + Math.random() * 100
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame(() => {
    starsRef.current.rotation.y += 0.00003
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#FFFFFF" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function Planet3D({ planetId, size = 240 }: { planetId: string; size?: number }) {
  const hasWindow = typeof window !== 'undefined'
  if (!hasWindow) return null

  return (
    <div style={{ width: '100%', height: '100%', minHeight: Math.max(size + 60, 300) }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 25 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <Starfield />
          <ambientLight intensity={0.15} />
          <directionalLight position={[8, 4, 6]} intensity={1.5} />
          <directionalLight position={[-4, -2, -5]} intensity={0.3} color="#4488FF" />
          <PlanetMesh planetId={planetId} size={size} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.4}
            autoRotate={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
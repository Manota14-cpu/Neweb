import { useEffect, useRef, useMemo } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

export default function ParticleField({ count = 50 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useMousePosition()
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const createParticle = (): Particle => ({
      x: canvas.width * Math.random(),
      y: canvas.height * Math.random(),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    })

    particles.current = Array.from({ length: count }, createParticle)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((p, i) => {
        p.life++
        if (p.life > p.maxLife) {
          particles.current[i] = createParticle()
          return
        }

        p.x += p.vx + mouse.normalizedX * 0.3
        p.y += p.vy + mouse.normalizedY * 0.3

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const fade = Math.min(p.life / 50, 1) * (1 - p.life / p.maxLife)
        const alpha = p.opacity * fade

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(122, 215, 255, ${alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(122, 215, 255, ${alpha * 0.2})`
        ctx.fill()
      })

      particles.current.forEach((p1, i) => {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(122, 215, 255, ${0.06 * (1 - dist / 150)})`
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [count, mouse.normalizedX, mouse.normalizedY])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

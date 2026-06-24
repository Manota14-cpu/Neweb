import { useEffect, useRef } from 'react'
import { getSharedMouse } from '@/hooks/useMousePosition'

interface Dot {
  x: number; y: number; vx: number; vy: number; size: number; alpha: number
}

export default function ParticleNetwork({ count = 50 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dots = useRef<Dot[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      dots.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.3 + 0.05,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const m = getSharedMouse()
      const mx = m.normalizedX * 2, my = m.normalizedY * 2

      const d = dots.current
      for (let i = 0; i < d.length; i++) {
        const dot = d[i]
        dot.x += dot.vx + mx * 0.15
        dot.y += dot.vy + my * 0.15
        if (dot.x < 0) dot.x = canvas.width
        if (dot.x > canvas.width) dot.x = 0
        if (dot.y < 0) dot.y = canvas.height
        if (dot.y > canvas.height) dot.y = 0

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(199,215,255,${dot.alpha})`
        ctx.fill()
      }

      for (let i = 0; i < d.length; i++) {
        const a = d[i]
        for (let j = i + 1; j < d.length; j++) {
          const b = d[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = dx * dx + dy * dy
          if (dist < 32400) {
            const alpha = 0.04 * (1 - Math.sqrt(dist) / 180)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(126,168,255,${alpha})`
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

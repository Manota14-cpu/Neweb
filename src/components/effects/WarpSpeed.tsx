import { useEffect, useRef, useCallback } from 'react'

interface WarpSpeedProps {
  active: boolean
  onFinish?: () => void
}

export default function WarpSpeed({ active, onFinish }: WarpSpeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const cx = w / 2
    const cy = h / 2
    let t = 0

    const animate = () => {
      t += 0.03
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < 120; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.3 + Math.random() * 0.7
        const dist = (t * speed * 300) % (w * 1.5)
        const x = cx + Math.cos(angle) * dist
        const y = cy + Math.sin(angle) * dist
        const alpha = Math.max(0, 1 - dist / (w * 0.75))
        const width = Math.max(0.5, (1 - alpha) * 3)

        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x, y)
        ctx.strokeStyle = `rgba(199,215,255,${alpha * 0.4})`
        ctx.lineWidth = width
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x, y, width * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.5})`
        ctx.fill()
      }

      const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40)
      innerGlow.addColorStop(0, 'rgba(199,215,255,0.08)')
      innerGlow.addColorStop(1, 'rgba(199,215,255,0)')
      ctx.fillStyle = innerGlow
      ctx.fillRect(0, 0, w, h)

      if (t < 1.5) requestAnimationFrame(animate)
      else if (onFinish) onFinish()
    }

    animate()
  }, [onFinish])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
  }, [active, draw])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ background: 'rgba(0,0,0,0.6)' }}
    />
  )
}

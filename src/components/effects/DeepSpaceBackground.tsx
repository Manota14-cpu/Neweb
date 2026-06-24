import { useEffect, useRef, useMemo } from 'react'
import { getSharedMouse } from '@/hooks/useMousePosition'

interface Star {
  x: number; y: number; size: number; baseAlpha: number
  layer: number; twinkleSpeed: number; twinkleOffset: number
  isBright: boolean; pulsePhase: number
}

export default function DeepSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const stars = useMemo(() => {
    const s: Star[] = []
    for (let i = 0; i < 1200; i++) {
      const layer = Math.random() > 0.6 ? 2 : Math.random() > 0.5 ? 1 : 0
      s.push({
        x: Math.random() * 100, y: Math.random() * 100,
        size: layer === 0 ? Math.random() * 0.6 + 0.1 : layer === 1 ? Math.random() * 1 + 0.3 : Math.random() * 1.8 + 0.5,
        baseAlpha: layer === 0 ? Math.random() * 0.3 + 0.1 : layer === 1 ? Math.random() * 0.5 + 0.2 : Math.random() * 0.7 + 0.3,
        layer,
        twinkleSpeed: Math.random() * 1.5 + 0.3,
        twinkleOffset: Math.random() * Math.PI * 2,
        isBright: Math.random() > 0.92,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }
    return s
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let elapsed = 0
    let frameCount = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize(); window.addEventListener('resize', resize)

    const draw = () => {
      frameCount++
      elapsed += 0.003
      const w = canvas.width, h = canvas.height

      ctx.clearRect(0, 0, w, h)

      const m = getSharedMouse()

      const layerSpeeds = [0.02, 0.06, 0.12]
      const layerAlphas = [0.4, 0.6, 0.9]

      for (let layer = 0; layer < 3; layer++) {
        const speed = layerSpeeds[layer]
        const baseAlpha = layerAlphas[layer]
        const px = m.normalizedX * speed * 5
        const py = m.normalizedY * speed * 5

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i]
          if (star.layer !== layer) continue

          const twinkle = Math.sin(elapsed * star.twinkleSpeed * 6 + star.twinkleOffset) * 0.25 + 0.75
          let alpha = star.baseAlpha * twinkle * baseAlpha

          if (star.isBright) {
            alpha += Math.sin(elapsed * 1.2 + star.pulsePhase) * 0.15
          }

          const sx = (star.x * w) / 100 + px * (star.layer + 1) * 0.5
          const sy = (star.y * h) / 100 + py * (star.layer + 1) * 0.5

          ctx.beginPath()
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(250,250,250,${Math.max(0, Math.min(1, alpha))})`
          ctx.fill()
        }
      }

      if (frameCount % 3 === 0) {
        ctx.save()
        const grd = ctx.createRadialGradient(w * 0.7, h * 0.3, 0, w * 0.7, h * 0.3, w * 0.5)
        grd.addColorStop(0, 'rgba(59,130,246,0.015)')
        grd.addColorStop(0.5, 'rgba(139,92,246,0.008)')
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.filter = 'blur(60px)'
        ctx.fillRect(0, 0, w, h)

        const grd2 = ctx.createRadialGradient(w * 0.3, h * 0.7, 0, w * 0.3, h * 0.7, w * 0.4)
        grd2.addColorStop(0, 'rgba(139,92,246,0.012)')
        grd2.addColorStop(1, 'transparent')
        ctx.fillStyle = grd2
        ctx.filter = 'blur(80px)'
        ctx.fillRect(0, 0, w, h)
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [stars])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      <div className="fixed inset-0 pointer-events-none noise" style={{ zIndex: 1 }} />
    </>
  )
}

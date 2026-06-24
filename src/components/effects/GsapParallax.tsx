'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'

interface GsapParallaxProps {
  children: ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export default function GsapParallax({ children, speed = 0.3, direction = 'up', className }: GsapParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const el = ref.current
    if (!el) return

    let killed = false

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (killed) return

      const offset = speed * 200
      const yFrom = direction === 'up' ? offset : direction === 'down' ? -offset : 0
      const xFrom = direction === 'left' ? offset : direction === 'right' ? -offset : 0

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      tl.fromTo(el, { y: yFrom, x: xFrom }, { y: 0, x: 0, ease: 'none' })

      return () => {
        tl.kill()
      }
    }

    const cleanupPromise = init()

    return () => {
      killed = true
      cleanupPromise.then((cleanup) => cleanup?.())
    }
  }, [speed, direction, ready])

  return <div ref={ref} className={className}>{children}</div>
}

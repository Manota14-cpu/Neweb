'use client'

import { useRef, useEffect, type ReactNode } from 'react'

interface GsapRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left'
  delay?: number
  distance?: number
}

export default function GsapReveal({ children, className, direction = 'up', delay = 0, distance = 60 }: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let killed = false
    let tween: unknown = null

    import('gsap').then(({ default: gsap }) =>
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (killed) return
        gsap.registerPlugin(ScrollTrigger)

        tween = gsap.fromTo(el,
          { opacity: 0, y: direction === 'up' ? distance : 0, x: direction === 'left' ? distance : 0 },
          { opacity: 1, y: 0, x: 0, duration: 1.2, delay, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } },
        )
      }),
    )

    return () => {
      killed = true
      if (tween && typeof (tween as any).kill === 'function') (tween as any).kill()
    }
  }, [direction, delay, distance])

  return <div ref={ref} className={className}>{children}</div>
}

'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GsapScrollOptions {
  trigger: React.RefObject<HTMLElement | null>
  animation: (tl: gsap.core.Timeline) => void
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  toggleActions?: string
}

export function useGsapScroll({
  trigger,
  animation,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  markers = false,
  toggleActions = 'play none none none',
}: GsapScrollOptions) {
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const el = trigger.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        markers,
        toggleActions,
      },
    })
    tlRef.current = tl
    animation(tl)

    return () => {
      tl.kill()
    }
  }, [trigger, start, end, scrub, markers, toggleActions])
}

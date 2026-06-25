'use client'

import { useEffect, useRef, createContext, useContext, createElement, type ReactNode } from 'react'
import { useMotionValue } from 'framer-motion'

interface SmoothScrollCtxType {
  lenis: unknown | null
  scrollY: number
  progress: number
}

const SmoothScrollCtx = createContext<SmoothScrollCtxType>({
  lenis: null,
  scrollY: 0,
  progress: 0,
})

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<unknown | null>(null)
  const scrollY = useMotionValue(0)
  const progress = useMotionValue(0)

  useEffect(() => {
    let destroyed = false
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const init = async () => {
      if (typeof window === 'undefined') return

      try {
        const Lenis = (await import('lenis')).default
        const gsap = (await import('gsap')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        if (destroyed) return

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
        })
        lenisRef.current = lenis

        const raf = (time: number) => {
          if (destroyed) return
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        lenis.on('scroll', (e: { scroll: number; progress: number }) => {
          if (destroyed) return
          scrollY.set(e.scroll)
          progress.set(e.progress)
          ScrollTrigger.update()
        })

        ScrollTrigger.scrollerProxy(document.documentElement, {
          scrollTop(value) {
            if (value !== undefined) {
              lenis.scrollTo(value, { immediate: true })
            }
            return lenis.scroll ?? 0
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
          },
          pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
        })

        ScrollTrigger.refresh()
      } catch (err) {
        // lenis unavailable
      }
    }

    init()

    return () => {
      destroyed = true
      if (lenisRef.current && typeof (lenisRef.current as any).destroy === 'function') {
        ;(lenisRef.current as any).destroy()
      }
    }
  }, [scrollY, progress])

  return createElement(SmoothScrollCtx.Provider, {
    value: { lenis: lenisRef.current, scrollY: scrollY.get(), progress: progress.get() },
  }, children)
}

export function useLenis() {
  return useContext(SmoothScrollCtx)
}

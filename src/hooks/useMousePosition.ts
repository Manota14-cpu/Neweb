import { useState, useEffect, useRef, type RefObject } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
  elementX: number
  elementY: number
}

const shared = { x: 0, y: 0, nx: 0, ny: 0 }
let ticking = false

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    shared.x = e.clientX
    shared.y = e.clientY
    if (!ticking) {
      ticking = true
      requestAnimationFrame(() => {
        shared.nx = (shared.x / window.innerWidth) * 2 - 1
        shared.ny = (shared.y / window.innerHeight) * 2 - 1
        ticking = false
      })
    }
  })
}

export function getSharedMouse() {
  return { x: shared.x, y: shared.y, normalizedX: shared.nx, normalizedY: shared.ny }
}

export function useMousePosition(ref?: RefObject<HTMLElement>): MousePosition {
  const [pos, setPos] = useState<MousePosition>({
    x: 0, y: 0, normalizedX: 0, normalizedY: 0, elementX: 0, elementY: 0,
  })
  const rafRef = useRef<number>()

  useEffect(() => {
    const tick = () => {
      const x = shared.x, y = shared.y
      const normalizedX = shared.nx, normalizedY = shared.ny
      let elementX = x, elementY = y
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect()
        elementX = x - rect.left
        elementY = y - rect.top
      }
      setPos({ x, y, normalizedX, normalizedY, elementX, elementY })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [ref])

  return pos
}

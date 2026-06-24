import { useState, useEffect, useRef } from 'react'

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const dt = Math.max(now - lastTime.current, 16)
      const dy = Math.abs(window.scrollY - lastScrollY.current)
      const v = (dy / dt) * 16

      setVelocity(Math.min(v, 100))
      lastScrollY.current = window.scrollY
      lastTime.current = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return velocity
}

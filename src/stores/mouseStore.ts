import { create } from 'zustand'

interface MouseState {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

const useMouseStore = create<MouseState>(() => ({
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
}))

let ticking = false

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      useMouseStore.setState({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
      })
      ticking = false
    })
  })
}

export default useMouseStore

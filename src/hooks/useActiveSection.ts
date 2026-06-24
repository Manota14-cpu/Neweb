import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] || '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const visibilityMap = new Map<string, number>()

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap.set(id, entry.intersectionRatio)
          })
          let maxRatio = 0
          let maxId = ''
          visibilityMap.forEach((ratio, sid) => {
            if (ratio > maxRatio) {
              maxRatio = ratio
              maxId = sid
            }
          })
          if (maxId) setActive(maxId)
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((o) => o.disconnect())
    }
  }, [sectionIds])

  return active
}

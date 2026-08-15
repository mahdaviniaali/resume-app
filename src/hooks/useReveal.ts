'use client'

import { useEffect, type RefObject } from 'react'

export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    currentRef.classList.add('rv')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(currentRef)

    return () => {
      observer.unobserve(currentRef)
    }
  }, [ref])
}

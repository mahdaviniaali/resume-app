'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

export function useInView<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  const threshold = options?.threshold ?? 0.2
  const rootMargin = options?.rootMargin ?? '0px 0px -8% 0px'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible } as { ref: RefObject<T>; visible: boolean }
}

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const view = window.innerHeight
      const start = view * 0.85
      const end = view * 0.15
      const raw = (start - rect.top) / (start - end + rect.height * 0.35)
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])

  return progress
}

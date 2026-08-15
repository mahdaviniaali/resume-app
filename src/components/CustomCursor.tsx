'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const hoveringRef = useRef(false)
  const visibleRef = useRef(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (min-width: 901px)')

    const syncEnabled = () => setEnabled(media.matches)
    syncEnabled()

    media.addEventListener('change', syncEnabled)
    return () => media.removeEventListener('change', syncEnabled)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    root.classList.add('custom-cursor-active')

    let frameId = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      visibleRef.current = true

      if (dotRef.current) {
        dotRef.current.style.opacity = '1'
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const handleMouseLeave = () => {
      visibleRef.current = false
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }

    const handleMouseEnterWindow = () => {
      visibleRef.current = true
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      return Boolean(target.closest('.glass-card, .contact-btn, a, button'))
    }

    const handleOver = (e: MouseEvent) => {
      const next = isInteractive(e.target)
      if (next === hoveringRef.current) return
      hoveringRef.current = next
      setHovering(next)
    }

    const animate = () => {
      const ring = ringRef.current
      if (ring) {
        ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.15
        ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.15
        ring.style.opacity = visibleRef.current ? '1' : '0'
        ring.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`
      }
      frameId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnterWindow)
    frameId = requestAnimationFrame(animate)

    return () => {
      root.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      cancelAnimationFrame(frameId)
      hoveringRef.current = false
      setHovering(false)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[1000] h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[999] rounded-full border opacity-0 will-change-transform ${
          hovering
            ? 'h-20 w-20 border-white/60'
            : 'h-10 w-10 border-white/30'
        }`}
        style={{ transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.2s ease' }}
      />
    </>
  )
}

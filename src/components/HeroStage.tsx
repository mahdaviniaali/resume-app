'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Matches public/hero.png (1983×793) — one fixed desktop canvas that scales like a photo */
export const HERO_DESIGN_W = 1280
export const HERO_DESIGN_H = Math.round((1280 * 793) / 1983) // 512

export function HeroStage({ children }: { children: ReactNode }) {
  const shellRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const el = shellRef.current
    if (!el) return

    const updateScale = () => {
      setScale(el.clientWidth / HERO_DESIGN_W)
    }
    updateScale()

    const ro = new ResizeObserver(updateScale)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = Math.min(window.scrollY, window.innerHeight)
      setParallaxY(y * 0.22)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={shellRef}
      className="relative w-full overflow-hidden bg-[#050505]"
      style={{ height: HERO_DESIGN_H * scale }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left will-change-transform"
        style={{
          width: HERO_DESIGN_W,
          height: HERO_DESIGN_H,
          transform: `scale(${scale})`,
        }}
      >
        <img
          src="/hero.png"
          alt=""
          className="pointer-events-none absolute inset-x-0 top-0 h-[108%] w-full object-cover object-center will-change-transform"
          style={{ transform: `translateY(${parallaxY}px)` }}
          fetchPriority="high"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/78 via-[#050505]/22 to-transparent to-[58%]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent"
          aria-hidden
        />
        {/* Soft seam only — thin fade at the bottom edge of the photo */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#050505] to-transparent"
          aria-hidden
        />
        {children}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'

export function HeroBackdrop() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = Math.min(window.scrollY, window.innerHeight)
      setOffset(y * 0.22)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <img
        src="/hero.png"
        alt=""
        className="absolute inset-0 h-[108%] w-full object-cover object-[74%_42%] sm:object-[70%_40%] lg:object-[68%_38%]"
        style={{ transform: `translateY(${offset}px) scale(1.04)` }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/92 via-[#050505]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-black/35" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
    </div>
  )
}

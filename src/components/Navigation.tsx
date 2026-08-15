'use client'

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

export function Navigation() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <nav ref={ref} className="mb-20 flex items-center justify-between py-8 sm:mb-32">
      <div className="font-display text-2xl font-bold text-white">Genesis</div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-[2px] text-muted">
        <span className="inline-block h-2 w-2 animate-blink rounded-full bg-white/80" />
        System Architecture
      </div>
    </nav>
  )
}

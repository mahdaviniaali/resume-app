'use client'

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

const links = [
  { href: '#void', label: 'Void' },
  { href: '#crossing', label: 'Crossing' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#method', label: 'Method' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export function Navigation({ brandName = 'Genesis' }: { brandName?: string }) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <nav
      ref={ref}
      className="mb-16 flex flex-col gap-6 py-8 sm:mb-24 sm:flex-row sm:items-center sm:justify-between"
    >
      <a href="#hero" className="font-display text-2xl font-bold text-white">
        {brandName}
      </a>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[2px] text-muted">
        <span className="mr-1 inline-flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-blink rounded-full bg-white/80" />
          Protocol
        </span>
        {links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-white">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

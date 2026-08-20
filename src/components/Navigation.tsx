'use client'

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

const links = [
  { href: '#beyond', label: 'Beyond' },
  { href: '#void', label: 'Void' },
  { href: '#crossing', label: 'Crossing' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#method', label: 'Method' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export function Navigation({ brandName = 'ISEMPTY' }: { brandName?: string }) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  const brand =
    !brandName || brandName === 'Genesis' || brandName === 'جنسیس' ? 'ISEMPTY' : brandName

  return (
    <nav ref={ref} className="flex items-center justify-between gap-6 py-4">
      <a
        href="#hero"
        className="shrink-0 font-display text-base font-extrabold uppercase tracking-[0.22em] text-white"
      >
        <span className="me-2 font-mono font-normal tracking-normal text-gold">&gt;_</span>
        {brand}
      </a>
      <div className="flex flex-nowrap items-center justify-end gap-x-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span className="inline-flex items-center gap-2 text-gold">
          <span className="inline-block h-1.5 w-1.5 animate-blink bg-gold" />
          ONLINE
        </span>
        {links.map((link) => (
          <a key={link.href} href={link.href} className="whitespace-nowrap transition-colors hover:text-white">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

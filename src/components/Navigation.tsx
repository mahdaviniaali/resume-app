'use client'

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

const links = [
  { href: '#beyond', label: 'فراتر از کد' },
  { href: '#void', label: 'خلأ' },
  { href: '#crossing', label: 'گذار' },
  { href: '#capabilities', label: 'توانایی‌ها' },
  { href: '#method', label: 'روش' },
  { href: '#team', label: 'تیم' },
  { href: '#contact', label: 'تماس' },
]

export function Navigation({ brandName = 'ISEMPTY' }: { brandName?: string }) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  const brand = !brandName || brandName === 'Genesis' || brandName === 'جنسیس' ? 'ISEMPTY' : brandName

  return (
    <nav
      ref={ref}
      className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4"
    >
      <a
        href="#hero"
        dir="ltr"
        className="font-display text-sm font-extrabold uppercase tracking-[0.22em] text-white sm:text-base"
      >
        <span className="me-2 font-mono font-normal tracking-normal text-gold">&gt;_</span>
        {brand}
      </a>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span className="inline-flex items-center gap-2 text-gold">
          <span className="inline-block h-1.5 w-1.5 animate-blink bg-gold" />
          ONLINE
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

'use client'

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface VoidSectionProps {
  title: string
  subtitle: string
  items: { label: string; title: string; text: string }[]
}

export function VoidSection({ title, subtitle, items }: VoidSectionProps) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section id="void" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="mb-3 text-xs uppercase tracking-[3px] text-[#666]">{subtitle}</p>
      <h2 className="mb-12 font-display text-4xl text-white sm:text-5xl">{title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="glass-card"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="mb-4 font-mono text-xs tracking-[2px] text-[#555]">{item.label}</div>
            <h3 className="mb-3 font-display text-xl text-white">{item.title}</h3>
            <p className="text-sm font-light leading-relaxed text-[#888]">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

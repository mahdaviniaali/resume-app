'use client'

import { useRef } from 'react'
import { GlassCard } from '@/components/GlassCard'
import { useReveal } from '@/hooks/useReveal'

interface CapabilitiesSectionProps {
  title: string
  subtitle: string
  cards: {
    icon: string
    title: string
    description: string
    code?: string
    span?: number
  }[]
}

export function CapabilitiesSection({ title, subtitle, cards }: CapabilitiesSectionProps) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section id="capabilities" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="mb-3 text-xs uppercase tracking-[3px] text-[#666]">{subtitle}</p>
      <h2 className="mb-12 font-display text-4xl text-white sm:text-5xl">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        {cards.map((card) => (
          <GlassCard
            key={card.title}
            className={card.span === 2 ? 'sm:col-span-2' : ''}
            icon={card.icon}
            title={card.title}
            description={card.description}
            code={card.code}
          />
        ))}
      </div>
    </section>
  )
}

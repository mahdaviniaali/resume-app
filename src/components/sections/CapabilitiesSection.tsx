'use client'

import { SectionHeader } from '@/components/SectionHeader'

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

/** Same rhythm as hero TechStack — mono title + quiet subtitle body */
export function CapabilitiesSection({ title, subtitle, cards }: CapabilitiesSectionProps) {
  return (
    <section id="capabilities" className="scroll-mt-24">
      <SectionHeader index="04" kicker={subtitle} title={title} />

      <ul className="grid gap-8 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.title} className={card.span === 2 ? 'sm:col-span-2' : ''}>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gold-bright">
              {card.icon}
            </p>
            <p className="mt-2 font-inter text-[0.95rem] font-light uppercase tracking-[0.12em] text-white/90">
              {card.title}
            </p>
            <p className="mt-3 max-w-md font-quote text-[0.9rem] font-light leading-roomy tracking-[0.03em] text-[#cfcfcf]">
              {card.description}
            </p>
            {card.code ? (
              <pre
                dir="ltr"
                className="mt-4 overflow-x-auto font-mono text-[11px] leading-6 text-dim"
              >
                {card.code}
              </pre>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

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

/** Vertical beam stack — what you buy, not Idea·Craft·Reach */
export function CapabilitiesSection({ title, subtitle, cards }: CapabilitiesSectionProps) {
  return (
    <section id="capabilities" className="scroll-mt-24">
      <SectionHeader index="04" kicker={subtitle} title={title} />

      <div className="stage-panel caps-panel">
        <div className="caps-glow" aria-hidden />
        <ul className="caps-beams">
          {cards.map((card, i) => (
            <li key={card.title} className="caps-beam" style={{ ['--i' as string]: i }}>
              <span className="caps-beam-rail" aria-hidden />
              <div className="caps-beam-body">
                <p className="caps-beam-idx">{card.icon}</p>
                <p className="caps-beam-title">{card.title}</p>
                <p className="caps-beam-desc">{card.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

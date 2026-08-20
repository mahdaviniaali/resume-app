'use client'

import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'

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
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      id="capabilities"
      ref={ref}
      className={`mt-28 scroll-mt-24 transition-opacity duration-700 sm:mt-36 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <SectionHeader index="04" kicker={subtitle} title={title} />

      <ul className="grid gap-px bg-line sm:grid-cols-2">
        {cards.map((card, i) => (
          <li
            key={card.title}
            className={`bg-void p-7 transition-colors duration-500 hover:bg-ink sm:p-9 ${
              card.span === 2 ? 'sm:col-span-2' : ''
            }`}
            style={{
              opacity: visible ? 1 : 0.3,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 60}ms`,
              transitionProperty: 'opacity, transform, background-color',
            }}
          >
            <p className="mb-5 font-mono text-[10px] tracking-[0.2em] text-gold/75">{card.icon}</p>
            <h3 className="mb-3 font-sans text-xl font-medium text-white sm:text-2xl">{card.title}</h3>
            <p className="max-w-xl text-[0.92rem] leading-8 text-[#9a9a9a]">{card.description}</p>
            {card.code ? (
              <pre
                dir="ltr"
                className="mt-6 overflow-x-auto border border-line bg-black/50 p-4 font-mono text-[11px] leading-6 text-[#a8a8a8]"
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

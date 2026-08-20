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
      className={`mt-28 scroll-mt-24 transition-opacity duration-700 sm:mt-40 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <SectionHeader index="04" kicker={subtitle} title={title} />

      <ul className="relative">
        {cards.map((card, i) => (
          <li
            key={card.title}
            className="group relative border-t border-line last:border-b"
            style={{
              opacity: visible ? 1 : 0.3,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: `${i * 55}ms`,
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.6s',
            }}
          >
            <article className="grid gap-6 py-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-start sm:gap-12 sm:py-14 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.15fr)]">
              <span className="hidden font-display text-3xl font-black text-white/10 transition-colors group-hover:text-gold/30 lg:block">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <p className="mb-4 font-mono text-[10px] tracking-[0.22em] text-gold/80">{card.icon}</p>
                <h3 className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-white transition-colors group-hover:text-gold sm:text-3xl">
                  {card.title}
                </h3>
              </div>

              <div>
                <p className="max-w-xl font-inter text-[0.95rem] font-light leading-8 text-[#9a9a9a] group-hover:text-[#cfcfcf]">
                  {card.description}
                </p>
                {card.code ? (
                  <pre
                    dir="ltr"
                    className="mt-6 overflow-x-auto border-l-2 border-gold/50 bg-black/40 py-4 pl-5 pr-4 font-mono text-[11px] leading-6 text-[#a8a8a8]"
                  >
                    {card.code}
                  </pre>
                ) : null}
              </div>
            </article>

            <div
              className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full"
              aria-hidden
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

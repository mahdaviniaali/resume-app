'use client'

import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'

interface VoidSectionProps {
  title: string
  subtitle: string
  items: { label: string; title: string; text: string }[]
}

export function VoidSection({ title, subtitle, items }: VoidSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.12 })

  return (
    <section
      id="void"
      ref={ref}
      className={`mt-28 scroll-mt-24 sm:mt-40 ${visible ? 'opacity-100' : 'opacity-50'} transition-opacity duration-700`}
    >
      <SectionHeader index="02" kicker={subtitle} title={title} />

      <div className="relative">
        <p
          className="pointer-events-none absolute -right-4 top-0 hidden select-none font-display text-[clamp(5rem,12vw,9rem)] font-black uppercase leading-none tracking-tighter text-white/[0.035] sm:block"
          aria-hidden
        >
          STUCK
        </p>

        <ul className="relative space-y-0">
          {items.map((item, i) => (
            <li
              key={item.label}
              className="group relative border-t border-line py-12 last:border-b sm:py-14"
              style={{
                transitionDelay: visible ? `${i * 90}ms` : '0ms',
                opacity: visible ? 1 : 0.35,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.65s ease, transform 0.65s ease',
              }}
            >
              <div className="grid gap-6 sm:grid-cols-[7rem_1fr] sm:gap-10 lg:grid-cols-[7rem_minmax(0,18rem)_1fr]">
                <span className="font-display text-4xl font-black tracking-tight text-white/15 transition-colors group-hover:text-gold/40 sm:text-5xl">
                  {item.label}
                </span>

                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-white sm:text-3xl">
                    <span className="decoration-white/25 group-hover:line-through group-hover:decoration-gold/50">
                      {item.title}
                    </span>
                  </h3>
                  <div
                    className="mt-4 h-px w-12 origin-left bg-gold transition-all duration-500 group-hover:w-24"
                    aria-hidden
                  />
                </div>

                <p className="max-w-lg font-inter text-[0.95rem] font-light leading-8 text-[#8f8f8f] transition-colors group-hover:text-[#c8c8c8] lg:pt-1">
                  {item.text}
                </p>
              </div>

              {/* Fault line accent */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-px scale-y-0 bg-gold/50 transition-transform duration-500 group-hover:scale-y-100"
                aria-hidden
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

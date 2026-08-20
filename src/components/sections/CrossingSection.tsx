'use client'

import { SectionHeader } from '@/components/SectionHeader'
import { useInView, useScrollProgress } from '@/hooks/useInView'

interface CrossingSectionProps {
  title: string
  subtitle: string
  steps: { from: string; to: string }[]
}

export function CrossingSection({ title, subtitle, steps }: CrossingSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.12 })
  const progress = useScrollProgress(ref)

  return (
    <section
      id="crossing"
      ref={ref}
      className={`mt-28 scroll-mt-24 transition-opacity duration-700 sm:mt-36 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <SectionHeader index="03" kicker={subtitle} title={title} />

      <div className="relative overflow-hidden border border-line bg-ink/60">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r from-gold/10 to-transparent"
          style={{ width: `${12 + progress * 55}%` }}
          aria-hidden
        />

        <ul className="relative divide-y divide-line">
          {steps.map((step, i) => {
            const on = progress > i / steps.length
            return (
              <li
                key={`${step.from}-${step.to}`}
                className="grid items-center gap-4 px-5 py-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-8 sm:px-8 sm:py-10"
              >
                <p
                  className={`text-left font-sans text-base transition-colors duration-500 sm:text-lg ${
                    on ? 'text-[#8a8a8a] line-through decoration-white/20' : 'text-[#6a6a6a]'
                  }`}
                >
                  {step.from}
                </p>
                <span
                  className={`hidden font-mono text-[10px] tracking-[0.28em] sm:inline ${
                    on ? 'text-gold' : 'text-muted'
                  }`}
                >
                  →
                </span>
                <p
                  className={`text-left font-sans text-base font-medium transition-colors duration-500 sm:text-lg ${
                    on ? 'text-white' : 'text-[#5a5a5a]'
                  }`}
                >
                  {step.to}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

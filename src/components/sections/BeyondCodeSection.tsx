'use client'

import { SectionHeader } from '@/components/SectionHeader'
import { useInView, useScrollProgress } from '@/hooks/useInView'

interface BeyondCodeSectionProps {
  title?: string
  subtitle?: string
  lead?: string
  stages?: { label: string; text: string }[]
}

const defaultStages = [
  {
    label: 'Idea',
    text: 'Bring the unfinished thought. We pressure-test it and turn fog into something buildable.',
  },
  {
    label: 'System',
    text: 'Abstract thinking becomes working architecture — clean enough to own, sharp enough to scale.',
  },
  {
    label: 'Experience',
    text: 'We obsess over the path. Users decide fast — and never disappear into the UI.',
  },
]

export function BeyondCodeSection({
  title = 'More than code',
  subtitle = 'Idea · System · Experience',
  lead,
  stages = defaultStages,
}: BeyondCodeSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.12 })
  const progress = useScrollProgress(ref)
  const phase = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2

  return (
    <section
      id="beyond"
      ref={ref}
      className={`mt-28 scroll-mt-24 transition-opacity duration-700 sm:mt-36 ${
        visible ? 'opacity-100' : 'opacity-40'
      }`}
    >
      <SectionHeader index="01" kicker={subtitle} title={title} lead={lead} />

      <div className="relative border-y border-line">
        <ol className="grid md:grid-cols-3">
          {stages.map((stage, i) => {
            const active = phase === i
            return (
              <li
                key={stage.label}
                className={`relative border-line px-1 py-10 md:border-l md:px-8 md:first:border-l-0 ${
                  active ? 'bg-white/[0.03]' : ''
                }`}
              >
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-sm uppercase tracking-[0.18em] transition-colors ${
                      active ? 'text-gold' : 'text-white/35'
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
                <p
                  className={`text-[0.95rem] leading-8 transition-colors duration-500 ${
                    active ? 'text-[#e8e8e8]' : 'text-[#7a7a7a]'
                  }`}
                >
                  {stage.text}
                </p>
                <div
                  className="mt-8 h-px origin-left bg-gold transition-transform duration-700"
                  style={{ transform: active ? 'scaleX(1)' : 'scaleX(0.15)', opacity: active ? 1 : 0.25 }}
                  aria-hidden
                />
              </li>
            )
          })}
        </ol>
        <div className="h-px w-full bg-line" aria-hidden>
          <div
            className="h-px bg-gold transition-all duration-500"
            style={{ width: `${((phase + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}

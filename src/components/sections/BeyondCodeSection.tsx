'use client'

import { useState } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'

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
  const [active, setActive] = useState(0)
  const current = stages[active] ?? stages[0]

  return (
    <section
      id="beyond"
      ref={ref}
      className={`mt-14 scroll-mt-24 transition-opacity duration-700 sm:mt-20 ${
        visible ? 'opacity-100' : 'opacity-40'
      }`}
    >
      <SectionHeader index="01" kicker={subtitle} title={title} lead={lead} />

      <div className="relative min-h-[22rem] overflow-hidden border-y border-line sm:min-h-[26rem]">
        {/* Giant stage word — visual anchor */}
        <p
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[clamp(4rem,18vw,11rem)] font-black uppercase leading-none tracking-[-0.04em] text-white/[0.045] transition-all duration-500"
          aria-hidden
        >
          {current.label}
        </p>

        <div className="relative grid gap-10 py-12 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-14 sm:py-16">
          <ol className="flex flex-row gap-2 sm:flex-col sm:gap-1">
            {stages.map((stage, i) => {
              const on = i === active
              return (
                <li key={stage.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-baseline gap-3 px-1 py-2 text-left transition-colors ${
                      on ? 'text-gold' : 'text-white/35 hover:text-white/70'
                    }`}
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-sm uppercase tracking-[0.2em] sm:text-base ${
                        on ? 'text-gold' : ''
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span
                      className={`ml-auto hidden h-px flex-1 origin-left bg-gold transition-transform duration-500 sm:block ${
                        on ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden
                    />
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="flex max-w-xl flex-col justify-center">
            <p className="mb-4 font-display text-3xl font-bold uppercase tracking-[0.12em] text-white sm:text-4xl">
              {current.label}
            </p>
            <p
              key={current.label}
              className="section-swap text-[1.05rem] font-light leading-9 text-[#d0d0d0]"
            >
              {current.text}
            </p>
            <div className="mt-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-muted">
              <span className="text-gold">{String(active + 1).padStart(2, '0')}</span>
              <span className="h-px w-8 bg-line" aria-hidden />
              <span>{String(stages.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

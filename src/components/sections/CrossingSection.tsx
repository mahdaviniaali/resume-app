'use client'

import { SectionHeader } from '@/components/SectionHeader'

interface CrossingSectionProps {
  title: string
  subtitle: string
  steps: { from: string; to: string }[]
}

export function CrossingSection({ title, subtitle, steps }: CrossingSectionProps) {
  return (
    <section id="crossing" className="scroll-mt-24">
      <SectionHeader index="03" kicker={subtitle} title={title} />

      <ul className="max-w-3xl">
        {steps.map((step, i) => (
          <li key={`${step.from}-${step.to}`} className={i === 0 ? '' : 'mt-5'}>
            {i > 0 && <div className="mb-5 h-px w-7 bg-line/80" />}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-inter text-[10px] font-light uppercase tracking-[0.12em] text-muted">
                {step.from}
              </span>
              <span className="font-mono text-[10px] text-gold">→</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#c8c8c8]">
                {step.to}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

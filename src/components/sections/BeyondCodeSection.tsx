'use client'

import { SectionHeader } from '@/components/SectionHeader'

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

/** Layout language copied from hero roles + tech stack */
export function BeyondCodeSection({
  title = 'More than code',
  subtitle = 'Idea · System · Experience',
  lead,
  stages = defaultStages,
}: BeyondCodeSectionProps) {
  return (
    <section id="beyond" className="scroll-mt-24">
      <SectionHeader index="01" kicker={subtitle} title={title} lead={lead} />

      <ul className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {stages.map((stage, i) => (
          <li key={stage.label} className="text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
              {String(i + 1).padStart(2, '0')} // {stage.label}
            </p>
            <div className="my-3 h-px w-7 bg-line/80" aria-hidden />
            <p className="font-quote text-[0.9rem] font-light leading-roomy tracking-[0.03em] text-[#cfcfcf]">
              {stage.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

'use client'

import { SectionHeader } from '@/components/SectionHeader'

interface MethodSectionProps {
  title: string
  subtitle: string
  steps: { key: string; text: string }[]
}

export function MethodSection({ title, subtitle, steps }: MethodSectionProps) {
  return (
    <section id="method" className="scroll-mt-24">
      <SectionHeader index="05" kicker={subtitle} title={title} />

      <ul className="flex flex-wrap gap-x-10 gap-y-8">
        {steps.map((step, i) => (
          <li key={step.key} className="max-w-[14rem] text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
              {String(i + 1).padStart(2, '0')} // {step.key}
            </p>
            <div className="my-3 h-px w-7 bg-line/80" aria-hidden />
            <p className="font-inter text-[10px] font-light uppercase leading-relaxed tracking-[0.1em] text-muted">
              {step.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

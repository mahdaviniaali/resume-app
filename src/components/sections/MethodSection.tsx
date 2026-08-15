'use client'

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface MethodSectionProps {
  title: string
  subtitle: string
  steps: { key: string; text: string }[]
}

export function MethodSection({ title, subtitle, steps }: MethodSectionProps) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section id="method" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="mb-3 text-xs uppercase tracking-[3px] text-[#666]">{subtitle}</p>
      <h2 className="mb-12 font-display text-4xl text-white sm:text-5xl">{title}</h2>
      <ol className="space-y-0">
        {steps.map((step, i) => (
          <li
            key={step.key}
            className="group grid grid-cols-[auto_1fr] gap-6 border-t border-white/10 py-8 last:border-b"
          >
            <div className="font-mono text-sm text-[#555]">0{i + 1}</div>
            <div>
              <h3 className="mb-2 font-display text-2xl text-white transition-colors group-hover:text-[#ddd]">
                {step.key}
              </h3>
              <p className="max-w-2xl text-sm font-light leading-relaxed text-[#888]">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

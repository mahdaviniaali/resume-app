'use client'

import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'

interface MethodSectionProps {
  title: string
  subtitle: string
  steps: { key: string; text: string }[]
}

export function MethodSection({ title, subtitle, steps }: MethodSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.12 })

  return (
    <section
      id="method"
      ref={ref}
      className={`mt-28 scroll-mt-24 transition-opacity duration-700 sm:mt-36 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <SectionHeader index="05" kicker={subtitle} title={title} />

      <ol className="relative border-t border-line">
        <div
          className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-line sm:block md:left-[4.75rem]"
          aria-hidden
        />
        {steps.map((step, i) => (
          <li
            key={step.key}
            className="relative grid gap-4 border-b border-line py-10 sm:grid-cols-[5.5rem_minmax(0,12rem)_1fr] sm:gap-8 sm:py-12"
            style={{
              opacity: visible ? 1 : 0.3,
              transform: visible ? 'translateY(0)' : 'translateY(18px)',
              transition: `opacity 0.6s ease ${i * 90}ms, transform 0.6s ease ${i * 90}ms`,
            }}
          >
            <span className="relative z-[1] font-mono text-xs tracking-[0.22em] text-muted">
              {String(i + 1).padStart(2, '0')}
              <span className="absolute -right-1.5 top-1.5 hidden h-2.5 w-2.5 rounded-full border border-gold bg-void sm:block md:-right-[1.15rem]" />
            </span>
            <h3 className="font-display text-lg uppercase tracking-[0.16em] text-gold sm:text-xl">
              {step.key}
            </h3>
            <p className="max-w-2xl text-[0.95rem] leading-8 text-[#a0a0a0]">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

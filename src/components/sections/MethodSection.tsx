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
      className={`mt-28 scroll-mt-24 transition-opacity duration-700 sm:mt-40 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <SectionHeader index="05" kicker={subtitle} title={title} />

      <ol className="relative">
        {steps.map((step, i) => (
          <li
            key={step.key}
            className="group relative overflow-hidden border-t border-line last:border-b"
            style={{
              opacity: visible ? 1 : 0.3,
              transform: visible ? 'translateY(0)' : 'translateY(18px)',
              transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
            }}
          >
            {/* Huge verb watermark */}
            <span
              className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(3.5rem,10vw,7rem)] font-black uppercase leading-none tracking-tighter text-white/[0.03] transition-colors duration-500 group-hover:text-gold/[0.07]"
              aria-hidden
            >
              {step.key}
            </span>

            <div className="relative grid gap-5 py-12 sm:grid-cols-[5rem_minmax(0,16rem)_1fr] sm:items-center sm:gap-10 sm:py-16">
              <span className="font-mono text-xs tracking-[0.28em] text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="font-display text-3xl font-extrabold uppercase tracking-[0.1em] text-white transition-colors group-hover:text-gold sm:text-4xl">
                {step.key}
              </h3>

              <p className="max-w-xl font-inter text-[0.95rem] font-light leading-8 text-[#9a9a9a] group-hover:text-[#d0d0d0]">
                {step.text}
              </p>
            </div>

            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-700 group-hover:w-2/3"
              aria-hidden
            />
          </li>
        ))}
      </ol>
    </section>
  )
}

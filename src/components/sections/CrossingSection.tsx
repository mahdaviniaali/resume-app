'use client'

import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'

interface CrossingSectionProps {
  title: string
  subtitle: string
  steps: { from: string; to: string }[]
}

export function CrossingSection({ title, subtitle, steps }: CrossingSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.12 })

  return (
    <section
      id="crossing"
      ref={ref}
      className={`mt-28 scroll-mt-24 transition-opacity duration-700 sm:mt-40 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <SectionHeader index="03" kicker={subtitle} title={title} />

      <div className="relative">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-4 font-mono text-[10px] uppercase tracking-[0.28em]">
          <span className="text-[#6a6a6a]">From the fog</span>
          <span className="text-gold">Into the path</span>
        </div>

        <ul className="space-y-3">
          {steps.map((step, i) => (
            <li
              key={`${step.from}-${step.to}`}
              className="group relative grid overflow-hidden sm:grid-cols-2"
              style={{
                opacity: visible ? 1 : 0.3,
                transform: visible ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity 0.55s ease ${i * 70}ms, transform 0.55s ease ${i * 70}ms`,
              }}
            >
              <div className="relative border border-line border-b-0 bg-ink/40 px-5 py-7 sm:border-b sm:border-r-0 sm:px-8 sm:py-9">
                <span className="mb-3 block font-mono text-[9px] tracking-[0.24em] text-muted">
                  {String(i + 1).padStart(2, '0')} · BEFORE
                </span>
                <p className="font-sans text-lg text-[#7a7a7a] line-through decoration-white/20 transition-colors group-hover:text-[#5a5a5a] sm:text-xl">
                  {step.from}
                </p>
              </div>

              <div className="relative border border-line bg-void px-5 py-7 transition-colors duration-500 group-hover:border-gold/40 group-hover:bg-gold/[0.04] sm:px-8 sm:py-9">
                <span className="mb-3 block font-mono text-[9px] tracking-[0.24em] text-gold/70">
                  AFTER →
                </span>
                <p className="font-display text-lg font-bold uppercase tracking-[0.06em] text-white sm:text-xl">
                  {step.to}
                </p>

                {/* Slash mark */}
                <span
                  className="pointer-events-none absolute -left-3 top-1/2 hidden -translate-y-1/2 font-display text-3xl text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
                  aria-hidden
                >
                  /
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

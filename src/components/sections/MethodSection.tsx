'use client'

import { SectionHeader } from '@/components/SectionHeader'

interface MethodSectionProps {
  title: string
  subtitle: string
  steps: { key: string; text: string }[]
}

/** Engagement path — stations on a drawing track */
export function MethodSection({ title, subtitle, steps }: MethodSectionProps) {
  return (
    <section id="method" className="scroll-mt-24">
      <SectionHeader index="04" kicker={subtitle} title={title} />

      <div className="stage-panel method-panel">
        <div className="method-glow" aria-hidden />
        <div className="method-track" aria-hidden>
          <span className="method-track-line" />
        </div>
        <ol className="method-stations">
          {steps.map((step, i) => (
            <li key={step.key} className="method-station" style={{ ['--i' as string]: i }}>
              <span className="method-node" aria-hidden>
                <span className="method-node-ring" />
              </span>
              <p className="method-key">
                {String(i + 1).padStart(2, '0')} // {step.key}
              </p>
              <p className="method-text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

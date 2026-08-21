'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'

interface MethodSectionProps {
  title: string
  subtitle: string
  lead?: string
  steps: { key: string; text: string }[]
}

/** Path from thought → clear experience — open field, same language as Beyond / Leverage */
export function MethodSection({ title, subtitle, lead, steps }: MethodSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.2 })
  const [live, setLive] = useState(false)

  // Old CMS copy used a long sentence as subtitle — keep header sane
  const longSubtitle = subtitle.trim().length > 36
  const kicker = longSubtitle ? 'Method' : subtitle
  const leadText = lead ?? (longSubtitle ? subtitle : undefined)

  useEffect(() => {
    if (!visible) return
    setLive(true)
  }, [visible])

  return (
    <section id="method" className="scroll-mt-24" ref={ref}>
      <SectionHeader
        index="03"
        kicker={kicker}
        title={title}
        lead={leadText}
        leadHighlight="doesn’t lose anyone"
      />

      <div className={`method-field ${live ? 'is-live' : ''}`}>
        <div className="method-wash" aria-hidden />
        <div className="method-wash method-wash-b" aria-hidden />

        <ol className="method-path">
          <span className="method-spine" aria-hidden />
          {steps.map((step, i) => (
            <li
              key={step.key}
              className="method-step"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="method-step-idx">{String(i + 1).padStart(2, '0')}</span>
              <div className="method-step-body">
                <h3 className="method-step-key">{step.key}</h3>
                <p className="method-step-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

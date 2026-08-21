'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'

interface LeverageSectionProps {
  title: string
  subtitle: string
  lead: string
  leftLabel: string
  leftText: string
  rightLabel: string
  rightText: string
  vibeLabel: string
  vibeText: string
}

const NOISE = [
  { t: 'gen', x: 6, y: 18, d: 0 },
  { t: '??', x: 38, y: 12, d: 0.15 },
  { t: 'tmp', x: 70, y: 22, d: 0.3 },
  { t: 'vibe', x: 16, y: 48, d: 0.45 },
  { t: '…', x: 52, y: 42, d: 0.2 },
  { t: 'ok?', x: 78, y: 52, d: 0.55 },
  { t: 'draft', x: 28, y: 72, d: 0.35 },
  { t: 'NaN', x: 62, y: 78, d: 0.5 },
]

const SIGNAL = [
  { t: 'aim', x: 72, y: 16, d: 0.1 },
  { t: 'arch', x: 84, y: 42, d: 0.25 },
  { t: 'ship', x: 76, y: 72, d: 0.4 },
]

const CHECKS = [
  { label: 'structure', d: 0.15 },
  { label: 'constraints', d: 0.35 },
  { label: 'shippable', d: 0.55 },
]

/** Open dual-field — noise → aimed signal, then vibe rescue */
export function LeverageSection({
  title,
  subtitle,
  lead,
  leftLabel,
  leftText,
  rightLabel,
  rightText,
  vibeLabel,
  vibeText,
}: LeverageSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.22 })
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (!visible) return
    setLive(true)
  }, [visible])

  return (
    <section id="leverage" className="scroll-mt-24" ref={ref}>
      <SectionHeader index="03" kicker={subtitle} title={title} lead={lead} />

      <div className={`leverage-field ${live ? 'is-live' : ''}`}>
        <div className="leverage-wash" aria-hidden />
        <div className="leverage-wash leverage-wash-b" aria-hidden />

        <div className="leverage-split">
          <div className="leverage-lane leverage-lane-noise">
            <div className="leverage-copy">
              <p className="leverage-lane-label">{leftLabel}</p>
              <p className="leverage-lane-text">{leftText}</p>
            </div>
            <div className="leverage-stage leverage-noise-field" aria-hidden>
              {NOISE.map((bit, i) => (
                <span
                  key={`${bit.t}-${i}`}
                  className="leverage-token"
                  style={
                    {
                      left: `${bit.x}%`,
                      top: `${bit.y}%`,
                      animationDelay: `${bit.d}s`,
                    } as CSSProperties
                  }
                >
                  {bit.t}
                </span>
              ))}
              <div className="leverage-hollows">
                {[0, 1, 2].map((i) => (
                  <span
                    key={`h-${i}`}
                    className="leverage-hollow"
                    style={{ animationDelay: `${0.2 + i * 0.18}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="leverage-hinge" aria-hidden>
            <span className="leverage-hinge-line" />
            <span className="leverage-hinge-bead" />
            <span className="leverage-hinge-spark" />
            <span className="leverage-hinge-spark leverage-hinge-spark-b" />
          </div>

          <div className="leverage-lane leverage-lane-signal">
            <div className="leverage-copy">
              <p className="leverage-lane-label leverage-lane-label-on">{rightLabel}</p>
              <p className="leverage-lane-text">{rightText}</p>
            </div>
            <div className="leverage-stage leverage-signal-field" aria-hidden>
              <span className="leverage-signal-spine" />
              <span className="leverage-signal-pulse" />
              <span className="leverage-signal-pulse leverage-signal-pulse-delay" />
              {SIGNAL.map((bit) => (
                <span
                  key={bit.t}
                  className="leverage-signal-bit"
                  style={
                    {
                      left: `${bit.x}%`,
                      top: `${bit.y}%`,
                      animationDelay: `${0.4 + bit.d}s`,
                    } as CSSProperties
                  }
                >
                  {bit.t}
                </span>
              ))}
              <ul className="leverage-checks">
                {CHECKS.map((c) => (
                  <li
                    key={c.label}
                    className="leverage-check"
                    style={{ '--d': `${0.55 + c.d}s` } as CSSProperties}
                  >
                    <span className="leverage-check-mark" />
                    <span className="leverage-check-label">{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="leverage-vibe">
          <p className="leverage-vibe-label">{vibeLabel}</p>
          <p className="leverage-vibe-text">{vibeText}</p>
        </div>
      </div>
    </section>
  )
}

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
  { t: 'gen', x: 8, y: 14, d: 0 },
  { t: '??', x: 42, y: 10, d: 0.15 },
  { t: 'tmp', x: 68, y: 22, d: 0.3 },
  { t: 'vibe', x: 18, y: 38, d: 0.45 },
  { t: '…', x: 52, y: 44, d: 0.2 },
  { t: 'ok?', x: 78, y: 48, d: 0.55 },
  { t: 'draft', x: 28, y: 62, d: 0.35 },
  { t: 'NaN', x: 60, y: 68, d: 0.5 },
  { t: 'hack', x: 12, y: 78, d: 0.65 },
  { t: 'todo', x: 74, y: 76, d: 0.4 },
]

const SIGNAL = [
  { t: 'aim', x: 10, y: 18, d: 0.1 },
  { t: 'arch', x: 38, y: 14, d: 0.25 },
  { t: 'ship', x: 66, y: 20, d: 0.4 },
  { t: 'own', x: 22, y: 48, d: 0.55 },
  { t: 'hold', x: 54, y: 52, d: 0.7 },
  { t: 'scale', x: 78, y: 58, d: 0.85 },
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
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!visible) return
    setPhase(1)
    const t2 = window.setTimeout(() => setPhase(2), 900)
    const t3 = window.setTimeout(() => setPhase(3), 1900)
    return () => {
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [visible])

  return (
    <section id="leverage" className="scroll-mt-24" ref={ref} data-phase={phase}>
      <SectionHeader index="03" kicker={subtitle} title={title} lead={lead} />

      <div className={`leverage-field ${visible ? 'is-live' : ''}`}>
        <div className="leverage-wash" aria-hidden />
        <div className="leverage-wash leverage-wash-b" aria-hidden />

        <div className="leverage-split">
          {/* AI alone — hollow ticks + noise */}
          <div className="leverage-lane leverage-lane-noise">
            <div className="leverage-noise-field" aria-hidden>
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
            <p className="leverage-lane-label">{leftLabel}</p>
            <p className="leverage-lane-text">{leftText}</p>
          </div>

          <div className="leverage-hinge" aria-hidden>
            <span className="leverage-hinge-line" />
            <span className="leverage-hinge-bead" />
            <span className="leverage-hinge-spark" />
            <span className="leverage-hinge-spark leverage-hinge-spark-b" />
          </div>

          {/* With us — filled ticks + ordered signal */}
          <div className="leverage-lane leverage-lane-signal">
            <div className="leverage-signal-field" aria-hidden>
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
            <p className="leverage-lane-label leverage-lane-label-on">{rightLabel}</p>
            <p className="leverage-lane-text">{rightText}</p>
          </div>
        </div>

        {/* Vibe rescue — empty tick → filled */}
        <div className={`leverage-vibe ${phase >= 3 ? 'is-rescued' : ''}`}>
          <div className="leverage-vibe-visual" aria-hidden>
            <div className="leverage-vibe-stall">
              <span className="leverage-vibe-tick leverage-vibe-tick-empty" />
              <span className="leverage-vibe-frag">broken</span>
              <span className="leverage-vibe-frag leverage-vibe-frag-2">stuck</span>
              <span className="leverage-vibe-crack" />
            </div>
            <div className="leverage-vibe-flow">
              <span className="leverage-vibe-dot" />
              <span className="leverage-vibe-dot" />
              <span className="leverage-vibe-dot" />
            </div>
            <div className="leverage-vibe-fix">
              <span className="leverage-vibe-tick leverage-vibe-tick-full" />
              <span className="leverage-vibe-ok">ship</span>
            </div>
          </div>
          <div className="leverage-vibe-copy">
            <p className="leverage-vibe-label">{vibeLabel}</p>
            <p className="leverage-vibe-text">{vibeText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

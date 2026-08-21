'use client'

import { SectionHeader } from '@/components/SectionHeader'

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

/** Open dual-field — no nested glass window; composition lives in the section */
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
  return (
    <section id="leverage" className="scroll-mt-24">
      <SectionHeader index="03" kicker={subtitle} title={title} lead={lead} />

      <div className="leverage-field">
        <div className="leverage-wash" aria-hidden />
        <div className="leverage-wash leverage-wash-b" aria-hidden />

        <div className="leverage-split">
          <div className="leverage-lane leverage-lane-noise">
            <div className="leverage-noise-field" aria-hidden>
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className={`leverage-token leverage-token-${i % 6}`}>
                  {['gen', '??', 'tmp', 'vibe', '…', 'ok?'][i % 6]}
                </span>
              ))}
            </div>
            <p className="leverage-lane-label">{leftLabel}</p>
            <p className="leverage-lane-text">{leftText}</p>
          </div>

          <div className="leverage-hinge" aria-hidden>
            <span className="leverage-hinge-line" />
            <span className="leverage-hinge-bead" />
          </div>

          <div className="leverage-lane leverage-lane-signal">
            <div className="leverage-signal-field" aria-hidden>
              <span className="leverage-signal-spine" />
              <span className="leverage-signal-pulse" />
              <span className="leverage-signal-pulse leverage-signal-pulse-delay" />
            </div>
            <p className="leverage-lane-label leverage-lane-label-on">{rightLabel}</p>
            <p className="leverage-lane-text">{rightText}</p>
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

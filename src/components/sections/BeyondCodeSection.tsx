'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'

interface Stage {
  label: string
  text: string
  highlight?: string
}

interface BeyondCodeSectionProps {
  title?: string
  subtitle?: string
  lead?: string
  stages?: Stage[]
}

const CYCLE_MS = 7500

const defaultStages: Stage[] = [
  {
    label: 'Idea',
    text: 'Bring the unfinished thought. We pressure-test it and turn fog into something buildable.',
    highlight: 'fog into something buildable',
  },
  {
    label: 'System',
    text: 'Abstract thinking becomes working architecture — clean enough to own, sharp enough to scale.',
    highlight: 'working architecture',
  },
  {
    label: 'Clarity',
    text: 'The chaos settles. A lit path, a system you can run, and a product that finally earns its keep.',
    highlight: 'finally earns its keep',
  },
]

const CHAOS_BITS = [
  { t: '{', x: 12, y: 22, r: -22, c: '#ff8b6a', d: 0 },
  { t: '}', x: 78, y: 18, r: 18, c: '#7dd3fc', d: 0.1 },
  { t: '</>', x: 40, y: 36, r: 10, c: '#fbbf24', d: 0.2 },
  { t: 'err', x: 68, y: 44, r: -14, c: '#fb7185', d: 0.15 },
  { t: '=>', x: 18, y: 56, r: 16, c: '#67e8f9', d: 0.25 },
  { t: '??', x: 52, y: 60, r: -8, c: '#c4b5fd', d: 0.3 },
  { t: 'fn', x: 82, y: 64, r: 12, c: '#86efac', d: 0.18 },
  { t: '[]', x: 28, y: 74, r: -20, c: '#fda4af', d: 0.35 },
  { t: '::', x: 58, y: 80, r: 8, c: '#93c5fd', d: 0.22 },
  { t: 'NaN', x: 44, y: 20, r: -6, c: '#fcd34d', d: 0.4 },
  { t: '0x', x: 8, y: 42, r: 24, c: '#5eead4', d: 0.12 },
  { t: '//', x: 88, y: 36, r: -16, c: '#a5b4fc', d: 0.28 },
]

const DEBRIS = Array.from({ length: 16 }, (_, i) => ({
  x: 10 + ((i * 17) % 80),
  y: 14 + ((i * 23) % 72),
  s: 2 + (i % 4),
  c: ['#ff8b6a', '#7dd3fc', '#fbbf24', '#c4b5fd', '#5eead4'][i % 5],
  d: (i % 8) * 0.12,
}))

/** System — same code energy as Idea, but snapped into order */
const SYS_STACK = [
  { t: '{', x: 52, y: 24, c: '#67e8f9', d: 0 },
  { t: 'domain', x: 64, y: 24, c: '#22d3ee', d: 0.06 },
  { t: 'bound', x: 80, y: 24, c: '#a5b4fc', d: 0.12 },
  { t: 'api', x: 54, y: 42, c: '#38bdf8', d: 0.18 },
  { t: 'auth', x: 68, y: 42, c: '#818cf8', d: 0.24 },
  { t: 'queue', x: 84, y: 42, c: '#5eead4', d: 0.3 },
  { t: 'data', x: 56, y: 60, c: '#2dd4bf', d: 0.36 },
  { t: 'sync', x: 70, y: 60, c: '#7dd3fc', d: 0.42 },
  { t: '}', x: 84, y: 60, c: '#93c5fd', d: 0.48 },
  { t: '::', x: 62, y: 76, c: '#67e8f9', d: 0.54 },
  { t: 'ready', x: 76, y: 76, c: '#a5f3fc', d: 0.6 },
]

const SYS_RAILS = [24, 42, 60, 76]

/** Clarity — signal reaches value */
const FLOW_DOTS = Array.from({ length: 12 }, (_, i) => ({
  d: i * 0.22,
  c: i > 8 ? '#f5b342' : i > 4 ? '#e0f2fe' : '#38bdf8',
}))

const STARS = Array.from({ length: 22 }, (_, i) => [
  6 + ((i * 13) % 88),
  8 + ((i * 19) % 84),
  i % 4 === 0 ? 3 : 2,
])

function highlightPhrase(text: string, phrase?: string) {
  if (!phrase) return text
  const i = text.toLowerCase().indexOf(phrase.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <em className="beyond-mark">{text.slice(i, i + phrase.length)}</em>
      {text.slice(i + phrase.length)}
    </>
  )
}

function HighlightedLead({ text }: { text: string }) {
  const parts = text.split(/(idea|system|clarity)/gi)
  return (
    <>
      {parts.map((part, i) =>
        /^(idea|system|clarity)$/i.test(part) ? (
          <em key={`${part}-${i}`} className="beyond-mark">
            {part}
          </em>
        ) : (
          <span key={`${part}-${i}`}>{part}</span>
        )
      )}
    </>
  )
}

/** Atmosphere stays inside the glass stage — behind the copy */
function StageVisual({ phase }: { phase: number }) {
  return (
    <div className="beyond-visual" data-phase={phase} aria-hidden>
      <div className="bv-cosmos">
        <div className="bv-nebula bv-nebula-a" />
        <div className="bv-nebula bv-nebula-b" />
        <div className="bv-nebula bv-nebula-c" />
        {STARS.map(([x, y, s], i) => (
          <span
            key={`st-${i}`}
            className="bv-star"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: s,
              height: s,
              animationDelay: `${(i % 9) * 0.28}s`,
            }}
          />
        ))}
      </div>

      {/* IDEA */}
      <div className={`bv-act bv-act-chaos ${phase === 0 ? 'is-on' : ''}`}>
        <div className="bv-glitch bv-glitch-1" />
        <div className="bv-glitch bv-glitch-2" />
        {DEBRIS.map((p, i) => (
          <span
            key={`db-${i}`}
            className="bv-debris"
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.s,
                height: p.s,
                background: p.c,
                animationDelay: `${p.d}s`,
              } as CSSProperties
            }
          />
        ))}
        {CHAOS_BITS.map((bit, i) => (
          <span
            key={`${bit.t}-${i}`}
            className="bv-glyph"
            style={
              {
                left: `${bit.x}%`,
                top: `${bit.y}%`,
                color: bit.c,
                '--rot': `${bit.r}deg`,
                animationDelay: `${bit.d}s`,
              } as CSSProperties
            }
          >
            {bit.t}
          </span>
        ))}
        <div className="bv-chaos-core" />
      </div>

      {/* SYSTEM — glyphs lock into ordered stack */}
      <div className={`bv-act bv-act-system ${phase === 1 ? 'is-on' : ''}`}>
        <div className="bv-sys-halo" />
        <span className="bv-sys-spine" />
        {SYS_RAILS.map((y, i) => (
          <span
            key={`rail-${y}`}
            className="bv-sys-rail"
            style={{ top: `${y}%`, animationDelay: `${0.08 + i * 0.1}s` }}
          />
        ))}
        {SYS_STACK.map((bit, i) => (
          <span
            key={`sys-${bit.t}-${i}`}
            className="bv-sys-glyph"
            style={
              {
                left: `${bit.x}%`,
                top: `${bit.y}%`,
                color: bit.c,
                animationDelay: `${0.15 + bit.d}s`,
              } as CSSProperties
            }
          >
            {bit.t}
          </span>
        ))}
        <span className="bv-sys-scan" />
      </div>

      {/* CLARITY — path reaches value */}
      <div className={`bv-act bv-act-clarity ${phase === 2 ? 'is-on' : ''}`}>
        <div className="bv-clarity-track">
          <span className="bv-clarity-rail" />
          <span className="bv-clarity-rail bv-clarity-rail-soft" />
          {FLOW_DOTS.map((dot, i) => (
            <span
              key={`fl-${i}`}
              className="bv-clarity-bead"
              style={
                {
                  background: dot.c,
                  animationDelay: `${dot.d}s`,
                  boxShadow: `0 0 10px ${dot.c}`,
                } as CSSProperties
              }
            />
          ))}
          <span className="bv-clarity-origin" />
          <span className="bv-clarity-goal" />
        </div>
        <div className="bv-clarity-rings">
          <span />
          <span />
        </div>
        <span className="bv-clarity-mark">value</span>
      </div>
    </div>
  )
}

export function BeyondCodeSection({
  title = 'More than code',
  subtitle = 'Idea · System · Clarity',
  lead,
  stages = defaultStages,
}: BeyondCodeSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.18 })
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const activeRef = useRef(0)
  const resumeTimer = useRef<number | null>(null)

  const enriched = stages.map((stage, i) => ({
    ...stage,
    highlight: stage.highlight ?? defaultStages[i]?.highlight,
  }))

  const current = enriched[active] ?? enriched[0]
  activeRef.current = active

  const goTo = (index: number, manual = false) => {
    const len = enriched.length
    const next = ((index % len) + len) % len
    if (next === activeRef.current) return
    setActive(next)
    setProgress(0)
    if (manual) {
      setPaused(true)
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
      resumeTimer.current = window.setTimeout(() => setPaused(false), 8500)
    }
  }

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!visible || paused) {
      setProgress(0)
      return
    }
    const started = performance.now()
    let raf = 0
    const loop = (now: number) => {
      const t = Math.min(1, (now - started) / CYCLE_MS)
      setProgress(t)
      if (t >= 1) {
        goTo(activeRef.current + 1)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, paused, active, enriched.length])

  return (
    <section
      id="beyond"
      ref={ref}
      className={`beyond-soft scroll-mt-24 ${visible ? 'is-on' : ''}`}
      aria-label={title}
    >
      <header className="beyond-head mb-8 sm:mb-10">
        <p className="beyond-eyebrow mb-3 font-inter text-[11px] font-medium uppercase tracking-[0.18em] text-[#8fa3c7]">
          01 — {subtitle.replace(/·/g, ' / ')}
        </p>
        <h2 className="beyond-title font-display text-[clamp(1.9rem,4.2vw,2.85rem)] font-bold uppercase leading-[1.05] tracking-[0.08em] text-white">
          {title}
        </h2>
        {lead ? (
          <p className="beyond-lead mt-5 max-w-[36rem] font-inter text-[1rem] font-light leading-[1.85] tracking-[0.01em] text-[#b8c2d4]">
            <HighlightedLead text={lead} />
          </p>
        ) : null}
      </header>

      <div className="beyond-tabs mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Stages">
        {enriched.map((stage, i) => {
          const on = i === active
          return (
            <button
              key={stage.label}
              type="button"
              role="tab"
              aria-selected={on}
              className={`beyond-tab beyond-tab-${i} ${on ? 'is-on' : ''}`}
              onClick={() => goTo(i, true)}
            >
              <span className="beyond-tab-label">{stage.label}</span>
              {on ? (
                <span
                  className="beyond-tab-fill"
                  style={{ transform: `scaleX(${paused ? 0 : progress})` }}
                  aria-hidden
                />
              ) : null}
            </button>
          )
        })}
      </div>

      <div
        className="beyond-panel"
        data-phase={active}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="beyond-blob beyond-blob-a" aria-hidden />
        <div className="beyond-blob beyond-blob-b" aria-hidden />

        {/* Animation lives inside the stage — not a separate column */}
        <StageVisual phase={active} />

        <div className="beyond-panel-inner">
          <div key={current.label} className="beyond-copy-swap">
            <p className={`beyond-stage-word beyond-word-${active} font-display font-bold uppercase tracking-[0.06em]`}>
              {current.label}
            </p>
            <p className="beyond-stage-copy mt-4 max-w-md font-inter text-[0.95rem] font-light leading-[1.9] text-[#c2cad8]">
              {highlightPhrase(current.text, current.highlight)}
            </p>
          </div>
          <div className="beyond-dots">
            {enriched.map((stage, i) => (
              <button
                key={stage.label}
                type="button"
                className={`beyond-dot beyond-dot-${i} ${i === active ? 'is-on' : ''}`}
                onClick={() => goTo(i, true)}
                aria-label={stage.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

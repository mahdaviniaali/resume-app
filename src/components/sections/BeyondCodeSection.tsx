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
    text: 'Every build starts as two questions at once: what should exist, and who will care. We hold both — product spark and market itch — before craft freezes the wrong answer.',
    highlight: 'who will care',
  },
  {
    label: 'Craft',
    text: 'Then engineering and UI/UX move as one craft. Systems that hold, interfaces that guide — power under the hood, clarity on the surface.',
    highlight: 'move as one craft',
  },
  {
    label: 'Reach',
    text: 'Marketing only works when the product can carry it. We braid shippable craft with a clear story — so attention lands on something real.',
    highlight: 'something real',
  },
]

/** Idea — code chaos + product/market concepts mixed */
const CHAOS_BITS: { t: string; x: number; y: number; r: number; c: string; d: number; kind: 'code' | 'idea' }[] = [
  { t: '{', x: 12, y: 22, r: -22, c: '#ff8b6a', d: 0, kind: 'code' },
  { t: 'why?', x: 72, y: 16, r: -8, c: '#fdba74', d: 0.08, kind: 'idea' },
  { t: '</>', x: 40, y: 36, r: 10, c: '#fbbf24', d: 0.2, kind: 'code' },
  { t: 'user', x: 86, y: 30, r: 6, c: '#f9a8d4', d: 0.12, kind: 'idea' },
  { t: '=>', x: 18, y: 56, r: 16, c: '#67e8f9', d: 0.25, kind: 'code' },
  { t: 'offer', x: 58, y: 48, r: -6, c: '#fda4af', d: 0.18, kind: 'idea' },
  { t: 'fn', x: 82, y: 64, r: 12, c: '#86efac', d: 0.28, kind: 'code' },
  { t: '??', x: 32, y: 68, r: -10, c: '#c4b5fd', d: 0.32, kind: 'code' },
  { t: 'market', x: 68, y: 76, r: 4, c: '#fde68a', d: 0.22, kind: 'idea' },
  { t: 'NaN', x: 44, y: 20, r: -6, c: '#fcd34d', d: 0.4, kind: 'code' },
  { t: '0x', x: 8, y: 42, r: 24, c: '#5eead4', d: 0.12, kind: 'code' },
  { t: 'spark', x: 52, y: 58, r: -12, c: '#fb923c', d: 0.35, kind: 'idea' },
]

const DEBRIS = Array.from({ length: 16 }, (_, i) => ({
  x: 10 + ((i * 17) % 80),
  y: 14 + ((i * 23) % 72),
  s: 2 + (i % 4),
  c: ['#ff8b6a', '#7dd3fc', '#fbbf24', '#c4b5fd', '#5eead4'][i % 5],
  d: (i % 8) * 0.12,
}))

/** Craft — eng + ux streams collide across the whole field and sync as one */
const CRAFT_ENG = [
  { t: 'systems', x: 36, y: 58, r: -8, d: 0.05 },
  { t: 'hold', x: 52, y: 72, r: 6, d: 0.14 },
  { t: '{api}', x: 70, y: 64, r: -4, d: 0.22 },
  { t: 'data', x: 44, y: 84, r: 10, d: 0.18 },
  { t: 'sync', x: 78, y: 80, r: -12, d: 0.28 },
  { t: 'power', x: 88, y: 56, r: 4, d: 0.34 },
  { t: '::', x: 60, y: 48, r: 0, d: 0.1 },
]

const CRAFT_UX = [
  { t: 'interfaces', x: 42, y: 16, r: 6, d: 0.08 },
  { t: 'guide', x: 62, y: 24, r: -8, d: 0.16 },
  { t: 'clarity', x: 80, y: 14, r: 4, d: 0.24 },
  { t: 'flow', x: 50, y: 34, r: -6, d: 0.2 },
  { t: 'path', x: 74, y: 36, r: 8, d: 0.3 },
  { t: 'surface', x: 88, y: 28, r: -4, d: 0.12 },
]

const CRAFT_PANELS = [
  { x: 48, y: 20, w: 18, h: 10, d: 0.15 },
  { x: 70, y: 22, w: 14, h: 8, d: 0.25 },
  { x: 58, y: 32, w: 22, h: 7, d: 0.35 },
]

const CRAFT_DUST = Array.from({ length: 18 }, (_, i) => ({
  x: 28 + ((i * 17) % 68),
  y: 12 + ((i * 23) % 76),
  s: 2 + (i % 3),
  kind: (i % 2 === 0 ? 'eng' : 'ux') as 'eng' | 'ux',
  d: (i % 9) * 0.08,
}))

/** Reach — craft + marketing on the lit path */
const FLOW_DOTS = Array.from({ length: 12 }, (_, i) => ({
  d: i * 0.22,
  c: i > 8 ? '#f5b342' : i > 4 ? '#e0f2fe' : '#38bdf8',
}))

const REACH_TAGS = [
  { t: 'product', x: 42, y: 38, c: '#7dd3fc', d: 0.1, kind: 'craft' as const },
  { t: 'ux', x: 50, y: 68, c: '#67e8f9', d: 0.2, kind: 'craft' as const },
  { t: 'story', x: 78, y: 36, c: '#fde68a', d: 0.15, kind: 'mkt' as const },
  { t: 'signal', x: 86, y: 66, c: '#fbbf24', d: 0.25, kind: 'mkt' as const },
]

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
  const parts = text.split(/(idea|craft|reach|engineering|ui\/ux|marketing)/gi)
  return (
    <>
      {parts.map((part, i) =>
        /^(idea|craft|reach|engineering|ui\/ux|marketing)$/i.test(part) ? (
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

      {/* IDEA — code + concept chaos */}
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
            className={`bv-glyph bv-glyph-${bit.kind}`}
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

      {/* CRAFT — two languages flood the field, collide, sync as one */}
      <div className={`bv-act bv-act-craft ${phase === 1 ? 'is-on' : ''}`}>
        {phase === 1 ? (
          <>
            <div className="bv-craft-field bv-craft-field-eng" />
            <div className="bv-craft-field bv-craft-field-ux" />
            <div className="bv-craft-wave" />
            <div className="bv-craft-wave bv-craft-wave-delayed" />

            {CRAFT_PANELS.map((p, i) => (
              <span
                key={`cp-${i}`}
                className="bv-craft-panel"
                style={
                  {
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.w}%`,
                    height: `${p.h}%`,
                    animationDelay: `${0.2 + p.d}s`,
                  } as CSSProperties
                }
              />
            ))}

            {CRAFT_DUST.map((p, i) => (
              <span
                key={`cd-${i}`}
                className={`bv-craft-dust bv-craft-dust-${p.kind}`}
                style={
                  {
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.s,
                    height: p.s,
                    animationDelay: `${0.1 + p.d}s`,
                  } as CSSProperties
                }
              />
            ))}

            {CRAFT_ENG.map((bit) => (
              <span
                key={`ce-${bit.t}`}
                className="bv-craft-eng"
                style={
                  {
                    left: `${bit.x}%`,
                    top: `${bit.y}%`,
                    '--rot': `${bit.r}deg`,
                    animationDelay: `${0.15 + bit.d}s`,
                  } as CSSProperties
                }
              >
                {bit.t}
              </span>
            ))}

            {CRAFT_UX.map((bit) => (
              <span
                key={`cu-${bit.t}`}
                className="bv-craft-ux"
                style={
                  {
                    left: `${bit.x}%`,
                    top: `${bit.y}%`,
                    '--rot': `${bit.r}deg`,
                    animationDelay: `${0.2 + bit.d}s`,
                  } as CSSProperties
                }
              >
                {bit.t}
              </span>
            ))}

            <span className="bv-craft-phrase bv-craft-phrase-hood">power under the hood</span>
            <span className="bv-craft-phrase bv-craft-phrase-surface">clarity on the surface</span>
            <span className="bv-craft-title">one craft</span>
          </>
        ) : null}
      </div>

      {/* REACH — craft + marketing on the lit path */}
      <div className={`bv-act bv-act-clarity ${phase === 2 ? 'is-on' : ''}`}>
        {REACH_TAGS.map((tag) => (
          <span
            key={tag.t}
            className={`bv-reach-tag bv-reach-tag-${tag.kind}`}
            style={
              {
                left: `${tag.x}%`,
                top: `${tag.y}%`,
                color: tag.c,
                animationDelay: `${tag.d}s`,
              } as CSSProperties
            }
          >
            {tag.t}
          </span>
        ))}
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
        <span className="bv-clarity-mark">result</span>
      </div>
    </div>
  )
}

export function BeyondCodeSection({
  title = 'More than code',
  subtitle = 'Idea · Craft · Reach',
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
          <p className="beyond-lead mt-5 max-w-[38rem] font-inter text-[1rem] font-light leading-[1.85] tracking-[0.01em] text-[#b8c2d4]">
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

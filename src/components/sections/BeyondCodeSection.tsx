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
    label: 'Experience',
    text: 'We obsess over the path. Users decide fast — and never disappear into the UI.',
    highlight: 'never disappear',
  },
]

const CHAOS_BITS = [
  { t: '{', x: 12, y: 20, r: -22, c: '#ff8b6a', d: 0 },
  { t: '}', x: 78, y: 16, r: 18, c: '#7dd3fc', d: 0.1 },
  { t: '</>', x: 40, y: 34, r: 10, c: '#fbbf24', d: 0.2 },
  { t: 'err', x: 68, y: 42, r: -14, c: '#fb7185', d: 0.15 },
  { t: '=>', x: 18, y: 55, r: 16, c: '#67e8f9', d: 0.25 },
  { t: '??', x: 52, y: 58, r: -8, c: '#c4b5fd', d: 0.3 },
  { t: 'fn', x: 82, y: 62, r: 12, c: '#86efac', d: 0.18 },
  { t: '[]', x: 28, y: 72, r: -20, c: '#fda4af', d: 0.35 },
  { t: '::', x: 58, y: 78, r: 8, c: '#93c5fd', d: 0.22 },
  { t: 'NaN', x: 44, y: 18, r: -6, c: '#fcd34d', d: 0.4 },
  { t: '0x', x: 8, y: 40, r: 24, c: '#5eead4', d: 0.12 },
  { t: '//', x: 88, y: 34, r: -16, c: '#a5b4fc', d: 0.28 },
]

const DEBRIS = Array.from({ length: 18 }, (_, i) => ({
  x: 8 + ((i * 17) % 84),
  y: 10 + ((i * 23) % 78),
  s: 2 + (i % 4),
  c: ['#ff8b6a', '#7dd3fc', '#fbbf24', '#c4b5fd', '#5eead4'][i % 5],
  d: (i % 8) * 0.12,
}))

const STARS = Array.from({ length: 28 }, (_, i) => [
  4 + ((i * 13) % 92),
  5 + ((i * 19) % 90),
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
  const parts = text.split(/(idea|system|experience)/gi)
  return (
    <>
      {parts.map((part, i) =>
        /^(idea|system|experience)$/i.test(part) ? (
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

/** Full visual story: colorful chaos → cyan architecture → luminous path */
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

      {/* IDEA — colorful chaos */}
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
        <p className="bv-caption bv-caption-chaos">raw signal · unfinished thought</p>
      </div>

      {/* SYSTEM — architecture */}
      <div className={`bv-act bv-act-system ${phase === 1 ? 'is-on' : ''}`}>
        <svg className="bv-svg" viewBox="0 0 200 160" fill="none">
          <defs>
            <linearGradient id="sys-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#67e8f9" stopOpacity="1" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.35" />
            </linearGradient>
            <radialGradient id="sys-node" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ecfeff" />
              <stop offset="100%" stopColor="#22d3ee" />
            </radialGradient>
          </defs>

          <g className="bv-grid-fade" opacity="0.2">
            {[40, 80, 120].map((y) => (
              <line key={`h-${y}`} x1="20" y1={y} x2="180" y2={y} stroke="#67e8f9" strokeWidth="0.4" />
            ))}
            {[50, 100, 150].map((x) => (
              <line key={`v-${x}`} x1={x} y1="20" x2={x} y2="140" stroke="#67e8f9" strokeWidth="0.4" />
            ))}
          </g>

          <path className="bv-sys-path" d="M100 28 L52 70 L100 112 L148 70 Z" stroke="url(#sys-line)" strokeWidth="2" />
          <path className="bv-sys-path" d="M100 28 L148 70 L176 48" stroke="url(#sys-line)" strokeWidth="1.6" style={{ animationDelay: '0.12s' }} />
          <path className="bv-sys-path" d="M100 28 L52 70 L28 46" stroke="url(#sys-line)" strokeWidth="1.6" style={{ animationDelay: '0.2s' }} />
          <path className="bv-sys-path" d="M52 70 L40 118" stroke="url(#sys-line)" strokeWidth="1.4" style={{ animationDelay: '0.28s' }} />
          <path className="bv-sys-path" d="M148 70 L164 118" stroke="url(#sys-line)" strokeWidth="1.4" style={{ animationDelay: '0.34s' }} />
          <path className="bv-sys-path" d="M100 112 L100 138" stroke="url(#sys-line)" strokeWidth="1.4" style={{ animationDelay: '0.4s' }} />

          {[
            [100, 28],
            [52, 70],
            [148, 70],
            [100, 112],
            [176, 48],
            [28, 46],
            [40, 118],
            [164, 118],
            [100, 138],
          ].map(([x, y], i) => (
            <g key={`${x}-${y}`}>
              <circle className="bv-sys-glow" cx={x} cy={y} r="8" fill="#22d3ee" style={{ animationDelay: `${0.2 + i * 0.06}s` }} />
              <circle className="bv-sys-node" cx={x} cy={y} r="3.5" fill="url(#sys-node)" style={{ animationDelay: `${0.25 + i * 0.06}s` }} />
            </g>
          ))}

          <text className="bv-sys-label" x="100" y="88" textAnchor="middle">
            ARCH
          </text>
        </svg>
        <p className="bv-caption bv-caption-system">domain · services · structure</p>
      </div>

      {/* EXPERIENCE — luminous path */}
      <div className={`bv-act bv-act-exp ${phase === 2 ? 'is-on' : ''}`}>
        <svg className="bv-svg" viewBox="0 0 200 160" fill="none">
          <defs>
            <linearGradient id="exp-path" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="45%" stopColor="#e0f2fe" stopOpacity="1" />
              <stop offset="100%" stopColor="#f5b342" stopOpacity="0.95" />
            </linearGradient>
            <radialGradient id="exp-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="45%" stopColor="#f5b342" />
              <stop offset="100%" stopColor="#f5b342" stopOpacity="0" />
            </radialGradient>
            <filter id="exp-glow">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse className="bv-aurora" cx="100" cy="78" rx="70" ry="36" fill="#38bdf8" />
          <path
            className="bv-exp-wake"
            d="M24 118 C 60 118, 70 42, 104 42 S 148 118, 180 64"
            stroke="#38bdf8"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            className="bv-exp-path"
            d="M24 118 C 60 118, 70 42, 104 42 S 148 118, 180 64"
            stroke="url(#exp-path)"
            strokeWidth="2.8"
            strokeLinecap="round"
            filter="url(#exp-glow)"
          />
          <circle className="bv-exp-start" cx="24" cy="118" r="5" fill="#7dd3fc" />
          <circle className="bv-exp-end-glow" cx="180" cy="64" r="18" fill="url(#exp-sun)" />
          <circle className="bv-exp-end" cx="180" cy="64" r="6" fill="#fff7ed" filter="url(#exp-glow)" />
          <circle className="bv-exp-comet" r="3" fill="#fff" filter="url(#exp-glow)">
            <animateMotion
              dur="2.6s"
              repeatCount="indefinite"
              path="M24 118 C 60 118, 70 42, 104 42 S 148 118, 180 64"
            />
          </circle>
        </svg>
        <p className="bv-caption bv-caption-exp">flow lit · user finds the way</p>
      </div>
    </div>
  )
}

export function BeyondCodeSection({
  title = 'More than code',
  subtitle = 'Idea · System · Experience',
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

        <div className="beyond-panel-grid">
          <div className="beyond-panel-inner">
            <div key={current.label} className="beyond-copy-swap">
              <p className={`beyond-stage-word beyond-word-${active} font-display font-bold uppercase tracking-[0.06em]`}>
                {current.label}
              </p>
              <p className="beyond-stage-copy mt-4 max-w-lg font-inter text-[0.95rem] font-light leading-[1.9] text-[#c2cad8]">
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

          <StageVisual phase={active} />
        </div>
      </div>
    </section>
  )
}

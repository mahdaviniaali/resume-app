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

const CYCLE_MS = 4500

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

function LeadWords({ text }: { text: string }) {
  const tokens = text.split(/(\s+)/)
  let wordIndex = 0
  return (
    <>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={`sp-${i}`}>{token}</span>
        const isKey = /^(idea|system|experience)([.,;:!?]*)?$/i.test(token)
        const delay = wordIndex * 32
        wordIndex += 1
        return (
          <span
            key={`w-${i}`}
            className="beyond-lead-word"
            style={{ transitionDelay: `${100 + delay}ms` }}
          >
            {isKey ? <em className="beyond-mark">{token}</em> : token}
          </span>
        )
      })}
    </>
  )
}

/** Modern minimal — soft navy, yellow text marks, lively motion */
export function BeyondCodeSection({
  title = 'More than code',
  subtitle = 'Idea · System · Experience',
  lead,
  stages = defaultStages,
}: BeyondCodeSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.2 })
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [tick, setTick] = useState(0)
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
    setTick((t) => t + 1)
    setProgress(0)

    if (manual) {
      setPaused(true)
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
      resumeTimer.current = window.setTimeout(() => setPaused(false), 5000)
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
      <header className="beyond-head mb-9 sm:mb-11">
        <p className="beyond-eyebrow mb-3 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#8fa3c7]">
          01 — {subtitle.replace(/·/g, ' / ')}
        </p>

        <h2 className="beyond-title font-display text-[clamp(1.9rem,4.2vw,2.85rem)] font-bold uppercase leading-[1.05] tracking-[0.08em] text-white">
          <span className="beyond-title-line">{title}</span>
        </h2>

        {lead ? (
          <p className="beyond-lead mt-5 max-w-[36rem] font-inter text-[1rem] font-light leading-[1.85] tracking-[0.01em] text-[#b8c2d4]">
            <LeadWords text={lead} />
          </p>
        ) : null}
      </header>

      {/* Soft pill tabs */}
      <div className="beyond-tabs mb-7 flex flex-wrap gap-2" role="tablist" aria-label="Stages">
        {enriched.map((stage, i) => {
          const on = i === active
          return (
            <button
              key={stage.label}
              type="button"
              role="tab"
              aria-selected={on}
              className={`beyond-tab ${on ? 'is-on' : ''}`}
              onClick={() => goTo(i, true)}
              style={{ '--i': i } as CSSProperties}
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

      {/* Soft stage panel */}
      <div
        className="beyond-panel"
        data-phase={active}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="beyond-blob beyond-blob-a" aria-hidden />
        <div className="beyond-blob beyond-blob-b" aria-hidden />

        <div key={tick} className="beyond-panel-inner">
          <p className="beyond-stage-word font-display font-bold uppercase tracking-[0.06em] text-white">
            {current.label}
          </p>

          <p className="beyond-stage-copy mt-4 max-w-lg font-inter text-[0.95rem] font-light leading-[1.9] text-[#c2cad8]">
            {highlightPhrase(current.text, current.highlight)}
          </p>
        </div>

        <div className="beyond-dots" aria-hidden>
          {enriched.map((stage, i) => (
            <button
              key={stage.label}
              type="button"
              className={`beyond-dot ${i === active ? 'is-on' : ''}`}
              onClick={() => goTo(i, true)}
              aria-label={stage.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { workFocus, workHome } from '@/data/workContent'

const CYCLE_MS = 6200

const TABS = [
  { id: 'agents', short: 'Agents', mark: 'real workflows' },
  { id: 'b2b', short: 'B2B', mark: 'staged ops' },
  { id: 'saas', short: 'SaaS', mark: 'past the demo' },
  { id: 'systems', short: 'Cores', mark: 'speed and load' },
] as const

function highlightPhrase(text: string, phrase?: string) {
  if (!phrase) return text
  const i = text.toLowerCase().indexOf(phrase.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <em className="work-mark">{text.slice(i, i + phrase.length)}</em>
      {text.slice(i + phrase.length)}
    </>
  )
}

function WorkVisual({ phase }: { phase: number }) {
  return (
    <div className="work-visual" data-phase={phase} aria-hidden>
      <div className="wv-nebula wv-nebula-a" />
      <div className="wv-nebula wv-nebula-b" />

      {/* Agents — constellation of nodes talking */}
      <div className={`wv-act ${phase === 0 ? 'is-on' : ''}`}>
        <span className="wv-orbit" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={`ag-${i}`}
            className="wv-node"
            style={
              {
                left: `${18 + (i % 3) * 28}%`,
                top: `${26 + Math.floor(i / 3) * 34}%`,
                animationDelay: `${0.1 + i * 0.1}s`,
              } as CSSProperties
            }
          />
        ))}
        <span className="wv-whisper" style={{ left: '58%', top: '48%' }}>
          agent
        </span>
        <span className="wv-whisper" style={{ left: '28%', top: '62%' }}>
          chat
        </span>
      </div>

      {/* B2B — staged path */}
      <div className={`wv-act ${phase === 1 ? 'is-on' : ''}`}>
        <span className="wv-flow" />
        {['rfq', 'bid', 'ok'].map((t, i) => (
          <span
            key={t}
            className="wv-stage-bit"
            style={
              {
                left: `${22 + i * 26}%`,
                top: `${42 + (i % 2) * 8}%`,
                animationDelay: `${0.15 + i * 0.14}s`,
              } as CSSProperties
            }
          >
            {t}
          </span>
        ))}
        <span className="wv-bead" style={{ animationDelay: '0.4s' }} />
        <span className="wv-bead wv-bead-b" style={{ animationDelay: '1.2s' }} />
      </div>

      {/* SaaS — nested tenants */}
      <div className={`wv-act ${phase === 2 ? 'is-on' : ''}`}>
        <span className="wv-ring wv-ring-a" />
        <span className="wv-ring wv-ring-b" />
        <span className="wv-ring wv-ring-c" />
        <span className="wv-whisper" style={{ left: '46%', top: '46%' }}>
          tenant
        </span>
      </div>

      {/* Cores — speed pulse */}
      <div className={`wv-act ${phase === 3 ? 'is-on' : ''}`}>
        <span className="wv-spine" />
        <span className="wv-pulse" />
        <span className="wv-pulse wv-pulse-b" />
        <span className="wv-whisper" style={{ left: '62%', top: '34%' }}>
          rust
        </span>
        <span className="wv-whisper" style={{ left: '70%', top: '58%' }}>
          async
        </span>
      </div>
    </div>
  )
}

/** One glass stage — pick a focus lane (Beyond language, not a grid) */
export function SelectedWorkSection() {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.18 })
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const activeRef = useRef(0)
  const resumeTimer = useRef<number | null>(null)

  const lanes = workFocus.map((item, i) => ({
    ...item,
    short: TABS[i]?.short ?? item.label,
    mark: TABS[i]?.mark,
  }))

  const current = lanes[active] ?? lanes[0]
  activeRef.current = active

  const goTo = (index: number, manual = false) => {
    const len = lanes.length
    if (!len) return
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
    if (!visible || paused || lanes.length === 0) {
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
  }, [visible, paused, active, lanes.length])

  return (
    <section
      id="work"
      ref={ref}
      className={`work-soft scroll-mt-24 ${visible ? 'is-on' : ''}`}
      aria-label={workHome.title}
    >
      <SectionHeader
        index="03"
        kicker={workHome.subtitle}
        title={workHome.title}
        lead={workHome.lead}
        leadHighlight="hold past the demo"
      />

      <div className="work-tabs" role="tablist" aria-label="Focus lanes">
        {lanes.map((lane, i) => {
          const on = i === active
          return (
            <button
              key={lane.id}
              type="button"
              role="tab"
              aria-selected={on}
              className={`work-tab work-tab-${i} ${on ? 'is-on' : ''}`}
              onClick={() => goTo(i, true)}
            >
              <span className="work-tab-label">{lane.short}</span>
              {on ? (
                <span
                  className="work-tab-fill"
                  style={{ transform: `scaleX(${paused ? 0 : progress})` }}
                  aria-hidden
                />
              ) : null}
            </button>
          )
        })}
      </div>

      <div
        className="work-panel"
        data-phase={active}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="work-blob work-blob-a" aria-hidden />
        <div className="work-blob work-blob-b" aria-hidden />

        <WorkVisual phase={active} />

        <div className="work-panel-inner">
          <div key={current.id} className="work-copy-swap">
            <p className="work-stage-idx">{String(active + 1).padStart(2, '0')}</p>
            <p className="work-stage-key">{current.label}</p>
            <p className="work-stage-text">
              {highlightPhrase(current.blurb, current.mark)}
            </p>
          </div>

          <Link href="/work" className="work-more">
            Full case list →
          </Link>
        </div>
      </div>
    </section>
  )
}

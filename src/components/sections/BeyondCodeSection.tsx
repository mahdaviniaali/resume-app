'use client'

import { useEffect, useState, type CSSProperties } from 'react'
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

function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function LeadWords({ text }: { text: string }) {
  const tokens = text.split(/(\s+)/)
  let wordIndex = 0
  return (
    <>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={`sp-${i}`}>{token}</span>
        const isKey = /^(idea|system|experience)([.,;:!?]*)?$/i.test(token)
        const delay = wordIndex * 38
        wordIndex += 1
        return (
          <span
            key={`w-${i}`}
            className={`beyond-lead-word ${isKey ? 'is-key' : ''}`}
            style={{ transitionDelay: `${120 + delay}ms` }}
          >
            {isKey ? <em className="beyond-mark">{token}</em> : token}
          </span>
        )
      })}
    </>
  )
}

function GiantLabel({ word }: { word: string }) {
  return (
    <span className="beyond-giant-word" aria-label={word}>
      {word.split('').map((ch, i) => (
        <span
          key={`${word}-${i}-${ch}`}
          className="beyond-giant-letter"
          style={{ animationDelay: `${i * 42}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

/**
 * Beyond — interactive type theatre.
 * Navy atmosphere, yellow only on text marks. No illustrations.
 */
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

  const enriched = stages.map((stage, i) => ({
    ...stage,
    highlight: stage.highlight ?? defaultStages[i]?.highlight,
  }))

  const current = enriched[active] ?? enriched[0]
  const sentences = splitSentences(current.text)
  const marquee = `${enriched.map((s) => s.label.toUpperCase()).join(' · ')} · `

  useEffect(() => {
    if (!visible || paused) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % enriched.length)
      setTick((t) => t + 1)
    }, 4200)
    return () => window.clearInterval(id)
  }, [visible, paused, enriched.length])

  const select = (index: number) => {
    setActive(index)
    setTick((t) => t + 1)
    setPaused(true)
  }

  return (
    <section
      id="beyond"
      ref={ref}
      className={`beyond-theatre scroll-mt-24 ${visible ? 'is-on' : ''}`}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient type ribbon */}
      <div className="beyond-marquee" aria-hidden>
        <div className="beyond-marquee-track">
          <span>{marquee.repeat(6)}</span>
          <span>{marquee.repeat(6)}</span>
        </div>
      </div>

      <header className="beyond-head relative z-[1] mb-10 sm:mb-12">
        <div className="mb-3 font-mono text-lg tracking-[0.14em] text-[#8fa3c7]">
          &gt;_<span className="ms-2 text-[10px] tracking-[0.2em] text-[#5c6e8f]">01</span>
        </div>

        <h2 className="beyond-title font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[0.14em] text-white">
          <span className="beyond-title-line">{title}</span>
        </h2>

        <p className="beyond-kicker mt-4 font-inter text-[0.8rem] font-light uppercase tracking-[0.16em] text-[#9aabcd]">
          {subtitle.replace(/·/g, ' — ')}
        </p>

        {lead ? (
          <p className="beyond-lead mt-7 max-w-[38rem] font-quote text-[1.02rem] font-light leading-roomy tracking-[0.03em] text-[#c5cddc]">
            <LeadWords text={lead} />
          </p>
        ) : null}
      </header>

      <div
        className="beyond-board relative z-[1]"
        onMouseEnter={() => setPaused(true)}
      >
        {/* Stage picker */}
        <nav className="beyond-nav" aria-label="Stages">
          {enriched.map((stage, i) => {
            const on = i === active
            return (
              <button
                key={stage.label}
                type="button"
                className={`beyond-nav-item ${on ? 'is-on' : ''}`}
                aria-current={on ? 'true' : undefined}
                onClick={() => select(i)}
                onFocus={() => select(i)}
                style={{ '--i': i } as CSSProperties}
              >
                <span className="beyond-nav-num font-mono text-[10px] tracking-[0.18em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="beyond-nav-label font-inter text-[0.78rem] font-light uppercase tracking-[0.16em]">
                  {stage.label}
                </span>
                <span className="beyond-nav-bar" aria-hidden />
              </button>
            )
          })}

          <p className="beyond-counter mt-auto hidden font-mono text-[10px] tracking-[0.2em] text-[#6d7f9e] lg:block">
            {String(active + 1).padStart(2, '0')}
            <span className="text-[#3d4f73]"> / </span>
            {String(enriched.length).padStart(2, '0')}
          </p>
        </nav>

        {/* Focus stage */}
        <div className="beyond-focus" data-phase={active}>
          <div className="beyond-focus-wash" aria-hidden />

          <p key={`g-${tick}`} className="beyond-giant font-display font-extrabold uppercase text-white">
            <GiantLabel word={current.label} />
          </p>

          <div key={`b-${tick}`} className="beyond-body mt-6 max-w-xl sm:mt-8">
            {sentences.map((sentence, i) => (
              <p
                key={`${current.label}-${i}`}
                className="beyond-line font-quote text-[0.95rem] font-light leading-roomy tracking-[0.03em] text-[#b8c2d4]"
                style={{ animationDelay: `${180 + i * 110}ms` }}
              >
                {highlightPhrase(sentence, current.highlight)}
              </p>
            ))}
          </div>

          {/* Quiet siblings under giant — mobile rhythm */}
          <ul className="beyond-ghosts mt-10 flex flex-wrap gap-x-6 gap-y-2 lg:mt-14" aria-hidden>
            {enriched.map((stage, i) => (
              <li
                key={stage.label}
                className={`beyond-ghost font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] ${
                  i === active ? 'is-on' : ''
                }`}
              >
                {stage.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

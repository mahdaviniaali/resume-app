'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

interface MethodSectionProps {
  title: string
  subtitle: string
  steps: { key: string; text: string }[]
}

const glyphs: Record<string, string> = {
  Discover: '◎',
  Model: '▣',
  Build: '⬡',
  Illuminate: '✦',
  کشف: '◎',
  مدل: '▣',
  ساخت: '⬡',
  روشنی: '✦',
}

function StepVisual({ name, on }: { name: string; on: boolean }) {
  const key = name.toLowerCase()

  if (key.includes('discover') || key.includes('کشف')) {
    return (
      <div className="relative h-full w-48">
        <div
          className="absolute inset-y-0 w-px bg-white/80"
          style={{
            left: on ? '70%' : '0%',
            transition: 'left 1.2s cubic-bezier(0.16,1,0.3,1)',
            boxShadow: '0 0 12px rgba(255,255,255,0.55)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]" />
      </div>
    )
  }

  if (key.includes('model') || key.includes('مدل')) {
    return (
      <div className="flex gap-2">
        {[0, 1, 2].map((b) => (
          <span
            key={b}
            className="h-8 w-14 rounded-md border border-white/20"
            style={{
              opacity: on ? 1 : 0.2,
              transform: on ? 'translateY(0)' : 'translateY(10px)',
              transition: `all 0.5s ${b * 0.1}s ease`,
              borderColor: on ? 'rgba(255,255,255,0.4)' : undefined,
            }}
          />
        ))}
      </div>
    )
  }

  if (key.includes('build') || key.includes('ساخت')) {
    return (
      <div className="flex items-end gap-1.5">
        {[18, 28, 22, 36, 26].map((h, b) => (
          <span
            key={b}
            className="w-4 rounded-sm bg-gradient-to-t from-[#8a2be2]/50 to-white/70"
            style={{
              height: on ? h : 4,
              transition: `height 0.55s ${b * 0.08}s cubic-bezier(0.16,1,0.3,1)`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="relative h-full w-40">
      <div
        className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          opacity: on ? 1 : 0.2,
          filter: on ? 'blur(0px)' : 'blur(2px)',
          transition: 'all 0.7s ease',
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{
          boxShadow: on ? '0 0 24px rgba(255,255,255,0.75)' : 'none',
          transform: `translate(-50%, -50%) scale(${on ? 1 : 0.4})`,
          transition: 'all 0.6s ease',
        }}
      />
    </div>
  )
}

export function MethodSection({ title, subtitle, steps }: MethodSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.15 })
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  const [rail, setRail] = useState(0)

  useEffect(() => {
    const el = listRef.current
    if (!el) return

    const nodes = Array.from(el.querySelectorAll('[data-step]')) as HTMLElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visibleEntries[0]) {
          const idx = Number((visibleEntries[0].target as HTMLElement).dataset.step)
          if (!Number.isNaN(idx)) setActive(idx)
        }
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: '-20% 0px -35% 0px' }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [steps.length])

  useEffect(() => {
    if (!visible) return
    setRail(((active + 1) / steps.length) * 100)
  }, [active, steps.length, visible])

  return (
    <section id="method" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="section-kicker">{subtitle}</p>
      <h2 className="section-title">{title}</h2>

      <div className="relative">
        <div className="method-rail" aria-hidden>
          <div className="method-rail-fill" style={{ height: visible ? `${rail}%` : '0%' }} />
        </div>

        <ol ref={listRef} className="space-y-0">
          {steps.map((step, i) => {
            const on = visible && i <= active
            const glyph = glyphs[step.key] || '◦'
            return (
              <li
                key={step.key}
                data-step={i}
                className={`method-row group grid grid-cols-[auto_1fr] gap-6 border-t border-white/10 py-10 last:border-b ${
                  on ? 'is-on' : ''
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={`method-dot flex items-center justify-center ${on ? 'is-on' : ''}`}>
                  <span className="text-[10px] text-white/80">{glyph}</span>
                </div>
                <div>
                  <div className="mb-2 flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#666]">0{i + 1}</span>
                    <h3
                      className={`font-display text-2xl transition-colors duration-300 ${
                        on ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {step.key}
                    </h3>
                  </div>
                  <p className="body-soft max-w-2xl">{step.text}</p>
                  <div className="mt-5 h-10 overflow-hidden" aria-hidden>
                    <StepVisual name={step.key} on={on} />
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface CrossingSectionProps {
  title: string
  subtitle: string
  steps: { from: string; to: string }[]
}

export function CrossingSection({ title, subtitle, steps }: CrossingSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  useReveal(ref)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const view = window.innerHeight
      const raw = 1 - rect.top / (view * 0.8)
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="crossing" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="mb-3 text-xs uppercase tracking-[3px] text-[#666]">{subtitle}</p>
      <h2 className="mb-10 font-display text-4xl text-white sm:text-5xl">{title}</h2>

      <div className="glass-card relative overflow-hidden">
        <div className="mb-10 flex items-center justify-between gap-4 text-xs uppercase tracking-[2px] text-[#777]">
          <span>Chaos</span>
          <div className="relative h-px flex-1 bg-white/10">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/20 to-white"
              style={{ width: `${progress * 100}%`, transition: 'width 0.15s linear' }}
            />
          </div>
          <span>Order</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => {
            const active = progress > i / steps.length
            return (
              <div
                key={`${step.from}-${step.to}`}
                className={`rounded-2xl border p-5 transition-all duration-700 ${
                  active
                    ? 'border-white/20 bg-white/[0.04]'
                    : 'border-white/5 bg-transparent opacity-50'
                }`}
              >
                <div className="mb-2 text-sm text-[#666] line-through decoration-white/20">
                  {step.from}
                </div>
                <div className="font-display text-xl text-white">{step.to}</div>
              </div>
            )
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            background: `radial-gradient(circle at ${20 + progress * 60}% 50%, rgba(255,255,255,0.12), transparent 45%)`,
          }}
        />
      </div>
    </section>
  )
}

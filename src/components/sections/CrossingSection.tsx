'use client'

import { useMemo } from 'react'
import { useInView, useScrollProgress } from '@/hooks/useInView'

interface CrossingSectionProps {
  title: string
  subtitle: string
  steps: { from: string; to: string }[]
}

/** Deterministic pseudo-random for SSR-safe particle layout */
function hash(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export function CrossingSection({ title, subtitle, steps }: CrossingSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.12 })
  const progress = useScrollProgress(ref)

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: hash(i) * 42 + 4,
        y: hash(i + 3) * 78 + 10,
        size: 3 + hash(i + 7) * 5,
        rot: hash(i + 11) * 360,
        delay: hash(i + 13) * 0.35,
      })),
    []
  )

  const activeStep = Math.min(steps.length - 1, Math.floor(progress * steps.length))

  return (
    <section id="crossing" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="section-kicker">{subtitle}</p>
      <h2 className="section-title">{title}</h2>

      <div className="panel-solid relative overflow-hidden rounded-3xl border border-white/12 p-5 sm:p-8">
        {/* Stage */}
        <div className="relative mb-8 h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:h-[340px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,20,147,0.12),transparent_45%),radial-gradient(circle_at_80%_50%,rgba(138,43,226,0.18),transparent_45%)]" />

          {/* CHAOS particles */}
          <div className="absolute inset-y-0 left-0 w-1/2">
            {particles.map((p) => {
              const t = Math.min(1, Math.max(0, (progress - p.delay) / 0.55))
              const targetX = 58 + (p.id % 5) * 7
              const targetY = 18 + Math.floor(p.id / 5) * 14
              const x = p.x + (targetX - p.x) * t
              const y = p.y + (targetY - p.y) * t
              const rot = p.rot * (1 - t)
              return (
                <span
                  key={p.id}
                  className="absolute rounded-sm bg-white"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: `${x}%`,
                    top: `${y}%`,
                    opacity: 0.25 + t * 0.65,
                    transform: `rotate(${rot}deg) scale(${0.7 + t * 0.5})`,
                    boxShadow: t > 0.6 ? '0 0 12px rgba(255,255,255,0.45)' : 'none',
                    transition: 'none',
                  }}
                />
              )
            })}
            <span
              className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[3px] text-white/50"
              style={{ opacity: 1 - progress * 0.7 }}
            >
              آشوب
            </span>
          </div>

          {/* ORDER lattice */}
          <div className="absolute inset-y-0 right-0 w-1/2">
            <div
              className="absolute inset-6 grid grid-cols-4 gap-2"
              style={{ opacity: 0.15 + progress * 0.85 }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-md border border-white/20 bg-white/[0.04]"
                  style={{
                    transform: `scale(${0.6 + progress * 0.4})`,
                    opacity: progress > i / 16 ? 1 : 0.2,
                    boxShadow:
                      progress > i / 16 + 0.05
                        ? 'inset 0 0 20px rgba(138,43,226,0.25)'
                        : 'none',
                    transition: 'opacity 0.35s ease, box-shadow 0.35s ease',
                  }}
                />
              ))}
            </div>
            <span
              className="absolute bottom-4 right-4 text-[10px] font-semibold tracking-[2px] text-white/70"
              style={{ opacity: 0.3 + progress * 0.7 }}
            >
              نظم
            </span>
          </div>

          {/* Beam */}
          <div className="absolute left-1/2 top-1/2 h-[70%] w-px -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-transparent via-white to-transparent"
              style={{
                height: `${progress * 100}%`,
                boxShadow: '0 0 24px rgba(255,255,255,0.55)',
              }}
            />
          </div>

          <div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              opacity: visible ? 0.4 + progress * 0.6 : 0,
              boxShadow: `0 0 ${16 + progress * 40}px rgba(255,255,255,${0.4 + progress * 0.5})`,
              transform: `translate(-50%, -50%) scale(${0.6 + progress * 0.8})`,
            }}
          />
        </div>

        {/* Live transformation readout */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-center">
          <span className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-white/55 line-through">
            {steps[activeStep]?.from}
          </span>
          <span className="font-mono text-xs tracking-[2px] text-white/70">تبدیل</span>
          <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 font-display text-lg text-white">
            {steps[activeStep]?.to}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {steps.map((step, i) => {
            const on = progress > i / steps.length + 0.04
            return (
              <div
                key={`${step.from}-${step.to}`}
                className={`rounded-2xl border px-4 py-3 transition-all duration-500 ${
                  on
                    ? 'border-white/25 bg-white/[0.07] opacity-100'
                    : 'border-white/10 bg-transparent opacity-40'
                }`}
              >
                <div className="text-xs text-white/45 line-through">{step.from}</div>
                <div className="font-display text-lg text-white">{step.to}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

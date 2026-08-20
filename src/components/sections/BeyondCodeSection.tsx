'use client'

import { useMemo } from 'react'
import { useInView, useScrollProgress } from '@/hooks/useInView'

interface BeyondCodeSectionProps {
  title?: string
  subtitle?: string
  lead?: string
  stages?: { label: string; text: string }[]
}

function hash(i: number) {
  const x = Math.sin(i * 91.7 + 17.3) * 43758.5453
  return x - Math.floor(x)
}

const defaultStages = [
  {
    label: 'ایده',
    text: 'حتی وقتی هنوز کامل تعریف نشده — به شکل‌دادنش کمک می‌کنیم.',
  },
  {
    label: 'ساختار',
    text: 'فکر انتزاعی را به سیستم کاری و منظم تبدیل می‌کنیم.',
  },
  {
    label: 'تجربه',
    text: 'مسیر کاربر را روشن می‌کنیم تا هیچ‌کس در محصول گم نشود.',
  },
]

export function BeyondCodeSection({
  title = 'فراتر از کد',
  subtitle = 'ایده · سیستم · تجربه',
  lead = 'ما فقط بک‌اند قوی نمی‌نویسیم. روی ایده کار می‌کنیم، سیستم می‌سازیم، و UX را طوری طراحی می‌کنیم که کاربر مسیر را حس کند — نه اینکه گم شود.',
  stages = defaultStages,
}: BeyondCodeSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.1 })
  const progress = useScrollProgress(ref)

  const sparks = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: 8 + hash(i) * 84,
        y: 12 + hash(i + 5) * 70,
        size: 4 + hash(i + 9) * 10,
        rot: hash(i + 2) * 50 - 25,
      })),
    []
  )

  // 0–0.33 idea, 0.33–0.66 structure, 0.66–1 ux
  const phase = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2
  const ideaT = Math.min(1, progress / 0.34)
  const structT = Math.min(1, Math.max(0, (progress - 0.34) / 0.33))
  const uxT = Math.min(1, Math.max(0, (progress - 0.67) / 0.33))

  const pathD =
    'M 8 78 C 22 78, 28 42, 40 42 S 55 78, 68 52 S 82 28, 92 28'

  return (
    <section id="beyond" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="section-kicker">{subtitle}</p>
      <h2 className="section-title">{title}</h2>
      <p className="body-soft mb-10 max-w-2xl text-base leading-8 text-[#d8d8d8]">{lead}</p>

      <div className="panel-solid overflow-hidden rounded-3xl border border-white/12 p-5 sm:p-8">
        {/* Stage tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {stages.map((s, i) => (
            <span
              key={s.label}
              className="rounded-full border px-4 py-2 text-sm transition-all duration-400"
              style={{
                borderColor: phase === i ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.12)',
                background: phase === i ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: phase === i ? '#fff' : 'rgba(255,255,255,0.45)',
                boxShadow: phase === i ? '0 0 24px rgba(138,43,226,0.25)' : 'none',
              }}
            >
              {s.label}
            </span>
          ))}
        </div>

        {/* Visual stage */}
        <div className="relative mb-8 h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-black/45 sm:h-[380px]">
          <img
            src="/hero.png"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.38] mix-blend-lighten saturate-[0.85]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                phase === 0
                  ? 'radial-gradient(circle at 30% 40%, rgba(255,20,147,0.14), transparent 50%)'
                  : phase === 1
                    ? 'radial-gradient(circle at 50% 50%, rgba(138,43,226,0.2), transparent 55%)'
                    : 'radial-gradient(circle at 70% 35%, rgba(0,191,255,0.16), transparent 50%)',
              transition: 'background 0.6s ease',
            }}
          />

          {/* IDEA sparks → settle into grid */}
          {sparks.map((sp, i) => {
            const col = i % 6
            const row = Math.floor(i / 6)
            const tx = 18 + col * 12
            const ty = 28 + row * 18
            const x = sp.x + (tx - sp.x) * structT
            const y = sp.y + (ty - sp.y) * structT
            const blur = (1 - structT) * 3
            const opacity = 0.2 + ideaT * 0.55 + structT * 0.25
            return (
              <span
                key={sp.id}
                className="absolute rounded-md bg-white"
                style={{
                  width: sp.size * (1 - structT * 0.35),
                  height: sp.size * (1 - structT * 0.35),
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity: visible ? opacity * (1 - uxT * 0.35) : 0,
                  transform: `rotate(${sp.rot * (1 - structT)}deg)`,
                  filter: `blur(${blur}px)`,
                  boxShadow:
                    structT > 0.5 ? '0 0 14px rgba(255,255,255,0.35)' : '0 0 8px rgba(255,20,147,0.25)',
                }}
              />
            )
          })}

          {/* STRUCTURE frames */}
          <div
            className="absolute inset-x-[12%] top-[22%] grid grid-cols-3 gap-3"
            style={{
              opacity: structT * (1 - uxT * 0.5),
              transform: `scale(${0.92 + structT * 0.08})`,
            }}
          >
            {['دامنه', 'سرویس', 'داده'].map((label, i) => (
              <div
                key={label}
                className="rounded-xl border border-white/20 bg-white/[0.05] px-3 py-4 text-center"
                style={{
                  transform: `translateY(${(1 - structT) * (12 + i * 8)}px)`,
                  opacity: 0.3 + structT * 0.7,
                  transition: 'none',
                }}
              >
                <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-white to-gold"
                    style={{ width: `${structT * 100}%` }}
                  />
                </div>
                <span className="text-xs text-white/80">{label}</span>
              </div>
            ))}
          </div>

          {/* UX clear path */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* maze / noise path when lost */}
            <path
              d="M 8 78 L 18 60 L 25 82 L 35 50 L 42 75 L 55 40 L 62 70 L 75 45 L 85 65 L 92 55"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.6"
              strokeDasharray="2 2"
              style={{ opacity: Math.max(0, 1 - uxT * 1.4) }}
              vectorEffect="non-scaling-stroke"
            />
            {/* clear path */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.1"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: 1 - uxT,
                filter: uxT > 0.2 ? 'drop-shadow(0 0 6px rgba(255,255,255,0.5))' : 'none',
              }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* User dot traveling the clear path */}
          <div
            className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              left: `${8 + uxT * 84}%`,
              top: `${78 - Math.sin(uxT * Math.PI) * 40}%`,
              opacity: 0.25 + uxT * 0.75,
              boxShadow: '0 0 22px rgba(255,255,255,0.75)',
            }}
          />

          {/* Wayfinding markers */}
          {['ورود', 'مسیر', 'هدف'].map((m, i) => {
            const t = (i + 1) / 3
            const show = uxT > t - 0.15
            return (
              <span
                key={m}
                className="absolute rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[10px] text-white/80"
                style={{
                  left: `${12 + i * 36}%`,
                  top: `${22 + (i % 2) * 8}%`,
                  opacity: show ? 1 : 0,
                  transform: `translateY(${show ? 0 : 8}px)`,
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
              >
                {m}
              </span>
            )
          })}

          <div className="absolute bottom-3 right-4 left-4 flex justify-between text-[10px] tracking-[1px] text-white/40">
            <span style={{ opacity: 1 - phase * 0.2 }}>فکر خام</span>
            <span style={{ opacity: phase === 1 ? 1 : 0.35 }}>سیستم روشن</span>
            <span style={{ opacity: phase === 2 ? 1 : 0.35 }}>کاربر گم نمی‌شود</span>
          </div>
        </div>

        {/* Copy for active stage */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stages.map((s, i) => {
            const on = phase === i && visible
            return (
              <div
                key={s.label}
                className="rounded-2xl border p-4 transition-all duration-500"
                style={{
                  borderColor: on ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.1)',
                  background: on ? 'rgba(255,255,255,0.07)' : 'transparent',
                  opacity: on ? 1 : 0.45,
                  transform: on ? 'translateY(0)' : 'translateY(6px)',
                }}
              >
                <div className="mb-2 font-display text-xl text-white">{s.label}</div>
                <p className="text-sm leading-7 text-[#cfcfcf]">{s.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

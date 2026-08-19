'use client'

import type { CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'

interface VoidSectionProps {
  title: string
  subtitle: string
  items: { label: string; title: string; text: string }[]
}

const rotations = ['-2.5deg', '1.8deg', '-1.2deg']

export function VoidSection({ title, subtitle, items }: VoidSectionProps) {
  const { ref, visible } = useInView<HTMLElement>()

  return (
    <section id="void" ref={ref} className="relative mt-32 scroll-mt-24 sm:mt-40">
      <div
        className="pointer-events-none absolute -inset-x-8 -top-10 h-48 opacity-30 void-noise"
        aria-hidden
      />

      <p className="section-kicker">{subtitle}</p>
      <h2 className="section-title">{title}</h2>

      <div className="relative grid gap-6 md:grid-cols-3">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/40"
              style={{
                left: `${12 + i * 15}%`,
                top: `${18 + (i % 3) * 28}%`,
                animation: visible ? `shard-flicker ${1.6 + i * 0.2}s ease-in-out infinite` : undefined,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {items.map((item, i) => (
          <div
            key={item.label}
            className={`panel-solid void-shard rounded-3xl border border-white/12 p-8 ${visible ? 'is-on' : ''}`}
            style={
              {
                '--rot': rotations[i % rotations.length],
                transitionDelay: `${i * 140}ms`,
              } as CSSProperties
            }
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="font-mono text-xs tracking-[2px] text-[#777]">{item.label}</div>
              <div className="flex gap-1" aria-hidden>
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="block h-1.5 w-1.5 rounded-sm bg-white/25"
                    style={{
                      transform: visible
                        ? `translate(${(d - 1) * (1 - Math.min(1, (i + 1) * 0.2))}px, ${(d % 2) * 2}px)`
                        : undefined,
                      opacity: visible ? 0.35 + d * 0.15 : 0.2,
                      transition: `transform 0.8s ${0.2 + i * 0.1}s ease`,
                    }}
                  />
                ))}
              </div>
            </div>

            <svg className="mb-5 h-8 w-full overflow-visible" viewBox="0 0 200 24" aria-hidden>
              <path
                d="M0 12 H70 L85 4 L100 20 L115 8 L130 12 H200"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
                strokeDasharray={visible ? '0' : '6 6'}
                style={{
                  transition: 'stroke-dasharray 0.8s ease',
                  transitionDelay: `${200 + i * 120}ms`,
                }}
              />
              <circle
                cx={100}
                cy={12}
                r={3}
                fill={visible ? 'rgba(248,113,113,0.8)' : 'rgba(255,255,255,0.2)'}
                style={{ transition: 'fill 0.5s ease', transitionDelay: `${300 + i * 120}ms` }}
              />
            </svg>

            <h3 className="mb-3 font-display text-xl text-white">{item.title}</h3>
            <p className="body-soft">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

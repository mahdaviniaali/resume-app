'use client'

import { useEffect, useState } from 'react'
import { useInView, useScrollProgress } from '@/hooks/useInView'

interface CapabilitiesSectionProps {
  title: string
  subtitle: string
  cards: {
    icon: string
    title: string
    description: string
    code?: string
    span?: number
  }[]
}

const NODES = [
  { id: 'core', label: 'جنسیس', x: 50, y: 50, r: 28 },
  { id: 'idea', label: 'ایده', x: 18, y: 26, r: 17 },
  { id: 'ux', label: 'تجربه', x: 82, y: 26, r: 17 },
  { id: 'saas', label: 'SaaS', x: 18, y: 74, r: 16 },
  { id: 'arch', label: 'معماری', x: 82, y: 74, r: 16 },
]

const EDGES: [string, string][] = [
  ['core', 'idea'],
  ['core', 'ux'],
  ['core', 'saas'],
  ['core', 'arch'],
  ['idea', 'ux'],
  ['saas', 'arch'],
]

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!
}

export function CapabilitiesSection({ title, subtitle, cards }: CapabilitiesSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.1 })
  const progress = useScrollProgress(ref)
  const [packet, setPacket] = useState(0)
  const [tenants, setTenants] = useState(0)

  useEffect(() => {
    if (!visible) return
    const id = window.setInterval(() => setPacket((p) => (p + 1) % 4), 700)
    return () => window.clearInterval(id)
  }, [visible])

  useEffect(() => {
    if (!visible) {
      setTenants(0)
      return
    }
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setTenants(n)
      if (n >= 12) window.clearInterval(id)
    }, 120)
    return () => window.clearInterval(id)
  }, [visible])

  const lit = Math.floor(progress * (NODES.length + 1))

  return (
    <section id="capabilities" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="section-kicker">{subtitle}</p>
      <h2 className="section-title">{title}</h2>

      <div className="panel-solid mb-8 overflow-hidden rounded-3xl border border-white/12 p-5 sm:p-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[2px] text-white/45">نقشه زنده سیستم</p>
            <p className="mt-1 font-display text-2xl text-white sm:text-3xl">
              ایده، سیستم، تجربه.
            </p>
          </div>
          <div className="font-mono text-xs text-white/55">
            مسیرها <span className="text-white">{String(tenants).padStart(2, '0')}</span> / ۱۲
          </div>
        </div>

        <div className="relative h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-black/45 sm:h-[380px]">
          {/* Tenant constellation */}
          <div className="absolute inset-x-4 top-3 flex flex-wrap gap-1.5 sm:inset-x-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-sm"
                style={{
                  background:
                    i < tenants
                      ? i % 3 === 0
                        ? 'rgba(138,43,226,0.9)'
                        : i % 3 === 1
                          ? 'rgba(0,191,255,0.8)'
                          : 'rgba(255,20,147,0.75)'
                      : 'rgba(255,255,255,0.12)',
                  boxShadow: i < tenants ? '0 0 8px rgba(255,255,255,0.35)' : 'none',
                  transition: 'background 0.25s ease, box-shadow 0.25s ease',
                }}
              />
            ))}
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {EDGES.map(([a, b], i) => {
              const A = nodeById(a)
              const B = nodeById(b)
              const on = progress > 0.12 + i * 0.1
              return (
                <line
                  key={`${a}-${b}`}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke={on ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth={on ? 0.35 : 0.2}
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}

            {/* traveling packet */}
            {visible &&
              EDGES.slice(0, 4).map(([a, b], i) => {
                if (packet !== i) return null
                const A = nodeById(a)
                const B = nodeById(b)
                return (
                  <circle key={`pkt-${i}`} r="1.2" fill="#fff">
                    <animate
                      attributeName="cx"
                      values={`${A.x};${B.x}`}
                      dur="0.65s"
                      repeatCount="1"
                    />
                    <animate
                      attributeName="cy"
                      values={`${A.y};${B.y}`}
                      dur="0.65s"
                      repeatCount="1"
                    />
                  </circle>
                )
              })}
          </svg>

          {NODES.map((node, i) => {
            const on = lit > i || progress > 0.2
            return (
              <div
                key={node.id}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className="flex items-center justify-center rounded-full border font-display text-[10px] uppercase tracking-wide text-white sm:text-xs"
                  style={{
                    width: node.r * 2.2,
                    height: node.r * 2.2,
                    borderColor: on ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.12)',
                    background: on
                      ? node.id === 'core'
                        ? 'rgba(138,43,226,0.35)'
                        : 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.35)',
                    boxShadow: on
                      ? node.id === 'core'
                        ? '0 0 40px rgba(138,43,226,0.55)'
                        : '0 0 20px rgba(255,255,255,0.2)'
                      : 'none',
                    transform: `scale(${on ? 1 : 0.85})`,
                    transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {node.label}
                </div>
              </div>
            )
          })}

          <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] tracking-[1px] text-white/40">
            <span>ایده تا محصول</span>
            <span>مسیر کاربر روشن</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.slice(0, 6).map((card, i) => (
          <div
            key={card.title}
            className={`panel-solid rounded-2xl border border-white/10 p-5 void-shard ${
              visible ? 'is-on' : ''
            }`}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="mb-2 text-[10px] uppercase tracking-[2px] text-white/45">{card.icon}</div>
            <h3 className="mb-2 font-display text-xl text-white">{card.title}</h3>
            <p className="body-soft">{card.description}</p>
            {card.code && (
              <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-white/75">
                {card.code}
              </pre>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

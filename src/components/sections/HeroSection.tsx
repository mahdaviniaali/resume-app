'use client'

import { type SVGProps } from 'react'

const STACK = [
  {
    title: 'AI Engineering / Agents',
    subtitle: 'Agents that ship',
    accent: true,
    icon: PythonIcon,
  },
  {
    title: 'RAG & Automation',
    subtitle: 'Knowledge under load',
    accent: false,
    icon: GearIcon,
  },
  {
    title: 'Performance Systems',
    subtitle: 'Precise under pressure',
    accent: false,
    icon: LayersIcon,
  },
  {
    title: 'Domain Architecture',
    subtitle: 'Bounded contexts',
    accent: false,
    icon: CubeIcon,
  },
  {
    title: 'Multi-tenant SaaS',
    subtitle: 'Isolated systems',
    accent: false,
    icon: CloudIcon,
  },
] as const

const ROLES = [
  { label: 'AI Systems Architect', icon: HexagonIcon },
  { label: 'Backend Engineer', icon: BracesIcon },
  { label: 'Solution Designer', icon: CubeIcon },
  { label: 'Builder of Digital Systems', icon: TerminalIcon },
] as const

/**
 * Fixed desktop composition — HeroStage scales this canvas like a photo.
 * No breakpoint reflow: phone sees the same layout, only smaller.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      dir="ltr"
      className="absolute inset-0 z-[1] flex items-center pl-10 pr-5 pt-14 scroll-mt-8"
    >
      <div className="grid w-full grid-cols-[minmax(0,1fr)_180px] items-center gap-6 pr-2">
        <div className="max-w-[560px] text-left">
          <div className="mb-3 font-mono text-lg tracking-[0.14em] text-white/90">&gt;_</div>

          <h1
            aria-label="ISEMPTY"
            className="font-display text-[5.4rem] font-extrabold uppercase leading-[0.95] tracking-[0.16em] text-white"
          >
            IS
            <StylizedE />
            MPTY
          </h1>

          <p className="mt-4 font-inter text-[0.95rem] font-light uppercase leading-roomy tracking-[0.16em] text-white/95">
            Systems. <span className="text-gold">Architecture.</span> Engineering.
          </p>

          <p className="mt-5 flex max-w-[28rem] items-start gap-3 font-quote text-[0.95rem] font-light leading-roomy tracking-[0.03em] text-[#cfcfcf]">
            <span className="mt-1 inline-block h-9 w-px shrink-0 bg-gold" aria-hidden />
            <span>
              From the void of is empty; We <span className="text-gold">code the light</span>.
            </span>
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
            {ROLES.map(({ label, icon: Icon }) => (
              <li key={label} className="flex flex-col items-start gap-2 text-left">
                <Icon className="h-5 w-5 text-white/90" />
                <span className="max-w-[7rem] font-inter text-[10px] font-light uppercase leading-tight tracking-[0.12em] text-muted">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="w-[168px] justify-self-end self-center">
          <TechStack />
        </aside>
      </div>
    </section>
  )
}

function TechStack() {
  return (
    <ul className="flex flex-col">
      {STACK.map(({ title, subtitle, accent, icon: Icon }, i) => (
        <li key={title} className={i === 0 ? '' : 'mt-3'}>
          {i > 0 && <div className="mb-3 h-px w-7 bg-line/80" />}
          <div className={`flex items-start gap-2 ${accent ? 'text-gold' : 'text-muted'}`}>
            <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-90" />
            <div className="min-w-0">
              <p
                className={`font-mono text-[10px] uppercase leading-snug tracking-[0.07em] ${
                  accent ? 'text-gold-bright' : 'text-[#c8c8c8]'
                }`}
              >
                {title}
              </p>
              <p className="mt-0.5 font-inter text-[9px] font-light leading-snug tracking-[0.04em] text-dim">
                {subtitle}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

function StylizedE() {
  return (
    <span
      className="mx-[0.04em] inline-flex h-[0.68em] w-[0.52em] translate-y-[-0.06em] flex-col justify-between align-middle"
      aria-label="E"
    >
      <span className="block h-[0.11em] w-full bg-white" />
      <span className="block h-[0.11em] w-full bg-white" />
      <span className="block h-[0.11em] w-full bg-white" />
    </span>
  )
}

function iconProps(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  }
}

function HexagonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 3.2 20.2 8v8L12 20.8 3.8 16V8L12 3.2Z" />
    </svg>
  )
}

function CubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 3 21 7.5v9L12 21 3 16.5v-9L12 3Z" />
      <path d="M12 21V12" />
      <path d="M21 7.5 12 12 3 7.5" />
    </svg>
  )
}

function BracesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M9 5H8a2 2 0 0 0-2 2v3c0 1-1 2-2 2 1 0 2 1 2 2v3a2 2 0 0 0 2 2h1" />
      <path d="M15 5h1a2 2 0 0 1 2 2v3c0 1 1 2 2 2-1 0-2 1-2 2v3a2 2 0 0 1-2 2h-1" />
    </svg>
  )
}

function TerminalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
      <path d="M7 10.5 9.5 13 7 15.5" />
      <path d="M12.5 15.5H17" />
    </svg>
  )
}

function PythonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12.5 4h-3A2.5 2.5 0 0 0 7 6.5V9h7.5A2.5 2.5 0 0 1 17 11.5V14" />
      <path d="M11.5 20h3A2.5 2.5 0 0 0 17 17.5V15H9.5A2.5 2.5 0 0 1 7 12.5V10" />
      <circle cx="10.2" cy="6.4" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="13.8" cy="17.6" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4.2v1.6M12 18.2v1.6M4.2 12h1.6M18.2 12h1.6M6.4 6.4l1.1 1.1M16.5 16.5l1.1 1.1M17.6 6.4l-1.1 1.1M7.5 16.5l-1.1 1.1" />
    </svg>
  )
}

function CloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M7.5 17.5h9.2a3.3 3.3 0 0 0 .4-6.57 5 5 0 0 0-9.55-1.5A3.4 3.4 0 0 0 7.5 17.5Z" />
    </svg>
  )
}

function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 4 20 8.2 12 12.4 4 8.2 12 4Z" />
      <path d="M4 12.2 12 16.4 20 12.2" />
      <path d="M4 16.2 12 20.4 20 16.2" />
    </svg>
  )
}

'use client'

import { useEffect, useRef, useState, type ReactNode, type SVGProps } from 'react'

const STACK = [
  {
    title: 'Python / Django',
    subtitle: 'Domain logic & APIs',
    accent: true,
    icon: PythonIcon,
  },
  {
    title: 'Rust / Async',
    subtitle: 'Performance core',
    accent: false,
    icon: GearIcon,
  },
  {
    title: 'DDD / Clean Architecture',
    subtitle: 'Bounded contexts',
    accent: false,
    icon: CubeIcon,
  },
  {
    title: 'SaaS / Multi-tenant',
    subtitle: 'Isolated systems',
    accent: false,
    icon: CloudIcon,
  },
  {
    title: 'System Design / Scalability',
    subtitle: 'Distributed thinking',
    accent: false,
    icon: LayersIcon,
  },
] as const

const ROLES = [
  { label: 'System Architect', icon: HexagonIcon },
  { label: 'DDD Enthusiast', icon: CubeIcon },
  { label: 'Backend Engineer', icon: BracesIcon },
  { label: 'Builder of Digital Systems', icon: TerminalIcon },
] as const

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [parallax, setParallax] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.85)))
      setParallax(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      dir="ltr"
      className="relative z-[1] flex flex-col justify-end pb-2 scroll-mt-8 sm:pb-4"
      style={{
        opacity: 1 - parallax * 0.4,
        transform: `translateY(${parallax * -28}px)`,
      }}
    >
      <DomainDiagram />
      <GhostCode />

      <div className="relative z-[1] grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-[920px] text-left">
          <div className="mb-3 font-mono text-lg tracking-[0.14em] text-white sm:text-xl">
            &gt;_
          </div>

          <h1
            aria-label="ISEMPTY"
            className="font-display text-[clamp(2.6rem,11vw,7.4rem)] font-extrabold uppercase leading-[0.95] tracking-[0.16em] text-white sm:tracking-[0.18em]"
          >
            IS
            <StylizedE />
            MPTY
          </h1>

          <p className="mt-5 font-inter text-[clamp(0.7rem,1.7vw,1.05rem)] font-light uppercase leading-roomy tracking-[0.14em] text-white sm:tracking-[0.18em]">
            Systems.{' '}
            <span className="text-gold">Architecture.</span> Engineering.
          </p>

          <p className="mt-6 flex max-w-[34rem] items-start gap-4 font-quote text-[0.95rem] font-light leading-roomy tracking-[0.04em] text-[#cfcfcf] sm:text-base">
            <span className="mt-1 inline-block h-10 w-px shrink-0 bg-gold" aria-hidden />
            <span>
              From the void of is empty; We{' '}
              <span className="text-gold">code the light</span>.
            </span>
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-6 sm:mt-10 sm:gap-x-10">
            {ROLES.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex flex-col items-start gap-2.5 text-left"
              >
                <Icon className="h-6 w-6 text-white" />
                <span className="max-w-[7.5rem] font-inter text-[10px] font-light uppercase leading-tight tracking-[0.14em] text-muted">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 lg:hidden">
            <TechStack />
          </div>
        </div>

        <aside className="hidden w-full max-w-[280px] justify-self-end lg:block">
          <TechStack />
        </aside>
      </div>

      <footer className="relative z-[1] mt-10 flex flex-col gap-4 border-t border-line/80 pt-5 text-left sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-inter text-[11px] font-light uppercase tracking-[0.22em] text-[#cfcfcf] sm:text-xs">
          Think. Design. Build. <span className="text-gold">Refine.</span>
        </p>
        <a
          href="https://isempty.online"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-gold"
        >
          <GlobeIcon className="h-3.5 w-3.5" />
          ISEMPTY.ONLINE
        </a>
      </footer>
    </section>
  )
}

function TechStack() {
  return (
    <ul className="flex flex-col">
      {STACK.map(({ title, subtitle, accent, icon: Icon }, i) => (
        <li key={title} className={i === 0 ? '' : 'mt-5'}>
          {i > 0 && <div className="mb-5 h-px w-10 bg-line" />}
          <div className={`flex items-start gap-3 ${accent ? 'text-gold' : 'text-muted'}`}>
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p
                className={`font-mono text-[13px] uppercase tracking-[0.08em] ${
                  accent ? 'text-gold-bright' : 'text-[#c8c8c8]'
                }`}
              >
                {title}
              </p>
              <p className="mt-1 font-inter text-[11px] font-light tracking-[0.06em] text-dim">
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

function Kw({ children }: { children: ReactNode }) {
  return <span className="hero-kw">{children}</span>
}

function Cm({ children }: { children: ReactNode }) {
  return <span className="hero-cm">{children}</span>
}

function GhostCode() {
  return (
    <>
      <pre
        className="pointer-events-none absolute left-0 top-2 hidden select-none font-mono text-[11px] leading-[2] tracking-[0.04em] text-[#8a8a8a] opacity-[0.22] sm:block"
        aria-hidden
      >
        <Kw>class</Kw> System:{'\n'}
        {'    '}
        <Kw>def</Kw> __init__(<Kw>self</Kw>):{'\n'}
        {'        self.state = Void()'}
      </pre>
      <pre
        className="pointer-events-none absolute left-[8%] top-[38%] hidden select-none font-mono text-[11px] leading-[2] tracking-[0.04em] text-[#8a8a8a] opacity-[0.16] lg:block"
        aria-hidden
      >
        <Kw>def</Kw> build(<Kw>self</Kw>):{'\n'}
        {'    '}
        <Kw>while True</Kw>:{'\n'}
        {'        '}
        <Cm># Think.</Cm>
        {'\n        '}
        <Cm># Design.</Cm>
        {'\n        '}
        <Cm># Build.</Cm>
        {'\n        '}
        <Cm># Refine.</Cm>
      </pre>
      <pre
        className="pointer-events-none absolute bottom-28 right-[32%] hidden select-none font-mono text-[11px] leading-[2] tracking-[0.04em] text-[#8a8a8a] opacity-[0.14] xl:block"
        aria-hidden
      >
        <Kw>return</Kw> Architecture.light()
      </pre>
    </>
  )
}

function DomainDiagram() {
  return (
    <svg
      className="pointer-events-none absolute -left-6 top-[8%] h-[72%] w-[min(720px,70%)] opacity-[0.11]"
      viewBox="0 0 640 420"
      fill="none"
      aria-hidden
    >
      <circle cx="118" cy="96" r="54" stroke="#8A8A8A" strokeWidth="1" />
      <circle cx="118" cy="96" r="8" stroke="#8A8A8A" strokeWidth="1" />
      <text x="86" y="172" fill="#8A8A8A" fontSize="11" letterSpacing="2" fontFamily="monospace">
        DOMAIN
      </text>

      <rect x="248" y="48" width="110" height="46" rx="2" stroke="#8A8A8A" strokeWidth="1" />
      <text x="270" y="76" fill="#8A8A8A" fontSize="11" letterSpacing="2" fontFamily="monospace">
        ENTITY
      </text>

      <rect x="430" y="118" width="128" height="46" rx="2" stroke="#8A8A8A" strokeWidth="1" />
      <text x="444" y="146" fill="#8A8A8A" fontSize="11" letterSpacing="2" fontFamily="monospace">
        BOUNDARY
      </text>

      <circle cx="196" cy="268" r="42" stroke="#8A8A8A" strokeWidth="1" />
      <text x="158" y="330" fill="#8A8A8A" fontSize="11" letterSpacing="2" fontFamily="monospace">
        AGGREGATE
      </text>

      <rect x="340" y="248" width="118" height="46" rx="2" stroke="#8A8A8A" strokeWidth="1" />
      <text x="372" y="276" fill="#8A8A8A" fontSize="11" letterSpacing="2" fontFamily="monospace">
        VALUE
      </text>

      <path d="M172 96 H248" stroke="#8A8A8A" strokeWidth="1" />
      <path d="M358 71 H430" stroke="#8A8A8A" strokeWidth="1" />
      <path d="M494 164 V248" stroke="#8A8A8A" strokeWidth="1" />
      <path d="M340 271 H238" stroke="#8A8A8A" strokeWidth="1" />
      <path d="M118 150 V226" stroke="#8A8A8A" strokeWidth="1" />
      <path d="M196 226 V226" stroke="#8A8A8A" strokeWidth="1" />
      <circle cx="358" cy="71" r="3" fill="#8A8A8A" />
      <circle cx="238" cy="271" r="3" fill="#8A8A8A" />
      <circle cx="196" cy="226" r="3" fill="#8A8A8A" />
    </svg>
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

function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4c2.4 2.4 3.6 5.1 3.6 8s-1.2 5.6-3.6 8c-2.4-2.4-3.6-5.1-3.6-8s1.2-5.6 3.6-8Z" />
    </svg>
  )
}

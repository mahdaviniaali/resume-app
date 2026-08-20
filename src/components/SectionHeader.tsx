'use client'

interface SectionHeaderProps {
  index?: string
  kicker: string
  title: string
  lead?: string
  align?: 'start' | 'center'
}

/** Bold editorial header — oversized index + display title */
export function SectionHeader({
  index,
  kicker,
  title,
  lead,
  align = 'start',
}: SectionHeaderProps) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <header className={`relative mb-12 flex max-w-4xl flex-col gap-5 sm:mb-16 ${alignCls}`}>
      {index ? (
        <span
          className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-[clamp(4.5rem,14vw,9rem)] font-black leading-none tracking-tight text-white/[0.04] sm:-top-14"
          aria-hidden
        >
          {index}
        </span>
      ) : null}
      <p className="relative font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{kicker}</p>
      <h2 className="relative font-display text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold uppercase leading-[1.05] tracking-[0.06em] text-white">
        {title}
      </h2>
      {lead ? (
        <p className="relative max-w-2xl border-l border-gold/60 pl-5 font-inter text-[0.95rem] font-light leading-8 text-[#b8b8b8]">
          {lead}
        </p>
      ) : null}
    </header>
  )
}

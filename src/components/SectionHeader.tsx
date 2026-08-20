'use client'

interface SectionHeaderProps {
  index?: string
  kicker: string
  title: string
  lead?: string
  align?: 'start' | 'center'
}

/** Shared cinematic section header — matches hero sparseness */
export function SectionHeader({
  index,
  kicker,
  title,
  lead,
  align = 'start',
}: SectionHeaderProps) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <header className={`mb-14 flex max-w-3xl flex-col gap-4 sm:mb-16 ${alignCls}`}>
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        {index ? <span className="text-muted">{index}</span> : null}
        {index ? <span className="h-px w-6 bg-line" aria-hidden /> : null}
        <span>{kicker}</span>
      </div>
      <h2 className="font-sans text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.35] tracking-tight text-white">
        {title}
      </h2>
      {lead ? (
        <p className="max-w-2xl text-[0.95rem] font-light leading-8 text-[#b8b8b8]">{lead}</p>
      ) : null}
    </header>
  )
}

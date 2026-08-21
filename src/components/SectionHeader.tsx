'use client'

/** Shared section header: >_ · Inter title · inter kicker · quote bar */
export function SectionHeader({
  index,
  kicker,
  title,
  lead,
}: {
  index?: string
  kicker: string
  title: string
  lead?: string
}) {
  return (
    <header className="mb-10 max-w-[560px] text-left sm:mb-12">
      <div className="mb-3 font-mono text-lg tracking-[0.14em] text-gold">
        &gt;_<span className="ms-2 text-[10px] tracking-[0.2em] text-muted">{index}</span>
      </div>
      <h2 className="font-inter text-[clamp(1.75rem,3.5vw,2.65rem)] font-semibold leading-[1.1] tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-4 font-inter text-[0.85rem] font-light uppercase leading-roomy tracking-[0.14em] text-white/90">
        {kicker.split(/[·•]/).map((part, i, arr) => {
          const t = part.trim()
          if (!t) return null
          const accent = i === 1
          return (
            <span key={`${t}-${i}`}>
              {accent ? <span className="text-gold">{t}</span> : t}
              {i < arr.length - 1 ? <span className="text-white/90">. </span> : null}
            </span>
          )
        })}
      </p>
      {lead ? (
        <p className="mt-5 flex max-w-[28rem] items-start gap-3 font-quote text-[0.95rem] font-light leading-roomy tracking-[0.03em] text-[#cfcfcf]">
          <span className="mt-1 inline-block h-9 w-px shrink-0 bg-gold" aria-hidden />
          <span>{lead}</span>
        </p>
      ) : null}
    </header>
  )
}

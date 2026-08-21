'use client'

/** Shared section header — matches Beyond: muted index+kicker eyebrow, gold only for phrase marks */
export function SectionHeader({
  index,
  kicker,
  title,
  lead,
  leadHighlight,
}: {
  index?: string
  kicker: string
  title: string
  lead?: string
  /** Optional phrase inside `lead` rendered in gold — never paint labels/chrome gold */
  leadHighlight?: string
}) {
  const eyebrow = [index, formatKicker(kicker)].filter(Boolean).join(' — ')

  return (
    <header className="mb-8 max-w-[560px] text-left sm:mb-10">
      <p className="mb-3 font-inter text-[11px] font-medium uppercase tracking-[0.18em] text-[#8fa3c7]">
        {eyebrow}
      </p>
      <h2 className="font-inter text-[clamp(1.9rem,4.2vw,2.85rem)] font-semibold leading-[1.1] tracking-tight text-white">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-[38rem] font-inter text-[1rem] font-light leading-[1.85] tracking-[0.01em] text-[#b8c2d4]">
          {highlightPhrase(lead, leadHighlight)}
        </p>
      ) : null}
    </header>
  )
}

function formatKicker(kicker: string) {
  return kicker.replace(/·/g, ' / ')
}

function highlightPhrase(text: string, phrase?: string) {
  if (!phrase) return text
  const i = text.toLowerCase().indexOf(phrase.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <em className="not-italic text-gold">{text.slice(i, i + phrase.length)}</em>
      {text.slice(i + phrase.length)}
    </>
  )
}

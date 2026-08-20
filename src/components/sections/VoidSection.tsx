'use client'

import { SectionHeader } from '@/components/SectionHeader'

interface VoidSectionProps {
  title: string
  subtitle: string
  items: { label: string; title: string; text: string }[]
}

export function VoidSection({ title, subtitle, items }: VoidSectionProps) {
  return (
    <section id="void" className="scroll-mt-24">
      <SectionHeader index="02" kicker={subtitle} title={title} />

      <ul className="max-w-3xl">
        {items.map((item, i) => (
          <li key={item.label} className={i === 0 ? '' : 'mt-6'}>
            {i > 0 && <div className="mb-6 h-px w-7 bg-line/80" />}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-8">
              <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
                {item.label} // {item.title}
              </p>
              <p className="font-quote text-[0.9rem] font-light leading-roomy tracking-[0.03em] text-[#cfcfcf]">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

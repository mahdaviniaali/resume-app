'use client'

import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'

interface VoidSectionProps {
  title: string
  subtitle: string
  items: { label: string; title: string; text: string }[]
}

export function VoidSection({ title, subtitle, items }: VoidSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.12 })

  return (
    <section
      id="void"
      ref={ref}
      className={`mt-28 scroll-mt-24 sm:mt-36 ${visible ? 'opacity-100' : 'opacity-50'} transition-opacity duration-700`}
    >
      <SectionHeader index="02" kicker={subtitle} title={title} />

      <ul className="divide-y divide-line border-y border-line">
        {items.map((item, i) => (
          <li
            key={item.label}
            className="group grid gap-4 py-10 transition-colors duration-500 hover:bg-white/[0.02] sm:grid-cols-[5rem_minmax(0,14rem)_1fr] sm:items-start sm:gap-10 sm:py-12"
            style={{
              transitionDelay: visible ? `${i * 80}ms` : '0ms',
              opacity: visible ? 1 : 0.35,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transitionProperty: 'opacity, transform, background-color',
            }}
          >
            <span className="font-mono text-xs tracking-[0.24em] text-gold/80">{item.label}</span>
            <h3 className="font-sans text-xl font-medium text-white sm:text-2xl">{item.title}</h3>
            <p className="max-w-xl text-[0.95rem] leading-8 text-[#9a9a9a] group-hover:text-[#cfcfcf]">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

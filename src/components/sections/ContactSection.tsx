'use client'

import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'
import type { ContactLinks } from '@/lib/api'

interface ContactSectionProps {
  title: string
  subtitle: string
  button: string
  contacts: ContactLinks
}

export function ContactSection({ title, subtitle, button, contacts }: ContactSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.15 })

  const mailto = contacts.email
    ? `mailto:${contacts.email}?subject=${encodeURIComponent('ISEMPTY Signal')}`
    : '#team'

  const socials = [
    contacts.email ? { label: 'Email', href: `mailto:${contacts.email}` } : null,
    contacts.telegram ? { label: 'Telegram', href: contacts.telegram } : null,
    contacts.linkedin ? { label: 'LinkedIn', href: contacts.linkedin } : null,
    contacts.github ? { label: 'GitHub', href: contacts.github } : null,
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <section
      id="contact"
      ref={ref}
      className={`mt-28 scroll-mt-24 pb-24 transition-opacity duration-700 sm:mt-40 sm:pb-32 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <div className="border border-line bg-ink/40 px-6 py-14 sm:px-12 sm:py-20">
        <SectionHeader index="07" kicker="Contact" title={title} lead={subtitle} />

        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <a
            href={mailto}
            className="inline-flex w-fit items-center gap-3 border border-white/80 bg-white px-8 py-4 font-sans text-sm font-semibold text-black transition hover:bg-transparent hover:text-white"
          >
            {button}
          </a>

          <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="transition-colors hover:text-gold"
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

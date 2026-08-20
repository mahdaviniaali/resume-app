'use client'

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
      className={`relative mt-32 scroll-mt-24 overflow-hidden pb-28 transition-opacity duration-700 sm:mt-48 sm:pb-36 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(212,175,55,0.08),transparent_55%)]"
        aria-hidden
      />

      <p
        className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[clamp(5rem,20vw,14rem)] font-black uppercase leading-none tracking-tighter text-white/[0.035]"
        aria-hidden
      >
        SIGNAL
      </p>

      <div className="relative border-y border-line py-16 sm:py-24">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">07 — Contact</p>

        <h2 className="max-w-4xl font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[0.04em] text-white">
          {title}
        </h2>

        <p className="mt-8 max-w-xl border-l border-gold/50 pl-5 font-inter text-[1rem] font-light leading-8 text-[#b8b8b8]">
          {subtitle}
        </p>

        <div className="mt-14 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <a
            href={mailto}
            className="group inline-flex w-fit items-center gap-4 bg-gold px-10 py-5 font-display text-sm font-bold uppercase tracking-[0.16em] text-void transition hover:bg-white"
          >
            {button}
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>

          <ul className="flex flex-wrap gap-x-10 gap-y-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
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

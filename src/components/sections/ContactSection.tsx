'use client'

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'
import type { ContactLinks } from '@/lib/api'

interface ContactSectionProps {
  title: string
  subtitle: string
  button: string
  contacts: ContactLinks
}

export function ContactSection({ title, subtitle, button, contacts }: ContactSectionProps) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  const mailto = contacts.email
    ? `mailto:${contacts.email}?subject=Genesis%20Signal`
    : '#team'

  return (
    <section id="contact" ref={ref} className="mt-32 scroll-mt-24 pb-24 sm:mt-40">
      <div className="glass-card flex flex-col items-center text-center">
        <h2 className="mb-4 font-display text-4xl italic text-white sm:text-5xl">{title}</h2>
        <p className="mb-8 max-w-lg text-sm font-light text-[#888]">{subtitle}</p>
        <a
          href={mailto}
          className="contact-btn rounded-full bg-white px-12 py-5 font-sans text-base font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          {button}
        </a>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[2px] text-[#666]">
          {contacts.telegram && (
            <a href={contacts.telegram} className="hover:text-white" target="_blank" rel="noreferrer">
              Telegram
            </a>
          )}
          {contacts.linkedin && (
            <a href={contacts.linkedin} className="hover:text-white" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {contacts.github && (
            <a href={contacts.github} className="hover:text-white" target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {contacts.email && (
            <a href={`mailto:${contacts.email}`} className="hover:text-white">
              Email
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

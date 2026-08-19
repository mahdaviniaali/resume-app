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
  const { ref, visible } = useInView<HTMLElement>()

  const mailto = contacts.email
    ? `mailto:${contacts.email}?subject=Genesis%20Signal`
    : '#team'

  return (
    <section id="contact" ref={ref} className="mt-32 scroll-mt-24 pb-24 sm:mt-40">
      <div
        className={`glass-card relative flex flex-col items-center overflow-hidden text-center void-shard ${
          visible ? 'is-on' : ''
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: visible
              ? 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.16), transparent 55%)'
              : 'none',
            transition: 'background 1s ease',
          }}
          aria-hidden
        />
        <div
          className="mb-6 h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            transform: visible ? 'scaleX(1)' : 'scaleX(0.2)',
            opacity: visible ? 1 : 0.3,
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
          aria-hidden
        />
        <h2 className="relative mb-4 font-display text-4xl italic text-white sm:text-5xl">{title}</h2>
        <p className="relative mb-8 max-w-lg text-sm text-[#bdbdbd]">{subtitle}</p>
        <a
          href={mailto}
          className="contact-btn relative rounded-full bg-white px-12 py-5 font-sans text-base font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          {button}
        </a>
        <div className="relative mt-10 flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[2px] text-[#8a8a8a]">
          {contacts.telegram && (
            <a href={contacts.telegram} className="hover:text-white" target="_blank" rel="noreferrer">
              تلگرام
            </a>
          )}
          {contacts.linkedin && (
            <a href={contacts.linkedin} className="hover:text-white" target="_blank" rel="noreferrer">
              لینکدین
            </a>
          )}
          {contacts.github && (
            <a href={contacts.github} className="hover:text-white" target="_blank" rel="noreferrer">
              گیت‌هاب
            </a>
          )}
          {contacts.email && (
            <a href={`mailto:${contacts.email}`} className="hover:text-white">
              ایمیل
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

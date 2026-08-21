'use client'

import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { workFocus } from '@/data/workContent'

/** Thin horizontal band — not a vertical list; cases live on /work */
export function SelectedWorkSection() {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.25 })

  return (
    <section id="work" className="scroll-mt-24" ref={ref}>
      <div className="work-slim-head">
        <div className="work-slim-brand">
          <span className="work-slim-prompt">&gt;_</span>
          <span className="work-slim-idx">05</span>
          <h2 className="work-slim-title">Work we’ve done</h2>
        </div>
        <Link href="/work" className="work-all-link">
          Case list →
        </Link>
      </div>

      <div className={`work-band ${visible ? 'is-live' : ''}`}>
        <div className="work-band-wash" aria-hidden />
        <div className="work-band-line" aria-hidden />

        <ul className="work-band-rail">
          {workFocus.map((item, i) => (
            <li
              key={item.id}
              className="work-band-cell"
              style={{ ['--i' as string]: i }}
            >
              <span className="work-band-mark" aria-hidden />
              <p className="work-band-label">{item.label}</p>
              <p className="work-band-blurb">{item.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

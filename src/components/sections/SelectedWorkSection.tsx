'use client'

import Link from 'next/link'
import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { workFocus, workHome } from '@/data/workContent'

/** Open focus field — what we’ve shipped, cases live on /work */
export function SelectedWorkSection() {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.22 })

  return (
    <section id="work" className="scroll-mt-24" ref={ref}>
      <div className="work-head-row">
        <SectionHeader
          index="04"
          kicker={workHome.subtitle}
          title={workHome.title}
          lead={workHome.lead}
        />
        <Link href="/work" className="work-all-link">
          Case list →
        </Link>
      </div>

      <div className={`work-field ${visible ? 'is-live' : ''}`}>
        <div className="work-field-spine" aria-hidden />

        <ul className="work-field-rail">
          {workFocus.map((item, i) => (
            <li
              key={item.id}
              className="work-field-cell"
              style={{ ['--i' as string]: i }}
            >
              <span className="work-field-mark" aria-hidden />
              <p className="work-field-idx">{String(i + 1).padStart(2, '0')}</p>
              <p className="work-field-label">{item.label}</p>
              <p className="work-field-blurb">{item.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

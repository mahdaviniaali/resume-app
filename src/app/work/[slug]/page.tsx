import { notFound } from 'next/navigation'
import { getWorkCase, workCases } from '@/data/workContent'
import { WorkCaseView } from '@/components/work/WorkCaseView'

export function generateStaticParams() {
  return workCases.map((c) => ({ slug: c.slug }))
}

export default function WorkCasePage({ params }: { params: { slug: string } }) {
  const workCase = getWorkCase(params.slug)
  if (!workCase) notFound()

  return <WorkCaseView workCase={workCase} />
}

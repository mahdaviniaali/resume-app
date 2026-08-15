'use client'

import { GlassCard } from './GlassCard'

export function BentoGrid() {
  return (
    <div className="mt-40 grid grid-cols-1 gap-6 sm:grid-cols-4">
      <GlassCard
        className="sm:col-span-2"
        icon="01 // MULTI-TENANT"
        title="SaaS Ecosystems"
        description="Infinite realms, one foundation. We architect isolated, secure, and flawless infrastructures designed for absolute scale."
      />

      <GlassCard
        icon="02 // DDD"
        title="System Arch"
        description="Imposing order upon chaos. Pure, scalable contexts."
      />

      <GlassCard
        icon="03 // ENG"
        title="Product-minded"
        description="Code with a pulse. Every line is product-driven."
      />

      <GlassCard
        className="sm:col-span-2"
        icon="LOGIC_CORE // PYTHON & DJANGO"
        title="Business Logic"
        description="Sculpting complex logic and multi-tenant architectures with battle-tested rapidity."
        code={`def create_reality(req):
    if req.void.is_empty:
        return Architect.build(SaaS())`}
      />

      <GlassCard
        className="sm:col-span-2"
        icon="SYSTEM_CORE // RUST ASYNC"
        title="High-Performance"
        description="Conquering system bounds with zero-cost abstractions. Where memory and speed are critical."
        code={`async fn illuminate(s: &mut Void) {
    s.extract_truth().await;
    Light::from(s)
}`}
      />

      <GlassCard
        className="flex flex-col items-center justify-center text-center sm:col-span-4"
        title="Let's weave the light."
        isContact
      />
    </div>
  )
}

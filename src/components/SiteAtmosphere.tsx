export function SiteAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <div className="site-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  )
}

export function SiteAtmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 55%, #000 92%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 55%, #000 92%)',
      }}
      aria-hidden
    >
      <div className="site-grid absolute inset-0 opacity-[0.32]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 42% at 50% 120%, rgba(212,175,55,0.08) 0%, transparent 52%)',
        }}
      />
      <div className="site-noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  )
}

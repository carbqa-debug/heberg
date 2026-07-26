import { IconHex, IconBadge, IconChart, IconRecycle, IconBolt, IconLeaf } from './icons'

const CERTS = [
  { label: 'ISO 14064', icon: IconHex },
  { label: 'CBAM Compliant', icon: IconBadge, iconProps: { label: 'EU' } },
  { label: 'IFRS S2', icon: IconChart },
  { label: 'GHG Protocol', icon: IconRecycle },
  { label: 'QRDI Partner', icon: IconBadge, iconProps: { label: 'QA' }, color: 'var(--color-qatar)' },
  { label: 'ATEX Certified', icon: IconBolt },
  { label: 'Qatar Vision 2030', icon: IconLeaf, color: 'var(--color-qatar)' },
]

const LOOP = [...CERTS, ...CERTS]

export default function CertMarquee() {
  return (
    <section className="bg-[var(--color-bg-secondary)] border-y border-[var(--color-border)] py-8 overflow-hidden">
      <p
        className="text-center text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-[var(--color-primary)] uppercase mb-6 px-6"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Built to the standards Gulf industry already trusts
      </p>
      <div className="relative">
        <div className="flex marquee-track w-max">
          {LOOP.map((c, i) => (
            <CertBadge key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertBadge({ label, icon: Icon, iconProps, color = 'var(--color-primary)' }: { label: string; icon: any; iconProps?: Record<string, unknown>; color?: string }) {
  return (
    <div
      className="flex items-center gap-2.5 mx-8 shrink-0 bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-2.5 rounded-full shadow-sm"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <span className="flex items-center" style={{ color }}>
        {iconProps ? <Icon {...iconProps} size={17} color={color} /> : <Icon size={17} strokeWidth={1.7} />}
      </span>
      <span className="text-[12px] font-semibold text-[var(--color-text-primary)] whitespace-nowrap">{label}</span>
    </div>
  )
}

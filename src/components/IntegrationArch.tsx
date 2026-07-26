import { useInView } from '../hooks/useInView'

const NODES = [
  {
    group: 'Data Sources',
    color: 'var(--color-text-secondary)',
    bg: 'var(--color-bg-secondary)',
    items: ['Plant Sensors', 'SCADA / DCS', 'ERP / SAP', 'Satellite Feeds', 'Manual Entry'],
  },
  {
    group: 'Carbon Intelligence Core',
    color: 'var(--color-primary)',
    bg: 'var(--color-tint-teal)',
    items: ['Digital Twin Engine', 'AI Anomaly Detection', 'Scope 1-2-3 Ledger', 'Baseline Calculator'],
  },
  {
    group: 'Output Engines',
    color: 'var(--color-lime)',
    bg: 'var(--color-tint-lime)',
    items: ['Capture Optimizer', 'Compliance Suite', 'API Gateway', 'Dashboards'],
  },
  {
    group: 'Stakeholders',
    color: 'var(--color-violet)',
    bg: 'var(--color-tint-violet)',
    items: ['Regulators', 'Auditors', 'Board / CFO', 'EU Buyers'],
  },
]

export default function IntegrationArch() {
  const { ref, visible } = useInView(0.2)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-14 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>
            Integration Architecture
          </span>
          <h2 className="text-[38px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Everything Connects.{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">Nothing Slips Through.</em>
          </h2>
        </div>

        {/* Architecture flow */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {NODES.map((node, i) => (
            <div key={node.group} className={`flex items-stretch flex-1 fade-up ${visible ? 'visible' : ''} stagger-${i + 1}`}>
              {/* Node card */}
              <div
                className="flex-1 rounded-2xl p-6 border"
                style={{ background: node.bg, borderColor: `color-mix(in srgb, ${node.color} 30%, transparent)` }}
              >
                <div
                  className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4"
                  style={{ color: node.color, fontFamily: 'var(--font-body)' }}
                >
                  {node.group}
                </div>
                <ul className="space-y-2.5">
                  {node.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: node.color }} />
                      <span className="text-[13px] text-[var(--color-text-primary)] font-medium" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow connector */}
              {i < NODES.length - 1 && (
                <div className="hidden lg:flex items-center px-2 shrink-0">
                  <svg width="32" height="24" fill="none">
                    <path d="M2 12h24M20 6l8 6-8 6" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray="28" strokeDashoffset={visible ? '0' : '28'}
                      style={{ transition: `stroke-dashoffset 0.8s ease ${i * 0.2}s` }}
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

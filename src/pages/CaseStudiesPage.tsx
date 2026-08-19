import { useState } from 'react'
import FinalCTA from '../components/FinalCTA'
import { useInView } from '../hooks/useInView'
import { CASE_STUDIES, localizeCaseStudy } from '../data/caseStudies'
import { IconFactory, IconFlask, IconBuilding, IconBolt } from '../components/icons'
import { useLang } from '../i18n/LanguageContext'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const ICONS = [IconFactory, IconFlask, IconBuilding, IconBolt]

export default function CaseStudiesPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const { ref, visible } = useInView(0.1)
  const { t, lang } = useLang()
  const caseStudies = CASE_STUDIES.map(c => localizeCaseStudy(c, lang))

  useDocumentMeta(
    'Case Studies | Real Results from Industrial Operators | Photocarb',
    'Proof from the field — see how industrial and commercial sites cut emissions, passed CBAM audits, and turned carbon data into measurable savings with Photocarb.',
  )

  return (
    <>
      <section className="pt-32 pb-20 bg-[var(--color-bg)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-5 block" style={{ fontFamily: 'var(--font-body)' }}>
            — {t('page.caseStudies.eyebrow')}
          </span>
          <h1 className="text-[52px] lg:text-[68px] leading-[1.04] text-[var(--color-text-primary)] mb-6 max-w-[820px]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
            {t('csPage.title')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('csPage.titleAccent')}</em>
          </h1>
        </div>
      </section>

      {/* Card grid */}
      <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-8">
          {caseStudies.map((cs, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <div
                key={cs.id}
                className={`fade-up ${visible ? 'visible' : ''} stagger-${i + 1} bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden card-hover cursor-pointer`}
                onClick={() => setExpanded(expanded === cs.id ? null : cs.id)}
              >
                {/* Header block — real facility photo with a color-tinted gradient behind the title */}
                <div className="relative h-[210px] overflow-hidden">
                  <img src={cs.img} alt={cs.imgAlt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${cs.color} 15%, transparent) 0%, color-mix(in srgb, ${cs.color} 35%, black) 60%, color-mix(in srgb, ${cs.color} 55%, black) 100%)` }}
                  />
                  <div className="relative h-full p-7 pb-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm"
                        style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
                      >
                        <Icon size={22} strokeWidth={1.6} />
                      </div>
                      <span
                        className="text-[10.5px] font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full backdrop-blur-sm"
                        style={{ color: 'white', background: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-body)' }}
                      >
                        {cs.industry}
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold tracking-wide uppercase mb-1 text-white/80" style={{ fontFamily: 'var(--font-body)' }}>{cs.location}</div>
                      <h2 className="text-[22px] font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{cs.org}</h2>
                    </div>
                  </div>
                </div>

                <div className="p-7">
                  {/* Metrics row */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {cs.metrics.map(m => (
                      <div key={m.label} className="bg-[var(--color-bg-secondary)] rounded-xl p-3">
                        <div className="text-[20px] font-bold" style={{ color: cs.color, fontFamily: 'var(--font-display)' }}>{m.value}</div>
                        <div className="text-[11px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: cs.color, fontFamily: 'var(--font-body)' }}>
                    {expanded === cs.id ? t('csPage.hideDetails') : t('csPage.readFullArrow')}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Expanded detail view */}
      {expanded && (() => {
        const cs = caseStudies.find(c => c.id === expanded)!
        return (
          <section className="bg-[var(--color-bg)] py-16" style={{ animation: 'fade-up 0.4s ease both' }}>
            <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
              <h2 className="text-[36px] font-bold text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>{cs.org}</h2>
              <div className="flex flex-wrap gap-2 mb-10">
                {cs.chips.map(chip => (
                  <span
                    key={chip}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
                    style={{ color: cs.color, background: `color-mix(in srgb, ${cs.color} 12%, transparent)`, fontFamily: 'var(--font-body)' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-12">
                {[
                  { label: t('csPage.challenge'), text: cs.challenge, accent: 'var(--color-neutral-400)' },
                  { label: t('csPage.solution'), text: cs.solution, accent: cs.color },
                ].map(col => (
                  <div key={col.label} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: col.accent, fontFamily: 'var(--font-body)' }}>{col.label}</div>
                    <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{col.text}</p>
                  </div>
                ))}
              </div>

              <div className="mb-12">
                <h3 className="text-[18px] font-semibold text-[var(--color-text-primary)] mb-5" style={{ fontFamily: 'var(--font-display)' }}>{t('csPage.results')}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cs.metrics.map(m => (
                    <div key={m.label} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5">
                      <div className="text-[28px] font-bold leading-none mb-2" style={{ color: cs.color, fontFamily: 'var(--font-display)' }}>{m.value}</div>
                      <div className="text-[12.5px] font-semibold text-[var(--color-text-primary)] mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>{m.label}</div>
                      {m.sub && <div className="text-[11px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{m.sub}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div
                className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] p-10 text-center"
                style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${cs.color} 10%, transparent), var(--color-surface) 60%)` }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
                  <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const col = i % 8
                      const row = Math.floor(i / 8)
                      const ox = col * 100 + (row % 2) * 50
                      const oy = row * 86
                      return (
                        <polygon
                          key={i}
                          points={`${ox+50},${oy} ${ox+100},${oy+28} ${ox+100},${oy+72} ${ox+50},${oy+100} ${ox},${oy+72} ${ox},${oy+28}`}
                          fill="none" stroke={cs.color} strokeWidth="1"
                        />
                      )
                    })}
                  </svg>
                </div>
                <div className="relative">
                  <div className="text-[56px] opacity-40 mb-3" style={{ color: cs.color, fontFamily: 'var(--font-display)' }}>"</div>
                  <blockquote className="text-[22px] text-[var(--color-text-primary)] font-semibold italic leading-snug mb-6 max-w-[640px] mx-auto" style={{ fontFamily: 'var(--font-display)' }}>
                    {cs.quote}
                  </blockquote>
                  <div className="text-[var(--color-text-secondary)] text-[13px]" style={{ fontFamily: 'var(--font-body)' }}>{cs.author}</div>
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      <FinalCTA />
    </>
  )
}

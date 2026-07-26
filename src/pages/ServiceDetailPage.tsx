import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SERVICES, SERVICE_DELIVERY_STEPS, SERVICE_DELIVERY_STEPS_AR, getServiceById, localizeService } from '../data/services'
import CBAMCalculator from '../components/CBAMCalculator'
import EsgScoreCalculator from '../components/EsgScoreCalculator'
import SupplyChainMapper from '../components/SupplyChainMapper'
import LcaQuickScan from '../components/LcaQuickScan'
import MetricEstimator from '../components/MetricEstimator'
import ChecklistScorer from '../components/ChecklistScorer'
import ScenarioSimulator from '../components/ScenarioSimulator'
import FinalCTA from '../components/FinalCTA'
import CertMarquee from '../components/CertMarquee'
import { IconCheckCircle, IconClock, IconBuilding } from '../components/icons'
import { useLang } from '../i18n/LanguageContext'

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, lang } = useLang()
  const base = slug ? getServiceById(slug) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!base) return <Navigate to="/services" replace />

  const s = localizeService(base, lang)
  const Icon = s.icon
  const related = SERVICES.filter(x => x.id !== s.id).slice(0, 3).map(x => localizeService(x, lang))
  const deliverySteps = lang === 'ar' ? SERVICE_DELIVERY_STEPS_AR : SERVICE_DELIVERY_STEPS

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-[var(--color-bg)] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle at 80% 30%, color-mix(in srgb, ${s.color} 8%, transparent) 0%, transparent 60%)` }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-6 text-[13px]" style={{ fontFamily: 'var(--font-body)' }}>
            <Link to="/services" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Services</Link>
            <span className="text-[var(--color-border)]">/</span>
            <span style={{ color: s.color }} className="font-semibold">{s.title}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-center">
            {/* Left — headline + description + CTA */}
            <div className="max-w-[720px]">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 hexagon-clip flex items-center justify-center" style={{ background: `color-mix(in srgb, ${s.color} 16%, transparent)`, color: s.color }}>
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: s.color, fontFamily: 'var(--font-body)' }}>
                  {s.num} — {s.subtitle}
                </span>
              </div>
              <h1 className="text-[42px] lg:text-[56px] leading-[1.06] text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
                {s.title}
              </h1>
              <p className="text-[17px] leading-relaxed text-[var(--color-text-secondary)] mb-8" style={{ fontFamily: 'var(--font-body)' }}>{s.description}</p>

              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full transition-opacity duration-200 text-[15px] hover:opacity-90"
                  style={{ background: s.color, fontFamily: 'var(--font-body)' }}
                >
                  {t('common.getStartedArrow')}
                  <svg className="rtl-flip" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </Link>
                <div className="flex flex-wrap gap-2">
                  {s.industries.map(ind => (
                    <span key={ind} className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — key value highlights */}
            <div className="flex flex-col gap-3.5">
              {s.heroHighlights.map((h, i) => (
                <div
                  key={h.label}
                  className="fade-up visible rounded-2xl border p-5 bg-[var(--color-surface)]"
                  style={{
                    borderColor: `color-mix(in srgb, ${s.color} 22%, transparent)`,
                    boxShadow: 'var(--shadow-card)',
                    animationDelay: `${i * 90}ms`,
                  }}
                >
                  <div className="text-[30px] font-bold leading-none mb-1.5" style={{ color: s.color, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                    {h.value}
                  </div>
                  <div className="text-[13px] text-[var(--color-text-secondary)] leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CertMarquee />

      {/* Methodology & standards */}
      <section className="bg-[var(--color-bg)] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[340px_1fr] gap-10">
            <div>
              <div className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                {t('sd.methodology')}
              </div>
              <h2 className="text-[28px] leading-tight text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                {t('sd.methodologyTitle')}
              </h2>
              <span
                className="inline-flex items-center text-[12.5px] font-semibold px-3.5 py-2 rounded-full"
                style={{ color: s.color, background: `color-mix(in srgb, ${s.color} 12%, transparent)`, fontFamily: 'var(--font-body)' }}
              >
                {s.methodologyStandard}
              </span>
            </div>
            <div className="space-y-4">
              {s.methodologySteps.map((step, i) => (
                <div key={step} className="flex items-start gap-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5">
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold"
                    style={{ background: `color-mix(in srgb, ${s.color} 14%, transparent)`, color: s.color, fontFamily: 'var(--font-display)' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed pt-1" style={{ fontFamily: 'var(--font-body)' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-[var(--color-bg-secondary)] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-8" style={{ fontFamily: 'var(--font-body)' }}>
            {t('sd.coreCapabilities')}
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {s.capabilities.map(c => (
              <div key={c.title} className="card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `color-mix(in srgb, ${s.color} 13%, transparent)`, color: s.color }}>
                  <c.icon size={19} strokeWidth={1.7} />
                </div>
                <div className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>{c.title}</div>
                <div className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll gain */}
      <section className="bg-[var(--color-bg)] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[340px_1fr] gap-10">
            <div>
              <div className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                {t('sd.whatYouGain')}
              </div>
              <h2 className="text-[28px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                {t('sd.gainsTitle')}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {s.gains.map(gain => (
                <div key={gain} className="flex items-start gap-3">
                  <IconCheckCircle size={19} strokeWidth={1.7} style={{ color: s.color }} className="shrink-0 mt-0.5" />
                  <p className="text-[14px] text-[var(--color-text-primary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{gain}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mini-app */}
      <CalculatorSection service={s} />

      {/* Time to ready + who it's for */}
      <section className="bg-[var(--color-bg)] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 mb-12">
            <div
              className="rounded-3xl p-8 flex flex-col justify-center"
              style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${s.color} 12%, transparent), var(--color-surface) 65%)` }}
            >
              <IconClock size={26} strokeWidth={1.6} style={{ color: s.color }} className="mb-4" />
              <div className="text-[12px] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: s.color, fontFamily: 'var(--font-body)' }}>{t('sd.timeToReadyLabel')}</div>
              <p className="text-[15px] text-[var(--color-text-primary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{s.timeToReady}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <IconBuilding size={18} strokeWidth={1.7} style={{ color: s.color }} />
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: s.color, fontFamily: 'var(--font-body)' }}>{t('sd.whoFor')}</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {s.clients.map(c => (
                  <div key={c.type} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5">
                    <div className="text-[14px] font-semibold text-[var(--color-text-primary)] mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>{c.type}</div>
                    <div className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery steps */}
      <section className="bg-[var(--color-bg-secondary)] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: s.color, fontFamily: 'var(--font-body)' }}>{t('sd.howItWorks')}</span>
            <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {t('sd.howDelivers').replace('{title}', s.title)}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliverySteps.map((step, i) => (
              <div key={step} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
                <span className="text-[24px] font-bold gradient-numeral" style={{ fontFamily: 'var(--font-display)' }}>{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-3 text-[13.5px] font-medium text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-[var(--color-bg)] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-8" style={{ fontFamily: 'var(--font-body)' }}>
            {t('sd.relatedServices')}
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map(r => {
              const RIcon = r.icon
              return (
                <Link
                  key={r.id}
                  to={`/services/${r.id}`}
                  className="group card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 no-underline flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in srgb, ${r.color} 13%, transparent)`, color: r.color }}>
                    <RIcon size={19} strokeWidth={1.7} />
                  </div>
                  <div className="text-[15px] font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{r.title}</div>
                  <div className="text-[13px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{r.valueProp}</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}

function CalculatorSection({ service: s }: { service: typeof SERVICES[0] }) {
  const cfg = s.calculator
  const { t } = useLang()

  if (cfg.kind === 'cbam') {
    return <CBAMCalculator />
  }

  if (cfg.kind === 'esg') {
    return <EsgScoreCalculator />
  }

  if (cfg.kind === 'supplychain') {
    return <SupplyChainMapper />
  }

  if (cfg.kind === 'lca-scan') {
    return <LcaQuickScan />
  }

  return (
    <section className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: s.color, fontFamily: 'var(--font-body)' }}>{t('sd.tryItYourself')}</span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('sd.seeInAction').replace('{title}', s.title)}
          </h2>
        </div>
        <div className="max-w-[520px] mx-auto">
          {cfg.kind === 'metric' && (
            <MetricEstimator
              color={s.color}
              icon={s.icon}
              title={`${s.title} ${t('sd.estimator')}`}
              fields={cfg.fields}
              compute={cfg.compute}
              resultLabel={cfg.resultLabel}
              resultPrefix={cfg.resultPrefix}
              resultSuffix={cfg.resultSuffix}
              assumption={cfg.assumption}
            />
          )}
          {cfg.kind === 'checklist' && (
            <ChecklistScorer
              color={s.color}
              icon={s.icon}
              title={`${s.title} Readiness`}
              prompt={cfg.prompt}
              items={cfg.items}
              unit={cfg.unit}
              withPhotocarbNote={cfg.withPhotocarbNote}
            />
          )}
          {cfg.kind === 'scenario' && (
            <ScenarioSimulator
              color={s.color}
              icon={s.icon}
              title="What-If Scenario Modeling"
              scenarios={cfg.scenarios}
            />
          )}
        </div>
      </div>
    </section>
  )
}

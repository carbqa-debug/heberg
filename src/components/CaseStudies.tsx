import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { CASE_STUDIES, localizeCaseStudy } from '../data/caseStudies'
import { IconFactory, IconFlask, IconBuilding, IconBolt } from './icons'
import { useLang } from '../i18n/LanguageContext'

const ICONS = [IconFactory, IconFlask, IconBuilding, IconBolt]

export default function CaseStudies() {
  const { ref, visible } = useInView(0.15)
  const { t, lang } = useLang()
  const featured = CASE_STUDIES.slice(0, 3).map(c => localizeCaseStudy(c, lang))

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`mb-16 flex items-end justify-between flex-wrap gap-4 fade-up ${visible ? 'visible' : ''}`}>
          <div>
            <span
              className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('caseStudies.eyebrow')}
            </span>
            <h2
              className="text-[44px] leading-[1.08] text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              {t('caseStudies.title')}{' '}
              <em className="italic font-normal text-[var(--color-text-secondary)]">{t('caseStudies.titleAccent')}</em>
            </h2>
          </div>
          <Link to="/case-studies" className="link-arrow text-[14px] font-semibold text-[var(--color-primary)]">
            {t('caseStudies.viewAll')}
            <svg className="rtl-flip" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {featured.map((c, i) => (
            <CaseCard key={c.id} cs={c} Icon={ICONS[i % ICONS.length]} delay={i * 0.12} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ cs, Icon, delay, visible }: { cs: typeof CASE_STUDIES[0]; Icon: typeof IconFactory; delay: number; visible: boolean }) {
  const { t } = useLang()
  return (
    <div
      className={`fade-up ${visible ? 'visible' : ''} card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden flex flex-col`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Header block — real facility photo with a color-tinted gradient behind the title */}
      <div className="relative h-[190px] overflow-hidden">
        <img src={cs.img} alt={cs.imgAlt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${cs.color} 15%, transparent) 0%, color-mix(in srgb, ${cs.color} 35%, black) 60%, color-mix(in srgb, ${cs.color} 55%, black) 100%)` }}
        />
        <div className="relative h-full p-6 pb-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
            >
              <Icon size={20} strokeWidth={1.6} />
            </div>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{ color: 'white', background: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-body)' }}
            >
              {cs.industry}
            </span>
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-1 text-white/80" style={{ fontFamily: 'var(--font-body)' }}>{cs.location}</div>
            <h3 className="text-[19px] font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{cs.org}</h3>
          </div>
        </div>
      </div>

      {/* Top metric */}
      <div className="px-6 py-4 border-y border-[var(--color-border)] flex items-center gap-3">
        <div className="text-[26px] font-bold leading-none" style={{ color: cs.color, fontFamily: 'var(--font-display)' }}>{cs.metrics[0].value}</div>
        <div className="text-[12px] text-[var(--color-text-secondary)] leading-tight" style={{ fontFamily: 'var(--font-body)' }}>{cs.metrics[0].label}</div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-[13.5px] leading-relaxed text-[var(--color-text-secondary)] mb-5 flex-1" style={{ fontFamily: 'var(--font-body)' }}>
          {cs.challenge.split('.').slice(0, 2).join('.') + '.'}
        </p>
        <Link
          to="/case-studies"
          className="link-arrow text-[13px] font-semibold"
          style={{ color: cs.color, fontFamily: 'var(--font-body)' }}
        >
          {t('caseStudies.readFull')}
          <svg className="rtl-flip" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
        </Link>
      </div>
    </div>
  )
}

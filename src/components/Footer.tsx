import { Link } from 'react-router-dom'
import PhotoCarbLogo from './PhotoCarbLogo'
import { SERVICES, localizeService, getServiceById } from '../data/services'
import { QatarFlag, TunisiaFlag } from './Flags'
import { IconMail, IconPhone } from './icons'
import { useLang } from '../i18n/LanguageContext'

const COLS = [
  {
    titleKey: 'footer.solutions',
    links: SERVICES.map(s => ({ serviceId: s.id, to: `/services/${s.id}` })),
  },
  {
    titleKey: 'footer.company',
    links: [
      { labelKey: 'footer.aboutUs', to: '/about' },
      { labelKey: 'footer.technology', to: '/technology' },
      { labelKey: 'footer.caseStudies', to: '/case-studies' },
      { labelKey: 'footer.blog', to: '#' },
      { labelKey: 'footer.careers', to: '#' },
      { labelKey: 'footer.press', to: '#' },
    ],
  },
  {
    titleKey: 'footer.legal',
    links: [
      { labelKey: 'footer.privacy', to: '/legal/privacy-policy' },
      { labelKey: 'footer.terms', to: '/legal/terms-of-service' },
      { labelKey: 'footer.dpa', to: '/legal/data-processing-agreement' },
      { labelKey: 'footer.cookie', to: '/legal/cookie-policy' },
    ],
  },
] as const

const CONTACT = [
  {
    Flag: QatarFlag,
    cityKey: 'contact.doha',
    labelKey: 'footer.headquarters',
    addressKey: 'footer.qatarAddress',
    email: 'hello@photocarb.qa',
    phone: '+974 4000 0000',
    color: 'var(--color-qatar)',
  },
  {
    Flag: TunisiaFlag,
    cityKey: 'contact.sousse',
    labelKey: 'footer.engineeringCentre',
    addressKey: 'footer.tunisiaAddress',
    email: 'engineering@photocarb.com',
    phone: '+216 70 000 000',
    color: 'var(--color-tunisia)',
  },
]

const CERTS = ['ISO 14064', 'CBAM', 'IFRS S2', 'GHG Protocol', 'QRDI', 'Qatar Vision 2030']

export default function Footer() {
  const { t, lang } = useLang()
  return (
    <footer className="relative bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] overflow-hidden">
      {/* Decorative gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, transparent 45%), radial-gradient(circle at 88% 10%, color-mix(in srgb, var(--color-violet) 6%, transparent) 0%, transparent 40%)' }}
      />
      <div
        className="h-[3px] relative"
        style={{ background: 'linear-gradient(90deg, var(--color-qatar) 0%, var(--color-primary) 33%, var(--color-lime) 66%, var(--color-tunisia) 100%)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-8 relative">
        {/* 4-column main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand + tagline */}
          <div>
            <div className="mb-5">
              <PhotoCarbLogo markSize={38} />
            </div>
            <p
              className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('footer.tagline')}
            </p>
            <div className="flex gap-2.5">
              {['LinkedIn', 'Twitter', 'Email'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="text-[11px] font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col, ci) => (
            <div key={col.titleKey}>
              <h4
                className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-5"
                style={{ fontFamily: 'var(--font-body)', color: ['var(--color-primary)', 'var(--color-violet)', 'var(--color-info)'][ci] }}
              >
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(l => {
                  const label =
                    'labelKey' in l ? t(l.labelKey)
                    : getServiceById(l.serviceId) ? localizeService(getServiceById(l.serviceId)!, lang).title : l.serviceId
                  return (
                    <li key={l.to + label}>
                      {l.to.startsWith('/') ? (
                        <Link
                          to={l.to}
                          className="nav-link-underline text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {label}
                        </Link>
                      ) : (
                        <a
                          href={l.to}
                          className="nav-link-underline text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact block */}
        <div className="border-t border-[var(--color-border)] pt-10 mb-10">
          <h4
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)] mb-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('footer.contact')}
          </h4>
          <div className="grid sm:grid-cols-2 gap-5">
            {CONTACT.map(office => (
              <div
                key={office.cityKey}
                className="card-hover rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <office.Flag width={22} height={16} />
                  <span
                    className="text-[11px] font-semibold tracking-[0.15em] uppercase"
                    style={{ fontFamily: 'var(--font-body)', color: office.color }}
                  >
                    {t(office.labelKey)}
                  </span>
                  <span className="text-[var(--color-border)]">·</span>
                  <span
                    className="text-[14px] font-semibold text-[var(--color-text-primary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t(office.cityKey)}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                  {t(office.addressKey)}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <a dir="ltr" href={`mailto:${office.email}`} className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'var(--font-body)', unicodeBidi: 'isolate' }}>
                    <IconMail size={13} strokeWidth={1.8} />
                    {office.email}
                  </a>
                  <a dir="ltr" href={`tel:${office.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'var(--font-body)', unicodeBidi: 'isolate' }}>
                    <IconPhone size={13} strokeWidth={1.8} />
                    {office.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification badges */}
        <div className="border-t border-[var(--color-border)] pt-8 mb-8">
          <p
            className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-[0.18em] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('footer.standards')}
          </p>
          <div className="flex flex-wrap gap-2">
            {CERTS.map(c => (
              <span
                key={c}
                className="text-[10px] font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 rounded-full"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p
            className="text-[12px] text-[var(--color-text-secondary)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('footer.rights')}
          </p>
          <p
            className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <QatarFlag width={16} height={11} /> {t('contact.doha')}، {t('contact.qatar')} · <TunisiaFlag width={16} height={11} /> {t('contact.sousse')}، {t('contact.tunisia')}
          </p>
        </div>
      </div>
    </footer>
  )
}

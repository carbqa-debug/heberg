import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useLang } from '../i18n/LanguageContext'
import { IconNetwork } from './icons'

/**
 * Drop a logo file at /public/images/partners/{slug}.{ext} and it renders
 * automatically — falls back to a monogram badge until the real file exists.
 */
const PARTNERS: { name: string; slug: string; ext: string }[] = [
  { name: 'QSTP', slug: 'qstp', ext: 'png' },
  { name: 'Qatar Chamber', slug: 'qatar-chamber', ext: 'png' },
  { name: 'Ministry of Commerce and Industry', slug: 'moci', ext: 'png' },
  { name: 'IPTIC', slug: 'iptic', ext: 'png' },
  { name: 'RedStart', slug: 'redstart', ext: 'png' },
  { name: 'ISSTE', slug: 'isste', ext: 'png' },
  { name: 'University of Sousse', slug: 'university-of-sousse', ext: 'png' },
  { name: 'University della Calabria', slug: 'university-della-calabria', ext: 'png' },
  { name: 'PEESO', slug: 'peeso', ext: 'png' },
]

// Rendered twice so the marquee-scroll keyframe (translateX -50%) loops seamlessly
const LOOP = [...PARTNERS, ...PARTNERS]

function initials(name: string) {
  const words = name.split(' ').filter(w => w.length > 1 || /[A-Z]/.test(w))
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function PartnerCard({ name, slug, ext, hidden }: { name: string; slug: string; ext: string; hidden?: boolean }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    // Spacing lives on the wrapper (not a flex gap) so both halves of the loop are equal width
    <div className="shrink-0 px-3" aria-hidden={hidden || undefined}>
      <div
        className="group flex flex-col items-center justify-center gap-4 w-[240px] h-[190px] sm:w-[280px] sm:h-[210px] rounded-3xl px-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'color-mix(in srgb, var(--color-surface) 75%, transparent)',
          border: '1px solid color-mix(in srgb, var(--color-text-primary) 10%, transparent)',
          boxShadow: '0 2px 10px color-mix(in srgb, var(--color-text-primary) 6%, transparent)',
        }}
        title={name}
      >
        <div className="h-[96px] w-full flex items-center justify-center">
          {!failed && (
            <img
              src={`/images/partners/${slug}.${ext}`}
              alt={hidden ? '' : name}
              className="max-h-[96px] max-w-[200px] object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ display: loaded ? 'block' : 'none' }}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          )}
          {(failed || !loaded) && (
            <span
              className="h-20 w-20 rounded-full flex items-center justify-center text-[22px] font-bold"
              style={{ background: 'color-mix(in srgb, var(--color-primary) 14%, transparent)', color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
            >
              {initials(name)}
            </span>
          )}
        </div>

        <span className="text-[14px] font-semibold text-center leading-snug text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>
          {name}
        </span>
      </div>
    </div>
  )
}

export default function Partners() {
  const { ref, visible } = useInView(0.1)
  const { lang } = useLang()

  const L = lang === 'ar'
    ? {
        eyebrow: 'شركاؤنا',
        title: 'جزء من ',
        titleAccent: 'منظومة أوسع.',
        subtitle: 'من حاضنات الابتكار القطرية إلى الجامعات وغرف التجارة الإقليمية التي رافقت مسيرة فوتوكارب.',
      }
    : {
        eyebrow: 'Our Ecosystem',
        title: 'Part of a ',
        titleAccent: 'Wider Network.',
        subtitle: "From Qatari innovation bodies to regional universities and chambers of commerce that have supported Photocarb's journey.",
      }

  return (
    <section id="our-ecosystem" ref={ref as React.RefObject<HTMLElement>} className="relative overflow-hidden bg-[var(--color-bg)] py-24 scroll-mt-20">
      {/* Ambient color-blob background — distinct from the hex motif used elsewhere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full opacity-[0.10] blur-3xl" style={{ background: 'var(--color-primary)' }} />
        <div className="absolute top-10 -right-24 w-[380px] h-[380px] rounded-full opacity-[0.09] blur-3xl" style={{ background: 'var(--color-violet)' }} />
        <div className="absolute -bottom-28 left-1/3 w-[440px] h-[440px] rounded-full opacity-[0.08] blur-3xl" style={{ background: 'var(--color-lime)' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div className={`text-center mb-12 fade-up ${visible ? 'visible' : ''}`}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
            style={{ borderColor: 'color-mix(in srgb, var(--color-navy) 25%, transparent)', background: 'color-mix(in srgb, var(--color-navy) 6%, transparent)' }}
          >
            <IconNetwork size={13} strokeWidth={1.8} style={{ color: 'var(--color-navy)' }} />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-body)' }}>
              {L.eyebrow}
            </span>
          </span>
          <h2 className="text-[36px] lg:text-[42px] leading-tight text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {L.title}
            <span
              className="italic font-normal bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, var(--color-primary), var(--color-violet))' }}
            >
              {L.titleAccent}
            </span>
          </h2>
          <p className="text-[14.5px] text-[var(--color-text-secondary)] max-w-[600px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            {L.subtitle}
          </p>
        </div>
      </div>

      {/* Full-bleed horizontal marquee; edges fade out. Forced LTR so the loop math holds in Arabic too */}
      <div
        dir="ltr"
        className={`relative overflow-hidden fade-up ${visible ? 'visible' : ''}`}
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div className="flex w-max marquee-track py-2" style={{ animationDuration: '45s' }}>
          {LOOP.map((p, i) => (
            <PartnerCard key={i} name={p.name} slug={p.slug} ext={p.ext} hidden={i >= PARTNERS.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

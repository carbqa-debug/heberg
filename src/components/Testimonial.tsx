import { useInView } from '../hooks/useInView'
import { useLang } from '../i18n/LanguageContext'

export default function Testimonial() {
  const { ref, visible } = useInView(0.2)
  const { t } = useLang()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[var(--color-bg)] py-16"
    >
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        <div className={`relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] px-8 py-14 lg:px-16 lg:py-16 text-center fade-up ${visible ? 'visible' : ''}`}
          style={{ background: 'linear-gradient(160deg, var(--color-tint-teal), var(--color-surface) 55%)' }}
        >
          {/* Hex background pattern — kept from the original design, relit for the light theme */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.1]">
            <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {Array.from({ length: 40 }).map((_, i) => {
                const col = i % 8
                const row = Math.floor(i / 8)
                const ox = col * 100 + (row % 2) * 50
                const oy = row * 86
                return (
                  <polygon
                    key={i}
                    points={`${ox+50},${oy} ${ox+100},${oy+28} ${ox+100},${oy+72} ${ox+50},${oy+100} ${ox},${oy+72} ${ox},${oy+28}`}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="1"
                  />
                )
              })}
            </svg>
          </div>

          <div className="relative">
            {/* Quote mark */}
            <div
              className="text-[80px] leading-none text-[var(--color-primary)] opacity-30 mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              "
            </div>

            <blockquote
              className="text-[28px] lg:text-[36px] font-semibold text-[var(--color-text-primary)] leading-[1.25] mb-10"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
            >
              {t('testimonial.p1')}{' '}
              <em className="italic font-normal text-[var(--color-primary)]">{t('testimonial.em')}</em>{' '}
              {t('testimonial.p2')}
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center justify-center gap-5">
              {/* Portrait */}
              <div
                className="w-14 h-14 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center text-white text-xl font-bold shrink-0"
                style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
              >
                AH
              </div>
              <div className="text-start">
                <div
                  className="font-semibold text-[var(--color-text-primary)] text-[16px]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('testimonial.author')}
                </div>
                <div
                  className="text-[13px] text-[var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('testimonial.role')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

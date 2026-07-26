const WORDMARK_GRADIENT =
  'linear-gradient(90deg, var(--color-lime) 0%, var(--color-primary) 35%, var(--color-info) 65%, var(--color-violet) 100%)'

interface Props {
  markSize?: number
  showWordmark?: boolean
  wordmarkClassName?: string
  className?: string
}

/** Real Photocarb mark (public/images/logo.png) + gradient wordmark sampled from the logo's own colors. */
export default function PhotoCarbLogo({ markSize = 40, showWordmark = true, wordmarkClassName = '', className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo.png"
        alt="Photocarb"
        width={markSize}
        height={markSize}
        className="shrink-0 object-contain"
        style={{ width: markSize, height: markSize }}
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-bold text-[21px] tracking-tight bg-clip-text text-transparent ${wordmarkClassName}`}
            style={{ backgroundImage: WORDMARK_GRADIENT, fontFamily: 'var(--font-display)' }}
          >
            Photocarb
          </span>
          <span
            className="text-[9.5px] font-semibold uppercase tracking-[0.14em] mt-1"
            style={{ color: 'var(--color-info)', fontFamily: 'var(--font-body)' }}
          >
            Environmental Technology
          </span>
        </span>
      )}
    </span>
  )
}

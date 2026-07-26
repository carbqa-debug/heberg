interface FlagProps {
  width?: number
  height?: number
  className?: string
}

const W = 28
const H = 20

function qatarZigzagPath(bandWidth: number, teeth = 9) {
  const outerX = bandWidth + 4
  const step = H / teeth
  let d = `M0,0 L${bandWidth},0 `
  for (let i = 0; i < teeth; i++) {
    const yMid = step * i + step / 2
    const yEnd = step * (i + 1)
    d += `L${outerX},${yMid} L${bandWidth},${yEnd} `
  }
  d += `L0,${H} Z`
  return d
}

/** Simplified vector Qatar flag — maroon field, serrated white hoist band. */
export function QatarFlag({ width = W, height = H, className = '' }: FlagProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${W} ${H}`}
      className={`rounded-[3px] shadow-sm ${className}`}
      style={{ display: 'block' }}
      aria-label="Qatar flag"
      role="img"
    >
      <rect width={W} height={H} rx="2.5" fill="#8A1538" />
      <path d={qatarZigzagPath(8)} fill="white" />
      <rect width={W} height={H} rx="2.5" fill="none" stroke="black" strokeOpacity="0.08" />
    </svg>
  )
}

// Small red crescent + a bigger red star nested close to it, both inside the white disc.
const STAR_POINTS =
  '16.6,8.0 17.09,9.33 18.5,9.38 17.39,10.26 17.78,11.62 16.6,10.83 15.42,11.62 15.81,10.26 14.70,9.38 16.11,9.33'

/** Simplified vector Tunisia flag — red field, white disc, small red crescent and star (not a Turkish flag!). */
export function TunisiaFlag({ width = W, height = H, className = '' }: FlagProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${W} ${H}`}
      className={`rounded-[3px] shadow-sm ${className}`}
      style={{ display: 'block' }}
      aria-label="Tunisia flag"
      role="img"
    >
      <rect width={W} height={H} rx="2.5" fill="#E70013" />
      {/* White disc, well clear of the flag edges */}
      <circle cx="14" cy="10" r="6.3" fill="white" />
      {/* Red crescent: a small red "moon" circle with a white circle biting into it, both much smaller than the disc */}
      <circle cx="12.6" cy="10" r="3.6" fill="#E70013" />
      <circle cx="13.6" cy="10" r="3.2" fill="white" />
      {/* Red star sitting in the disc's clear space, right of the crescent */}
      <polygon points={STAR_POINTS} fill="#E70013" />
      <rect width={W} height={H} rx="2.5" fill="none" stroke="black" strokeOpacity="0.08" />
    </svg>
  )
}

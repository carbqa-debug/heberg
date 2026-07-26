import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { getServiceById, localizeService } from '../data/services'
import { useLang } from '../i18n/LanguageContext'

const INNER_R = 70
const OUTER_R = 122
const NODE_R = 7

// Six modules grouping the 8 real services onto the hexagon's 6 sides.
const MODULES = [
  { id: 'carbon-accounting', label: 'Carbon Accounting', tagline: 'Bilan Carbone & LCA', color: 'var(--color-primary)', services: ['bilan-carbone', 'lca'] },
  { id: 'esg-reporting', label: 'ESG & Reporting', tagline: 'ESG, AI Reports & IFRS S2', color: 'var(--color-lime)', services: ['esg-reports', 'ai-reports'] },
  { id: 'cbam-compliance', label: 'CBAM Compliance', tagline: 'CBAM & EU Compliance', color: 'var(--color-violet)', services: ['cbam'] },
  { id: 'simulation-ai', label: 'Simulation & AI', tagline: 'Simulation Lab & AI Scenarios', color: 'var(--color-info)', services: ['simulation-lab'] },
  { id: 'carbon-monitoring', label: 'Carbon Monitoring', tagline: 'CO₂ Collectors & Real-Time Data', color: 'var(--color-primary)', services: ['co2-collectors'] },
  { id: 'supply-chain', label: 'Supply Chain', tagline: 'Supply Chain & Product Footprint', color: 'var(--color-lime)', services: ['supply-chain'] },
] as const

const COUNT = MODULES.length

function ringPositions(radius: number, count: number, offsetDeg = -90) {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((offsetDeg + (360 / count) * i) * Math.PI) / 180
    return { x: 150 + radius * Math.cos(angle), y: 150 + radius * Math.sin(angle) }
  })
}

const HEX_OUTER = '150,105 189,127.5 189,172.5 150,195 111,172.5 111,127.5'
const HEX_INNER = '150,111 183,130.5 183,169.5 150,189 117,169.5 117,130.5'

interface CarbonMoleculeProps {
  className?: string
}

/** Fixed (non-rotating) carbon-intelligence diagram — hexagon logo mark at the center, 6 platform modules orbiting it. */
export default function CarbonMolecule({ className = '' }: CarbonMoleculeProps) {
  const [active, setActive] = useState<string | null>(null)
  const [pinned, setPinned] = useState(false)
  const reduceMotion = useReducedMotion()
  const { t, lang } = useLang()

  const innerNodes = ringPositions(INNER_R, COUNT)
  const outerNodes = ringPositions(OUTER_R, COUNT, -60)

  const handleEnter = (id: string) => { if (!pinned) setActive(id) }
  const handleLeave = () => { if (!pinned) setActive(null) }
  const handleClick = (id: string) => {
    if (pinned && active === id) {
      setPinned(false)
      setActive(null)
    } else {
      setPinned(true)
      setActive(id)
    }
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-60 blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--color-primary) 22%, transparent) 0%, color-mix(in srgb, var(--color-info) 12%, transparent) 45%, transparent 70%)',
        }}
      />

      <svg viewBox="0 0 300 300" className="relative h-[min(340px,72vw)] w-[min(340px,72vw)] md:h-80 md:w-80" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="cm-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-lime)" />
            <stop offset="35%" stopColor="var(--color-primary)" />
            <stop offset="65%" stopColor="var(--color-info)" />
            <stop offset="100%" stopColor="var(--color-violet)" />
          </linearGradient>
        </defs>

        {innerNodes.map((from, i) => {
          const next = innerNodes[(i + 1) % COUNT]
          return (
            <line
              key={`inner-bond-${i}`}
              x1={from.x} y1={from.y} x2={next.x} y2={next.y}
              stroke="url(#cm-ring)" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.85"
              className={reduceMotion ? '' : 'animate-dash-flow'}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          )
        })}

        {innerNodes.map((inner, i) => {
          const outer = outerNodes[i]
          const nodeColor = MODULES[i].color
          const isDimmed = active !== null && active !== MODULES[i].id
          return (
            <line
              key={`outer-bond-${i}`}
              x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke={nodeColor} strokeWidth="1.5" strokeDasharray="6 6"
              opacity={isDimmed ? 0.2 : 0.55}
              className={reduceMotion ? '' : 'animate-dash-flow'}
              style={{ animationDelay: `${i * 0.3}s`, transition: 'opacity 0.2s' }}
            />
          )
        })}

        {innerNodes.map((node, i) => (
          <motion.circle
            key={`inner-${i}`}
            cx={node.x} cy={node.y} r={NODE_R - 1}
            fill={`color-mix(in srgb, ${MODULES[i].color} 13%, transparent)`}
            stroke={MODULES[i].color} strokeWidth="1.5"
            animate={reduceMotion ? {} : { scale: [0.92, 1.08, 0.92] }}
            transition={reduceMotion ? {} : { duration: 2.8, repeat: Infinity, delay: i * 0.28, ease: 'easeInOut' }}
          />
        ))}

        {/* Central hexagon logo mark */}
        <motion.g
          animate={reduceMotion ? {} : { scale: [1, 1.035, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '150px 150px' }}
        >
          <polygon points={HEX_OUTER} fill="color-mix(in srgb, var(--color-primary) 12%, transparent)" stroke="var(--color-primary)" strokeWidth="1.5" />
          <polygon points={HEX_INNER} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="0.8" />
        </motion.g>

        {outerNodes.map((node, i) => {
          const mod = MODULES[i]
          const { id, color } = mod
          const label = t(`mol.${id}.label`)
          const tagline = t(`mol.${id}.tagline`)
          const isActive = active === id
          const isDimmed = active !== null && !isActive

          return (
            <g
              key={`outer-${i}`}
              transform={`translate(${node.x}, ${node.y})`}
              onMouseEnter={() => handleEnter(id)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(id)}
              role="button"
              tabIndex={0}
              aria-label={`${label} — ${tagline}`}
              style={{ cursor: 'pointer' }}
            >
              {isActive && (
                <motion.circle
                  cx={0} cy={0} r={NODE_R + 6}
                  fill={color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.16 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <motion.circle
                cx={0} cy={0} r={NODE_R}
                fill={`color-mix(in srgb, ${color} 10%, transparent)`}
                stroke={color}
                strokeWidth={isActive ? 2.5 : 2}
                animate={{
                  scale: isActive ? 1.25 : reduceMotion ? 1 : [0.9, 1.12, 0.9],
                  opacity: isDimmed ? 0.35 : 1,
                }}
                transition={
                  isActive
                    ? { duration: 0.2 }
                    : reduceMotion
                      ? {}
                      : { duration: 2.8, repeat: Infinity, delay: i * 0.28 + 0.4, ease: 'easeInOut' }
                }
                style={{ transformOrigin: '0px 0px' }}
              />

              <motion.g animate={{ opacity: isDimmed ? 0.35 : 1 }}>
                <text
                  x={0} y={NODE_R + (label.length > 10 ? 15 : 13)}
                  textAnchor="middle" fill={color}
                  className="text-[8px] font-bold uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-body)', pointerEvents: 'none' }}
                >
                  {label}
                </text>
              </motion.g>
            </g>
          )
        })}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <img src="/images/logo.png" alt="" width={56} height={56} className="h-12 w-12 object-contain md:h-14 md:w-14" />
      </div>

      {/* Active module card — rendered in its own top-level layer so it always sits above every node/line */}
      <AnimatePresence>
        {active && (() => {
          const i = MODULES.findIndex(m => m.id === active)
          const mod = MODULES[i]
          const node = outerNodes[i]
          const resolvedServices = mod.services
            .map(sid => getServiceById(sid))
            .filter(Boolean)
            .map(svc => localizeService(svc!, lang))
          const leftPct = (node.x / 300) * 100
          const topPct = (node.y / 300) * 100
          const anchorLeft = node.x > 150
          const anchorUp = node.y > 150

          return (
            // Static anchor wrapper — plain div, so its `transform` (positioning) is never
            // clobbered by framer-motion's own transform management on the animated child.
            <div
              className="absolute z-50"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: `translate(${anchorLeft ? 'calc(-100% - 14px)' : '14px'}, ${anchorUp ? 'calc(-100% - 14px)' : '14px'})`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="w-[168px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-3.5 py-3 shadow-[var(--shadow-card-hover)] text-left"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <div className="text-[11px] font-bold mb-0.5" style={{ color: mod.color }}>{t(`mol.${mod.id}.label`)}</div>
                <div className="text-[9.5px] text-[var(--color-text-secondary)] leading-snug mb-2">{t(`mol.${mod.id}.tagline`)}</div>
                <div className="space-y-1">
                  {resolvedServices.map(svc => (
                    <Link
                      key={svc!.id}
                      to={`/services/${svc!.id}`}
                      className="flex items-center gap-1.5 text-[10px] font-semibold hover:underline"
                      style={{ color: mod.color }}
                    >
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: mod.color }} />
                      {svc!.title}
                      <span className="ml-auto">→</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}

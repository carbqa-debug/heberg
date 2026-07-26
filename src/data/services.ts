import type { ComponentType } from 'react'
import {
  IconSensor, IconScale, IconLeaf, IconShield, IconLink, IconFlask, IconGlobe, IconSparkle,
  IconPlug, IconCheckCircle, IconTarget, IconClock, IconNetwork, IconChart, IconForecast,
  IconLoop, IconRecycle, IconLock,
} from '../components/icons'
import type { IconProps } from '../components/icons'
import type { EstimatorField, EstimatorResult } from '../components/MetricEstimator'
import type { Scenario } from '../components/ScenarioSimulator'

export interface Capability {
  icon: ComponentType<IconProps>
  title: string
  desc: string
}

export type CalculatorConfig =
  | { kind: 'cbam' }
  | { kind: 'esg' }
  | { kind: 'supplychain' }
  | { kind: 'lca-scan' }
  | {
      kind: 'metric'
      fields: EstimatorField[]
      compute: (values: Record<string, number>) => EstimatorResult
      resultLabel: string
      resultPrefix?: string
      resultSuffix?: string
      assumption: string
    }
  | { kind: 'checklist'; prompt: string; items: string[]; unit: string; withPhotocarbNote: string }
  | { kind: 'scenario'; scenarios: Scenario[] }

export interface ClientProfile {
  type: string
  desc: string
}

export interface HeroHighlight {
  value: string
  label: string
}

export interface ServiceDef {
  id: string
  num: string
  title: string
  subtitle: string
  description: string
  stat: string
  statLabel: string
  color: string
  icon: ComponentType<IconProps>
  industries: string[]
  valueProp: string
  heroHighlights: HeroHighlight[]
  capabilities: Capability[]
  calculator: CalculatorConfig
  methodologyStandard: string
  methodologySteps: string[]
  gains: string[]
  timeToReady: string
  clients: ClientProfile[]
}

export const SERVICES: ServiceDef[] = [
  {
    id: 'co2-collectors',
    num: '01',
    title: 'CO₂ Collectors',
    subtitle: 'Hardware · ATEX Certified · Gulf Ready',
    description:
      "Photocarb's CO₂ collector hardware clips directly onto your existing infrastructure — chimneys, pipelines, boilers, compressors. No production downtime, no infrastructure overhaul. ATEX-certified for Zone 1 and Zone 2 hazardous environments. Measures CO₂, CH₄, N₂O, and key combustion gases continuously.",
    stat: '48 hrs',
    statLabel: 'From installation to live data',
    color: 'var(--color-primary)',
    icon: IconSensor,
    industries: ['LNG', 'Petrochemicals', 'Power', 'Cement', 'Steel'],
    valueProp: 'Live carbon data from your facility in 48 hours',
    heroHighlights: [
      { value: '48 hrs', label: 'Installation to live data' },
      { value: 'ATEX Zone 1/2', label: 'Hazardous-area certified' },
      { value: '15 sec', label: 'Multi-gas sampling interval' },
    ],
    capabilities: [
      { icon: IconPlug, title: 'Clip-On Installation', desc: 'No shutdown, no infrastructure rework — mounts directly on existing pipes and stacks' },
      { icon: IconShield, title: 'ATEX Zone 1/2 Certified', desc: 'Safe for hazardous LNG, petrochemical, and refinery environments' },
      { icon: IconSensor, title: 'Continuous Multi-Gas Sensing', desc: 'CO₂, CH₄, N₂O, and combustion gases measured every 15 seconds' },
    ],
    calculator: {
      kind: 'metric',
      fields: [
        {
          id: 'facilityType', label: 'Facility type', type: 'select',
          options: [
            { label: 'LNG Train', value: 6 },
            { label: 'Refinery Unit', value: 8 },
            { label: 'Cement Kiln', value: 4 },
            { label: 'Power Plant', value: 5 },
            { label: 'Warehouse / Light Industrial', value: 2 },
          ],
        },
        { id: 'emissionPoints', label: 'Emission points (chimneys, pipelines, boilers)', type: 'number', placeholder: 'e.g. 8', min: 1 },
      ],
      compute: (v) => {
        const sensors = Math.round(v.emissionPoints * v.facilityType)
        const days = v.emissionPoints <= 5 ? 2 : v.emissionPoints <= 20 ? 3 : 5
        return { value: sensors, note: `Estimated ${days} days to full live data across ${v.emissionPoints} emission points — zero production downtime.` }
      },
      resultLabel: 'Recommended sensor nodes',
      assumption: 'Indicative sizing only. Final sensor count confirmed during site assessment.',
    },
    methodologyStandard: 'ATEX Zone 1/2 deployment · ISO 6142 gas calibration',
    methodologySteps: [
      'Site survey and sensor placement plan mapped to your emission points',
      'Clip-on installation directly onto existing pipes and stacks — zero production downtime',
      'Calibration against ISO 6142 certified reference gases',
      'Live data streaming into the Photocarb platform, verified against baseline',
    ],
    gains: [
      'Continuous, tamper-proof emissions data instead of once-a-year estimates',
      'Early leak and anomaly detection before it becomes a compliance issue',
      'One hardware layer that feeds every downstream report automatically',
      'No production stoppage required during installation',
    ],
    timeToReady: 'Installed and streaming live data within 48 hours of site access; full calibration complete within 5 business days.',
    clients: [
      { type: 'LNG & Gas Processing', desc: 'Continuous-operation trains that cannot tolerate a shutdown for instrumentation work' },
      { type: 'Refineries', desc: 'Zone 1/2-rated monitoring across multiple hazardous process units' },
      { type: 'Cement & Steel', desc: 'Multi-stack facilities needing sensor coverage across dozens of emission points' },
    ],
  },
  {
    id: 'bilan-carbone',
    num: '02',
    title: 'Bilan Carbone',
    subtitle: 'Scope 1 · Scope 2 · Scope 3 · GHG Protocol',
    description:
      'Your complete carbon balance sheet — Scope 1 direct emissions, Scope 2 purchased energy, and Scope 3 supply chain — calculated from your real operational data and delivered as a certified inventory. Built on GHG Protocol methodology, aligned with ISO 14064, and valid for CBAM, IFRS S2, and Qatar MECC regulatory submissions.',
    stat: '94%',
    statLabel: 'Data accuracy vs manual audit baseline',
    color: 'var(--color-info)',
    icon: IconScale,
    industries: ['Manufacturing', 'Finance', 'Construction', 'Shipping'],
    valueProp: 'Your complete bilan carbone in 48 hours',
    heroHighlights: [
      { value: '94%', label: 'Accuracy vs manual audit' },
      { value: 'Scope 1·2·3', label: 'Full GHG Protocol coverage' },
      { value: '48 hrs', label: 'First certified inventory' },
    ],
    capabilities: [
      { icon: IconScale, title: 'Scope 1-2-3 Ledger', desc: 'Full GHG Protocol accounting from real operational data' },
      { icon: IconCheckCircle, title: 'ISO 14064 Aligned', desc: 'Certified methodology accepted by auditors and regulators' },
      { icon: IconLink, title: 'CBAM / IFRS / MECC Ready', desc: 'One inventory feeds every regulatory submission you need' },
    ],
    calculator: {
      kind: 'metric',
      fields: [
        {
          id: 'sector', label: 'Sector', type: 'select',
          options: [
            { label: 'LNG / Petrochemicals', value: 12 },
            { label: 'Cement', value: 18 },
            { label: 'Steel', value: 22 },
            { label: 'Manufacturing', value: 6 },
            { label: 'Finance / Services', value: 1.5 },
            { label: 'Construction', value: 4 },
            { label: 'Shipping', value: 9 },
          ],
        },
        { id: 'employees', label: 'Number of employees', type: 'number', placeholder: 'e.g. 350', min: 1 },
      ],
      compute: (v) => {
        const tonnes = Math.round(v.employees * v.sector)
        return { value: tonnes, note: 'Rough Scope 1+2 estimate based on sector-average intensity. Photocarb replaces this with measured data, accurate to 94%.' }
      },
      resultLabel: 'Estimated annual tCO₂e (Scope 1+2)',
      resultSuffix: ' t',
      assumption: 'Sector-average intensity factors. Actual bilan carbone calculated from your real operational data.',
    },
    methodologyStandard: 'GHG Protocol Corporate Standard · ISO 14064-1',
    methodologySteps: [
      'Boundary and scope definition workshop with your operations team',
      'Activity data collection across Scope 1, Scope 2 and Scope 3',
      'Emission factor mapping and calculation against GHG Protocol methodology',
      'Certified inventory delivered with a full audit trail, ready for third-party review',
    ],
    gains: [
      'A single certified number your auditors, regulators and investors all accept',
      'Clear visibility into which sites or activities drive your footprint',
      'One inventory pre-formatted for CBAM, IFRS S2 and Qatar MECC submissions',
      '94% data accuracy versus manual spreadsheet audits',
    ],
    timeToReady: 'First certified inventory delivered in 48 hours once operational data is connected; full multi-site rollout typically 2–3 weeks.',
    clients: [
      { type: 'Manufacturers', desc: 'Building their first regulatory-grade carbon inventory from scratch' },
      { type: 'Finance & Construction', desc: 'Reporting Scope 1+2 data to investors or lenders on a fixed timeline' },
      { type: 'Shipping Operators', desc: 'Tracking fleet-wide emissions across vessels and shore operations' },
    ],
  },
  {
    id: 'esg-reports',
    num: '03',
    title: 'ESG & Sustainability',
    subtitle: 'IFRS S1/S2 · GRI · CDP · Arabic + English',
    description:
      'Auto-generated ESG and sustainability reports — board-ready, audit-proof, delivered in 48 hours. Photocarb builds your IFRS S2 climate disclosure, annual sustainability report, CDP submission, and investor-grade data package from your live carbon data. Available in Arabic and English, with a tamper-evident audit trail included.',
    stat: '48 hrs',
    statLabel: 'Full ESG report delivery',
    color: 'var(--color-lime)',
    icon: IconLeaf,
    industries: ['Listed Companies', 'Finance', 'Conglomerates', 'Energy'],
    valueProp: 'IFRS S2 compliant ESG reports in 48 hours',
    heroHighlights: [
      { value: '48 hrs', label: 'Full ESG report delivery' },
      { value: 'IFRS S2', label: 'Climate disclosure ready' },
      { value: 'AR + EN', label: 'Bilingual board-ready output' },
    ],
    capabilities: [
      { icon: IconLeaf, title: 'IFRS S2 Climate Disclosure', desc: 'Materiality tables and scenario analysis auto-generated' },
      { icon: IconGlobe, title: 'Arabic + English Output', desc: 'Board-ready reports in both languages, no translation lag' },
      { icon: IconLock, title: 'Tamper-Evident Trail', desc: 'Every disclosure traceable back to its source sensor reading' },
    ],
    calculator: { kind: 'esg' },
    methodologyStandard: 'IFRS S1/S2 · GRI Standards · CDP Framework',
    methodologySteps: [
      'Materiality assessment aligned to IFRS S2 climate requirements',
      'Data aggregation from live carbon and operational feeds',
      'Auto-drafted disclosure narrative, tables and scenario analysis',
      'Board review cycle with a tamper-evident audit trail on every figure',
    ],
    gains: [
      'Board-ready ESG reporting without building a six-person sustainability team',
      'Bilingual disclosures — Arabic and English — with zero translation lag',
      'Every claim traceable back to a source sensor reading',
      'Investor-grade data package ready for CDP or lender due diligence',
    ],
    timeToReady: 'Full report drafted in 48 hours; board-ready after a single review cycle.',
    clients: [
      { type: 'Listed Companies', desc: 'Managing annual disclosure obligations to exchanges and shareholders' },
      { type: 'Conglomerates', desc: 'Consolidating ESG data across multiple subsidiaries and business units' },
      { type: 'Finance Groups', desc: 'Under investor or regulator ESG due diligence pressure' },
    ],
  },
  {
    id: 'cbam',
    num: '04',
    title: 'CBAM Compliance',
    subtitle: 'EU Regulation 2023/956 · Quarterly Declarations',
    description:
      'Full CBAM declaration automation for Gulf exporters. Photocarb calculates actual embedded carbon in your exported goods and generates EU-format declarations automatically. Using actual measured values instead of EU default rates saves most clients 30–65% on their CBAM liability.',
    stat: '40–65%',
    statLabel: 'Typical CBAM liability reduction',
    color: 'var(--color-violet)',
    icon: IconShield,
    industries: ['Steel', 'Cement', 'Fertilizers', 'Aluminium', 'Hydrogen'],
    valueProp: 'CBAM declarations ready before your next shipment',
    heroHighlights: [
      { value: '40–65%', label: 'Typical liability reduction' },
      { value: 'Quarterly', label: 'Automated EU declarations' },
      { value: 'TAXUD XML', label: 'Exact EU customs format' },
    ],
    capabilities: [
      { icon: IconShield, title: 'EU TAXUD-Format XML', desc: 'Declarations generated in the exact format EU customs expects' },
      { icon: IconTarget, title: 'Actual vs Default Rates', desc: 'Measured intensity data replaces punitive default assumptions' },
      { icon: IconClock, title: 'Quarterly Automation', desc: 'Declarations prepared and filed on the EU reporting calendar' },
    ],
    calculator: { kind: 'cbam' },
    methodologyStandard: 'EU Regulation 2023/956 · CBAM Implementing Regulation',
    methodologySteps: [
      'Product and CN code classification against the CBAM goods list',
      'Embedded emissions calculation from measured, not default, process data',
      'EU TAXUD-format XML declaration generation',
      'Quarterly filing calendar and submission support through your reporting agent',
    ],
    gains: [
      '30–65% lower CBAM liability by replacing EU default values with your measured intensity',
      'Zero missed filing deadlines with automated quarterly scheduling',
      'Declarations in the exact XML format EU customs expects — no rework',
      'Full documentation trail if EU customs requests verification',
    ],
    timeToReady: 'First declaration-ready dataset within 48 hours of connecting production data; quarterly filings automated thereafter.',
    clients: [
      { type: 'Steel & Cement Exporters', desc: 'Shipping CBAM goods into the EU on a quarterly declaration cycle' },
      { type: 'Fertilizer & Aluminium', desc: 'High embedded-carbon exports where actual-vs-default rates matter most' },
      { type: 'Trading Houses', desc: 'Managing CBAM exposure across multiple Gulf suppliers at once' },
    ],
  },
  {
    id: 'supply-chain',
    num: '05',
    title: 'Supply Chain Carbon',
    subtitle: 'Scope 3 · Upstream + Downstream · All 15 Categories',
    description:
      'Map the full carbon footprint of your supply chain. Photocarb collects data from your top suppliers, calculates all 15 Scope 3 categories, and identifies your highest-impact reduction opportunities — including QatarEnergy supplier sustainability outputs and LNG cargo methane intensity certificates for European buyers.',
    stat: 'Scope 3',
    statLabel: 'All 15 GHG Protocol categories',
    color: 'var(--color-primary)',
    icon: IconLink,
    industries: ['Retail', 'Manufacturing', 'Food & Beverage', 'Automotive'],
    valueProp: 'Full Scope 3 visibility across your supply chain',
    heroHighlights: [
      { value: 'Scope 3', label: 'All 15 GHG Protocol categories' },
      { value: 'Up + Downstream', label: 'Full value-chain coverage' },
      { value: '2 wks', label: 'To first hotspot map' },
    ],
    capabilities: [
      { icon: IconNetwork, title: 'Supplier Data Collection', desc: 'Structured intake from your top suppliers at scale' },
      { icon: IconChart, title: 'All 15 Scope 3 Categories', desc: 'Complete GHG Protocol upstream + downstream coverage' },
      { icon: IconTarget, title: 'Hotspot Ranking', desc: 'Reduction opportunities ranked by impact, not guesswork' },
    ],
    calculator: { kind: 'supplychain' },
    methodologyStandard: 'GHG Protocol Scope 3 Standard · All 15 Categories',
    methodologySteps: [
      'Supplier mapping and tiering by spend and emissions impact',
      'Structured data intake campaign across your top suppliers',
      'Category-by-category Scope 3 calculation against GHG Protocol methodology',
      'Hotspot ranking and a prioritized reduction roadmap',
    ],
    gains: [
      'Full Scope 3 visibility instead of industry-average estimates',
      'A supplier engagement program that improves data quality year over year',
      'Reduction opportunities ranked by actual impact, not guesswork',
      'Ready-made outputs for QatarEnergy supplier sustainability reporting and EU buyer methane certificates',
    ],
    timeToReady: 'Initial hotspot map within 2 weeks of supplier data collection kickoff; full 15-category inventory within 6–8 weeks.',
    clients: [
      { type: 'Retail & Manufacturing', desc: 'Under buyer pressure to report Scope 3 across multi-tier supply chains' },
      { type: 'Food & Beverage', desc: 'Mapping upstream agricultural and packaging emissions' },
      { type: 'Automotive', desc: 'Coordinating emissions data across large supplier networks' },
    ],
  },
  {
    id: 'simulation-lab',
    num: '06',
    title: 'Simulation Lab',
    subtitle: 'What-If Scenarios · Instant Results',
    description:
      "Before you invest in a new process, a fuel switch, or a carbon capture upgrade — simulate it. Photocarb's Simulation Lab models the carbon, cost, and compliance impact of any operational change. Ask \"what if we upgrade Unit 7?\" and get the full impact analysis in under 30 seconds.",
    stat: '< 30 sec',
    statLabel: 'Full scenario simulation',
    color: 'var(--color-info)',
    icon: IconFlask,
    industries: ['Petrochemicals', 'Power', 'LNG', 'Cement'],
    valueProp: 'Test reduction strategies before you invest',
    heroHighlights: [
      { value: '< 30 sec', label: 'Full scenario simulation' },
      { value: 'Unlimited', label: 'Free what-if scenarios' },
      { value: '3-in-1', label: 'Carbon · cost · compliance' },
    ],
    capabilities: [
      { icon: IconFlask, title: 'Instant What-If Modeling', desc: 'Test process, fuel, or capture changes before committing capex' },
      { icon: IconForecast, title: 'Cost + Carbon + Compliance', desc: 'Every scenario scored across all three dimensions at once' },
      { icon: IconLoop, title: 'Unlimited Free Scenarios', desc: 'Compare as many options as you need before deciding' },
    ],
    calculator: {
      kind: 'scenario',
      scenarios: [
        { id: 'amine', label: 'Upgrade amine scrubber setpoints', emissionsPct: -18, costPct: -12, paybackMonths: 4, note: 'AI-tuned setpoints typically lift capture efficiency 12–25% with no capex — just optimized control.' },
        { id: 'h2', label: 'Switch feedstock to green hydrogen', emissionsPct: -64, costPct: 22, paybackMonths: 38, note: 'Large emissions cut but a significant capex and opex premium — best modeled against a multi-year carbon price forecast.' },
        { id: 'waste-heat', label: 'Recover waste heat for regeneration', emissionsPct: -9, costPct: -15, paybackMonths: 14, note: 'Waste heat recovery cuts both reagent-regeneration energy and utility costs.' },
        { id: 'electrify', label: 'Electrify compressor drivers', emissionsPct: -27, costPct: 8, paybackMonths: 26, note: 'Emissions drop significantly if grid electricity is low-carbon; payback depends on local tariffs.' },
      ],
    },
    methodologyStandard: 'Physics-based digital twin · Process engineering models',
    methodologySteps: [
      'Baseline model built from your live operational data',
      'Scenario library configured to your specific assets — fuel switch, capex upgrade, control tuning',
      'Instant simulation across carbon, cost and compliance dimensions',
      'Recommendations ranked by payback period and total impact',
    ],
    gains: [
      'Test capex decisions before committing budget',
      'See carbon, cost and compliance impact side by side, not in separate spreadsheets',
      'Unlimited free scenario comparisons at no incremental cost',
      'Avoid stranded-asset risk from decisions made on incomplete data',
    ],
    timeToReady: 'First scenario results in under 30 seconds; full baseline model calibrated within 1 week of data connection.',
    clients: [
      { type: 'Petrochemical & Power', desc: 'Evaluating capture, efficiency or feedstock upgrades before committing capex' },
      { type: 'LNG Operators', desc: 'Planning multi-year decarbonization roadmaps across trains' },
      { type: 'Cement Producers', desc: 'Modeling kiln and fuel-switch scenarios against compliance targets' },
    ],
  },
  {
    id: 'lca',
    num: '07',
    title: 'LCA',
    subtitle: 'ISO 14040 · ISO 14067 · Product Carbon Footprint',
    description:
      "Certified product carbon footprint analysis from raw material extraction to factory gate — or full cradle-to-grave. Photocarb's LCA module follows ISO 14040/14044 and 14067 methodology, producing verified carbon labels that unlock premium pricing in European markets and qualify products for low-carbon procurement programs.",
    stat: 'ISO 14067',
    statLabel: 'Certified product carbon footprint',
    color: 'var(--color-lime)',
    icon: IconGlobe,
    industries: ['Chemicals', 'Metals', 'Food', 'Construction'],
    valueProp: 'Product carbon footprints verified to ISO 14067',
    heroHighlights: [
      { value: 'ISO 14067', label: 'Certified product footprint' },
      { value: 'Cradle-to-Grave', label: 'Full boundary option' },
      { value: '3–4 wks', label: 'To certified report' },
    ],
    capabilities: [
      { icon: IconGlobe, title: 'ISO 14040 / 14067 Certified', desc: 'Internationally recognized product footprint methodology' },
      { icon: IconRecycle, title: 'Cradle-to-Gate or -Grave', desc: "Choose the boundary that matches your buyer's requirement" },
      { icon: IconCheckCircle, title: 'Verified Carbon Labels', desc: 'Unlock premium pricing and green procurement eligibility' },
    ],
    calculator: { kind: 'lca-scan' },
    methodologyStandard: 'ISO 14040 / 14044 · ISO 14067',
    methodologySteps: [
      'Functional unit and system boundary definition',
      'Life cycle inventory data collection across raw materials, process and logistics',
      'Impact assessment calculated against ISO 14067 methodology',
      'Third-party verification and certified carbon label issuance',
    ],
    gains: [
      'Verified carbon labels that unlock premium pricing in EU markets',
      'Qualification for green and low-carbon procurement programs',
      "Choice of cradle-to-gate or cradle-to-grave boundary to match your buyer's requirement",
      'A defensible, audit-ready methodology if a buyer challenges your claim',
    ],
    timeToReady: 'Indicative footprint in minutes via the estimator; certified ISO 14067 report typically within 3–4 weeks.',
    clients: [
      { type: 'Chemicals & Metals', desc: 'Selling into EU green-procurement and low-carbon buyer programs' },
      { type: 'Food & Beverage', desc: 'Needing verified per-product carbon labels for retail partners' },
      { type: 'Construction Materials', desc: 'Qualifying products for green building certification schemes' },
    ],
  },
  {
    id: 'ai-reports',
    num: '08',
    title: 'AI Reports',
    subtitle: 'Ready in 48 Hours · Arabic + English + French',
    description:
      'All regulatory reports — CBAM quarterly declarations, IFRS S2 disclosures, ISO 14064 inventories, Qatar MECC environmental submissions — generated automatically on schedule or on demand. Every report is audit-ready on delivery, with full calculation methodology documentation and a tamper-evident evidence chain.',
    stat: '48 hrs',
    statLabel: 'From raw data to submitted report',
    color: 'var(--color-violet)',
    icon: IconSparkle,
    industries: ['All Sectors', 'Multi-site', 'Conglomerates'],
    valueProp: 'Any compliance report in 48 hours',
    heroHighlights: [
      { value: '48 hrs', label: 'Raw data to submitted report' },
      { value: 'AR · EN · FR', label: 'Trilingual output' },
      { value: '1 dataset', label: 'Powers every regulatory report' },
    ],
    capabilities: [
      { icon: IconSparkle, title: 'One Dataset, Every Report', desc: 'CBAM, IFRS S2, ISO 14064, and MECC from a single source' },
      { icon: IconGlobe, title: 'Arabic, English, French', desc: 'Every report generated in the language your stakeholder needs' },
      { icon: IconClock, title: '48-Hour Turnaround', desc: 'On schedule or on demand, always audit-ready on delivery' },
    ],
    calculator: {
      kind: 'checklist',
      prompt: 'Which reports does your team currently prepare manually?',
      items: ['CBAM quarterly declaration', 'IFRS S2 climate disclosure', 'ISO 14064 GHG inventory', 'Qatar MECC environmental submission', 'CDP response', 'Board ESG briefing'],
      unit: 'reports',
      withPhotocarbNote: 'generated automatically in 48 hours, from one verified dataset.',
    },
    methodologyStandard: 'Automated multi-framework generation · CBAM, IFRS S2, ISO 14064, MECC',
    methodologySteps: [
      'Connect once to your live carbon dataset',
      'Select the report type and jurisdiction you need',
      'AI drafts the report with full calculation methodology documentation',
      'Human review and tamper-evident sign-off before delivery',
    ],
    gains: [
      'One dataset powers every regulatory report you need, no re-entry',
      '48-hour turnaround, on schedule or on demand',
      'Every report audit-ready on delivery with a full calculation trail',
      'Available in Arabic, English and French',
    ],
    timeToReady: 'First report generated within 48 hours of dataset connection; recurring reports fully automated thereafter.',
    clients: [
      { type: 'Multi-Site Conglomerates', desc: 'Juggling several regulatory regimes across subsidiaries at once' },
      { type: 'Compliance Teams', desc: 'Tired of manually re-preparing similar reports every quarter' },
      { type: 'All Sectors', desc: 'Any operator that needs audit-ready reporting without a dedicated team' },
    ],
  },
]

export const SERVICE_DELIVERY_STEPS = [
  'Assessment & scoping',
  'Data collection & integration',
  'Analysis & optimization',
  'Report delivery in 48 hours',
]

export function getServiceById(id: string): ServiceDef | undefined {
  return SERVICES.find(s => s.id === id)
}

/* ---- Arabic localization ---- */
interface ServiceAr {
  title: string
  subtitle: string
  description: string
  statLabel: string
  valueProp: string
  industries: string[]
  capabilities: { title: string; desc: string }[]
  heroHighlights: string[]
}

const SERVICES_AR: Record<string, ServiceAr> = {
  'co2-collectors': {
    title: 'مجمّعات CO₂',
    subtitle: 'أجهزة · معتمدة ATEX · جاهزة للخليج',
    description:
      'تُثبَّت أجهزة مجمّعات CO₂ من فوتوكارب مباشرةً على بنيتك التحتية القائمة — المداخن والأنابيب والغلايات والضواغط. دون توقّف للإنتاج ولا إعادة هيكلة للبنية التحتية. معتمدة ATEX للمناطق الخطرة Zone 1 وZone 2. تقيس CO₂ وCH₄ وN₂O وغازات الاحتراق الرئيسية باستمرار.',
    statLabel: 'من التركيب إلى البيانات الحية',
    valueProp: 'بيانات كربون حية من منشأتك خلال 48 ساعة',
    industries: ['الغاز المسال', 'البتروكيماويات', 'الطاقة', 'الإسمنت', 'الصلب'],
    capabilities: [
      { title: 'تركيب سريع بالتثبيت', desc: 'دون إيقاف أو إعادة هيكلة — يُثبَّت مباشرةً على الأنابيب والمداخن القائمة' },
      { title: 'معتمد ATEX Zone 1/2', desc: 'آمن لبيئات الغاز المسال والبتروكيماويات والمصافي الخطرة' },
      { title: 'استشعار متعدد الغازات مستمر', desc: 'يقيس CO₂ وCH₄ وN₂O وغازات الاحتراق كل 15 ثانية' },
    ],
    heroHighlights: ['التركيب إلى البيانات الحية', 'معتمد للمناطق الخطرة', 'فترة أخذ عينات متعددة الغازات'],
  },
  'bilan-carbone': {
    title: 'البصمة الكربونية',
    subtitle: 'النطاق 1 · النطاق 2 · النطاق 3 · بروتوكول GHG',
    description:
      'ميزانيتك الكربونية الكاملة — انبعاثات النطاق 1 المباشرة، والنطاق 2 للطاقة المشتراة، والنطاق 3 لسلسلة التوريد — محسوبة من بياناتك التشغيلية الحقيقية ومسلّمة كجرد معتمد. مبنية على منهجية بروتوكول GHG، ومتوافقة مع ISO 14064، وصالحة لتقديمات CBAM وIFRS S2 ووزارة البيئة القطرية.',
    statLabel: 'دقة البيانات مقابل خط الأساس اليدوي',
    valueProp: 'بصمتك الكربونية الكاملة خلال 48 ساعة',
    industries: ['التصنيع', 'التمويل', 'البناء', 'الشحن'],
    capabilities: [
      { title: 'سجل النطاقات 1-2-3', desc: 'محاسبة كاملة وفق بروتوكول GHG من بيانات تشغيلية حقيقية' },
      { title: 'متوافق مع ISO 14064', desc: 'منهجية معتمدة مقبولة لدى المدققين والجهات التنظيمية' },
      { title: 'جاهز لـ CBAM / IFRS / وزارة البيئة', desc: 'جرد واحد يغذّي كل تقديم تنظيمي تحتاجه' },
    ],
    heroHighlights: ['الدقة مقابل التدقيق اليدوي', 'تغطية كاملة لبروتوكول GHG', 'أول جرد معتمد'],
  },
  'esg-reports': {
    title: 'ESG والاستدامة',
    subtitle: 'IFRS S1/S2 · GRI · CDP · عربي + إنجليزي',
    description:
      'تقارير ESG واستدامة تُنشأ تلقائيًا — جاهزة لمجلس الإدارة ومقاومة للتدقيق، تُسلَّم خلال 48 ساعة. تبني فوتوكارب إفصاحك المناخي وفق IFRS S2، وتقرير الاستدامة السنوي، وتقديم CDP، وحزمة بيانات بمستوى المستثمرين من بياناتك الكربونية الحية. متاحة بالعربية والإنجليزية مع مسار تدقيق مقاوم للتلاعب.',
    statLabel: 'تسليم تقرير ESG كامل',
    valueProp: 'تقارير ESG متوافقة مع IFRS S2 خلال 48 ساعة',
    industries: ['الشركات المدرجة', 'التمويل', 'التكتلات', 'الطاقة'],
    capabilities: [
      { title: 'إفصاح مناخي IFRS S2', desc: 'جداول الأهمية النسبية وتحليل السيناريوهات تُنشأ تلقائيًا' },
      { title: 'مخرجات بالعربية والإنجليزية', desc: 'تقارير جاهزة لمجلس الإدارة باللغتين دون تأخير الترجمة' },
      { title: 'مسار مقاوم للتلاعب', desc: 'كل إفصاح قابل للتتبّع إلى قراءة الحسّاس المصدر' },
    ],
    heroHighlights: ['تسليم تقرير ESG كامل', 'جاهز للإفصاح المناخي', 'مخرجات ثنائية اللغة'],
  },
  cbam: {
    title: 'الامتثال لـ CBAM',
    subtitle: 'لائحة الاتحاد الأوروبي 2023/956 · إقرارات فصلية',
    description:
      'أتمتة كاملة لإقرارات CBAM للمصدّرين الخليجيين. تحسب فوتوكارب الكربون المُضمَّن الفعلي في سلعك المصدَّرة وتنشئ إقرارات بصيغة الاتحاد الأوروبي تلقائيًا. واستخدام القيم المقيسة الفعلية بدلًا من المعدلات الافتراضية الأوروبية يوفّر لمعظم العملاء 30–65% من التزامات CBAM.',
    statLabel: 'الخفض المعتاد في التزامات CBAM',
    valueProp: 'إقرارات CBAM جاهزة قبل شحنتك القادمة',
    industries: ['الصلب', 'الإسمنت', 'الأسمدة', 'الألمنيوم', 'الهيدروجين'],
    capabilities: [
      { title: 'صيغة XML وفق TAXUD الأوروبية', desc: 'إقرارات تُنشأ بالصيغة الدقيقة التي تتوقعها جمارك الاتحاد الأوروبي' },
      { title: 'القيم الفعلية مقابل الافتراضية', desc: 'بيانات الكثافة المقيسة تحل محل الافتراضات العقابية' },
      { title: 'أتمتة فصلية', desc: 'تُعدّ الإقرارات وتُقدَّم وفق تقويم الإبلاغ الأوروبي' },
    ],
    heroHighlights: ['الخفض المعتاد في الالتزامات', 'إقرارات أوروبية آلية', 'صيغة الجمارك الأوروبية الدقيقة'],
  },
  'supply-chain': {
    title: 'كربون سلسلة التوريد',
    subtitle: 'النطاق 3 · المنبع + المصب · جميع الفئات الـ15',
    description:
      'ارسم البصمة الكربونية الكاملة لسلسلة توريدك. تجمع فوتوكارب البيانات من كبار مورّديك، وتحسب جميع فئات النطاق 3 الـ15، وتحدد أعلى فرص الخفض تأثيرًا — بما في ذلك مخرجات استدامة موردي قطر للطاقة وشهادات كثافة الميثان لشحنات الغاز المسال للمشترين الأوروبيين.',
    statLabel: 'جميع فئات بروتوكول GHG الـ15',
    valueProp: 'رؤية كاملة للنطاق 3 عبر سلسلة توريدك',
    industries: ['التجزئة', 'التصنيع', 'الأغذية والمشروبات', 'السيارات'],
    capabilities: [
      { title: 'جمع بيانات المورّدين', desc: 'استقبال منظّم من كبار مورّديك على نطاق واسع' },
      { title: 'جميع فئات النطاق 3 الـ15', desc: 'تغطية كاملة للمنبع والمصب وفق بروتوكول GHG' },
      { title: 'ترتيب النقاط الساخنة', desc: 'فرص الخفض مرتّبة حسب التأثير لا التخمين' },
    ],
    heroHighlights: ['جميع فئات بروتوكول GHG الـ15', 'تغطية كاملة لسلسلة القيمة', 'حتى أول خريطة نقاط ساخنة'],
  },
  'simulation-lab': {
    title: 'مختبر المحاكاة',
    subtitle: 'سيناريوهات افتراضية · نتائج فورية',
    description:
      'قبل أن تستثمر في عملية جديدة أو تحويل وقود أو ترقية احتجاز كربون — حاكِها. يُنمذج مختبر المحاكاة من فوتوكارب أثر الكربون والتكلفة والامتثال لأي تغيير تشغيلي. اسأل «ماذا لو رقّينا الوحدة 7؟» واحصل على تحليل الأثر الكامل في أقل من 30 ثانية.',
    statLabel: 'محاكاة سيناريو كاملة',
    valueProp: 'اختبر استراتيجيات الخفض قبل أن تستثمر',
    industries: ['البتروكيماويات', 'الطاقة', 'الغاز المسال', 'الإسمنت'],
    capabilities: [
      { title: 'نمذجة افتراضية فورية', desc: 'اختبر تغييرات العملية أو الوقود أو الاحتجاز قبل التزام رأس المال' },
      { title: 'التكلفة + الكربون + الامتثال', desc: 'كل سيناريو يُقيَّم عبر الأبعاد الثلاثة دفعةً واحدة' },
      { title: 'سيناريوهات مجانية غير محدودة', desc: 'قارن أكبر عدد تحتاجه من الخيارات قبل القرار' },
    ],
    heroHighlights: ['محاكاة سيناريو كاملة', 'سيناريوهات افتراضية مجانية', 'كربون · تكلفة · امتثال'],
  },
  lca: {
    title: 'تقييم دورة الحياة',
    subtitle: 'ISO 14040 · ISO 14067 · البصمة الكربونية للمنتج',
    description:
      'تحليل معتمد للبصمة الكربونية للمنتج من استخراج المواد الخام إلى بوابة المصنع — أو من المهد إلى اللحد كاملًا. تتبع وحدة LCA من فوتوكارب منهجية ISO 14040/14044 و14067، منتجةً بطاقات كربون موثّقة تفتح تسعيرًا مميزًا في الأسواق الأوروبية وتؤهّل المنتجات لبرامج الشراء منخفض الكربون.',
    statLabel: 'بصمة كربونية معتمدة للمنتج',
    valueProp: 'بصمات كربونية للمنتج موثّقة وفق ISO 14067',
    industries: ['الكيماويات', 'المعادن', 'الأغذية', 'البناء'],
    capabilities: [
      { title: 'معتمد ISO 14040 / 14067', desc: 'منهجية بصمة منتج معترف بها دوليًا' },
      { title: 'من المهد إلى البوابة أو اللحد', desc: 'اختر الحدود التي تطابق متطلب مشتريك' },
      { title: 'بطاقات كربون موثّقة', desc: 'تفتح تسعيرًا مميزًا وأهلية الشراء الأخضر' },
    ],
    heroHighlights: ['بصمة منتج معتمدة', 'خيار الحدود الكامل', 'حتى التقرير المعتمد'],
  },
  'ai-reports': {
    title: 'تقارير الذكاء الاصطناعي',
    subtitle: 'جاهزة خلال 48 ساعة · عربي + إنجليزي + فرنسي',
    description:
      'جميع التقارير التنظيمية — إقرارات CBAM الفصلية، وإفصاحات IFRS S2، وجرد ISO 14064، وتقديمات وزارة البيئة القطرية — تُنشأ تلقائيًا وفق الجدول أو عند الطلب. كل تقرير جاهز للتدقيق عند التسليم، مع توثيق كامل لمنهجية الحساب وسلسلة أدلة مقاومة للتلاعب.',
    statLabel: 'من البيانات الخام إلى التقرير المُقدَّم',
    valueProp: 'أي تقرير امتثال خلال 48 ساعة',
    industries: ['جميع القطاعات', 'متعدد المواقع', 'التكتلات'],
    capabilities: [
      { title: 'بيانات واحدة، كل التقارير', desc: 'CBAM وIFRS S2 وISO 14064 ووزارة البيئة من مصدر واحد' },
      { title: 'عربي وإنجليزي وفرنسي', desc: 'كل تقرير يُنشأ باللغة التي يحتاجها المعنيّ' },
      { title: 'إنجاز خلال 48 ساعة', desc: 'وفق الجدول أو عند الطلب، جاهز للتدقيق دائمًا عند التسليم' },
    ],
    heroHighlights: ['من البيانات الخام إلى التقرير المُقدَّم', 'مخرجات ثلاثية اللغة', 'تُشغّل كل تقرير تنظيمي'],
  },
}

export const SERVICE_DELIVERY_STEPS_AR = [
  'التقييم وتحديد النطاق',
  'جمع البيانات وتكاملها',
  'التحليل والتحسين',
  'تسليم التقرير خلال 48 ساعة',
]

export function localizeService(s: ServiceDef, lang: 'en' | 'ar'): ServiceDef {
  if (lang !== 'ar') return s
  const a = SERVICES_AR[s.id]
  if (!a) return s
  return {
    ...s,
    title: a.title,
    subtitle: a.subtitle,
    description: a.description,
    statLabel: a.statLabel,
    valueProp: a.valueProp,
    industries: a.industries,
    capabilities: s.capabilities.map((c, i) => ({
      icon: c.icon,
      title: a.capabilities[i]?.title ?? c.title,
      desc: a.capabilities[i]?.desc ?? c.desc,
    })),
    heroHighlights: s.heroHighlights.map((h, i) => ({
      value: h.value,
      label: a.heroHighlights[i] ?? h.label,
    })),
  }
}

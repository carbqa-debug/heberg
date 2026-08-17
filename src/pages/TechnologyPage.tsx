import { useState } from 'react'
import CertMarquee from '../components/CertMarquee'
import FinalCTA from '../components/FinalCTA'
import { useInView } from '../hooks/useInView'
import { useLang } from '../i18n/LanguageContext'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import {
  IconBrain, IconForecast, IconSatellite, IconChart, IconScan,
  IconTelescope, IconFlask, IconCheck, IconCircleDot,
} from '../components/icons'

const SENSING_LAYERS = [
  {
    num: '01', title: 'Direct', emphasis: 'Measurement',
    desc: 'Continuous emission monitoring systems (CEMS), mass flowmeters, and process gas analysers connected via OPC-UA or MQTT. Sub-1% measurement uncertainty. Real-time data ingest every 15 seconds.',
    spec: '< 1% uncertainty · CEMS / Mass flow / Process analysers',
    color: 'var(--color-primary)',
    accuracy: '99.2%',
  },
  {
    num: '02', title: 'Inference', emphasis: 'Engine',
    desc: 'For process units without direct instrumentation, Photocarb\'s AI infers emission rates from correlated process variables — feed rates, temperatures, pressures — using facility-specific trained models validated against periodic spot measurements.',
    spec: '± 3.5% uncertainty · Process variable correlation · Facility-specific ML models',
    color: 'var(--color-lime)',
    accuracy: '96.5%',
  },
  {
    num: '03', title: 'Satellite', emphasis: 'Cross-Validation',
    desc: 'Sentinel-5P and TROPOMI methane/CO₂ plume data cross-validated against SCADA readings to detect fugitive emissions, flare accounting gaps, and data anomalies. Satellite verification adds independent corroboration for third-party audit.',
    spec: '± 8% uncertainty · Sentinel-5P / TROPOMI · 5-day overpass cycle',
    color: 'var(--color-violet)',
    accuracy: '92.0%',
  },
]

const AI_CARDS = [
  { icon: IconBrain, title: 'Emissions Digital Twin', tag: 'TensorFlow / PyTorch', desc: 'Facility-specific neural network trained on 2+ years of process historian data' },
  { icon: IconForecast, title: 'Predictive Capture AI', tag: 'Reinforcement Learning', desc: 'Closed-loop setpoint optimization with plant-safe interlock passthrough' },
  { icon: IconSatellite, title: 'Anomaly Detection', tag: 'Isolation Forest + LSTM', desc: 'Flags emission spikes, sensor faults, and unplanned venting within 15 minutes' },
  { icon: IconChart, title: 'Demand Forecasting', tag: 'Prophet + XGBoost', desc: 'Emission load forecasting aligned to production schedule and weather' },
  { icon: IconScan, title: 'Satellite Fusion', tag: 'Computer Vision', desc: 'Automated methane plume attribution from satellite imagery to process unit' },
]

const CAPTURE_TABS = [
  {
    id: 'amine', label: 'Amine Scrubbing',
    headline: 'The dominant post-combustion capture method in Gulf LNG and petrochemical facilities.',
    points: [
      'MEA / MDEA / piperazine solvent systems optimized per unit',
      'AI controls L/G ratio, stripper temperature, reboiler duty',
      'Average efficiency lift: 14–22% vs manual setpoint control',
      'Reagent consumption reduced 12–18% via AI dosing',
    ],
    color: 'var(--color-primary)',
  },
  {
    id: 'oxyfuel', label: 'Oxyfuel Combustion',
    headline: 'High-purity CO₂ stream from oxygen-fired combustion — simpler capture, tighter AI control needed.',
    points: [
      'O₂ purity setpoint optimization for CO₂ concentration maximization',
      'Flue gas recycle ratio AI-tuned to energy-capture tradeoff',
      'Integrated with ASU (air separation unit) for O₂ demand matching',
      'Typical CO₂ stream purity achieved: 95–99%',
    ],
    color: 'var(--color-lime)',
  },
  {
    id: 'precombustion', label: 'Pre-Combustion',
    headline: 'Applicable to IGCC and hydrogen production — CO₂ separation before combustion step.',
    points: [
      'Water-gas shift reactor optimization for H₂/CO ratio',
      'Selexol / Rectisol solvent pressure optimization',
      'AI integrates with downstream H₂ purity control',
      'Applicable to blue hydrogen production for export',
    ],
    color: 'var(--color-violet)',
  },
  {
    id: 'dac', label: 'Direct Air Capture',
    headline: 'Emerging technology for residual emissions — Photocarb models DAC as a portfolio offset option.',
    points: [
      'DAC energy and cost model for facility-level offset sizing',
      'Integration with facility waste heat for sorbent regeneration',
      'Net-cost modelling vs CBAM payment — DAC vs compliance',
      'Qatar solar + DAC feasibility assessment module',
    ],
    color: 'var(--color-primary)',
  },
]


const TIMELINE = [
  { year: '2024', label: 'Q4', event: 'Mesaieed pilot deployment — Carbon Intelligence Core', done: true },
  { year: '2025', label: 'Q1', event: 'Ras Laffan LNG — Capture Optimization Engine GA', done: true },
  { year: '2025', label: 'Q2', event: 'CBAM Compliance Suite launched; Qatar NCAP API live', done: true },
  { year: '2025', label: 'Q3', event: 'Satellite cross-validation (Sentinel-5P) integrated', done: true },
  { year: '2025', label: 'Q4', event: 'Scope 3 upstream mapping module released', done: true },
  { year: '2026', label: 'Q1', event: 'Blue hydrogen tracking & IFRS S2 auto-pack GA', done: true },
  { year: '2026', label: 'Q3', event: 'DAC feasibility module + advanced carbon credit registry integration', done: false },
  { year: '2027', label: 'Q1', event: 'Multi-facility portfolio dashboard with consolidated CBAM filing', done: false },
]

const SENSING_LAYERS_AR = [
  { title: 'قياس', emphasis: 'مباشر', desc: 'أنظمة مراقبة انبعاثات مستمرة (CEMS)، ومقاييس تدفق كتلي، ومحلّلات غازات العمليات، متصلة عبر OPC-UA أو MQTT. عدم يقين قياس أقل من 1%. استيعاب بيانات لحظي كل 15 ثانية.', spec: 'عدم يقين < 1% · CEMS / تدفق كتلي / محلّلات عمليات' },
  { title: 'محرّك', emphasis: 'الاستدلال', desc: 'للوحدات دون قياس مباشر، يستدل ذكاء فوتوكارب على معدلات الانبعاث من متغيرات العملية المترابطة — معدلات التغذية والحرارة والضغط — باستخدام نماذج مدرّبة خاصة بالمنشأة ومُتحقَّق منها مقابل قياسات فورية دورية.', spec: 'عدم يقين ± 3.5% · ترابط متغيرات العملية · نماذج تعلّم آلي خاصة بالمنشأة' },
  { title: 'التحقق المتقاطع', emphasis: 'بالأقمار الصناعية', desc: 'بيانات الميثان وثاني أكسيد الكربون من Sentinel-5P وTROPOMI يتم التحقق منها متقاطعًا مقابل قراءات SCADA لاكتشاف الانبعاثات الهاربة، وفجوات حساب الشعلة، وشذوذ البيانات. يضيف التحقق بالأقمار الصناعية تأكيدًا مستقلًا للتدقيق الخارجي.', spec: 'عدم يقين ± 8% · Sentinel-5P / TROPOMI · دورة مرور كل 5 أيام' },
]

const AI_CARDS_AR = [
  { title: 'التوأم الرقمي للانبعاثات', tag: 'TensorFlow / PyTorch', desc: 'شبكة عصبية خاصة بالمنشأة مدرّبة على أكثر من عامين من بيانات تاريخ العمليات' },
  { title: 'ذكاء الاحتجاز التنبؤي', tag: 'تعلّم معزّز', desc: 'تحسين نقاط الضبط بحلقة مغلقة مع تمرير آمن للتعشيقات' },
  { title: 'اكتشاف الشذوذ', tag: 'Isolation Forest + LSTM', desc: 'يرصد ارتفاعات الانبعاثات وأعطال الحسّاسات والتنفيس غير المخطط خلال 15 دقيقة' },
  { title: 'التنبؤ بالطلب', tag: 'Prophet + XGBoost', desc: 'التنبؤ بحمل الانبعاثات وفق جدول الإنتاج والطقس' },
  { title: 'دمج الأقمار الصناعية', tag: 'رؤية حاسوبية', desc: 'إسناد آلي لأعمدة الميثان من صور الأقمار الصناعية إلى وحدة العملية' },
]

const CAPTURE_TABS_AR: Record<string, { label: string; headline: string; points: string[] }> = {
  amine: {
    label: 'غسل الأمين',
    headline: 'الطريقة السائدة لاحتجاز ما بعد الاحتراق في منشآت الغاز المسال والبتروكيماويات الخليجية.',
    points: [
      'أنظمة مذيبات MEA / MDEA / بيبيرازين محسّنة لكل وحدة',
      'يتحكم الذكاء الاصطناعي في نسبة السائل/الغاز، وحرارة العمود المُجرِّد، وحمل المُغلي',
      'متوسط رفع الكفاءة: 14–22% مقابل التحكم اليدوي بنقاط الضبط',
      'خفض استهلاك الكواشف بنسبة 12–18% عبر جرعات الذكاء الاصطناعي',
    ],
  },
  oxyfuel: {
    label: 'الاحتراق بالأوكسي-فيول',
    headline: 'تيار ثاني أكسيد كربون عالي النقاء من الاحتراق بالأكسجين — احتجاز أبسط مع حاجة لتحكم أدق بالذكاء الاصطناعي.',
    points: [
      'تحسين نقطة ضبط نقاء O₂ لتعظيم تركيز ثاني أكسيد الكربون',
      'ضبط نسبة إعادة تدوير غاز المداخن بالذكاء الاصطناعي لموازنة الطاقة والاحتجاز',
      'مدمج مع وحدة فصل الهواء (ASU) لمطابقة الطلب على الأكسجين',
      'نقاء تيار ثاني أكسيد الكربون المعتاد: 95–99%',
    ],
  },
  precombustion: {
    label: 'ما قبل الاحتراق',
    headline: 'ينطبق على IGCC وإنتاج الهيدروجين — فصل ثاني أكسيد الكربون قبل خطوة الاحتراق.',
    points: [
      'تحسين مفاعل تحويل غاز الماء لنسبة H₂/CO',
      'تحسين ضغط مذيبات Selexol / Rectisol',
      'يتكامل الذكاء الاصطناعي مع التحكم بنقاء الهيدروجين النهائي',
      'ينطبق على إنتاج الهيدروجين الأزرق للتصدير',
    ],
  },
  dac: {
    label: 'الاحتجاز المباشر من الهواء',
    headline: 'تقنية ناشئة للانبعاثات المتبقية — تُنمذج فوتوكارب DAC كخيار تعويض ضمن المحفظة.',
    points: [
      'نموذج طاقة وتكلفة DAC لتحديد حجم التعويض على مستوى المنشأة',
      'التكامل مع الحرارة المهدورة للمنشأة لتجديد المادة الماصّة',
      'نمذجة صافي التكلفة مقابل دفع CBAM — DAC مقابل الامتثال',
      'وحدة تقييم جدوى الطاقة الشمسية + DAC في قطر',
    ],
  },
}

const TIMELINE_AR = [
  'نشر تجريبي في مسيعيد — نواة الذكاء الكربوني',
  'الغاز المسال في راس لفان — الإتاحة العامة لمحرك تحسين الاحتجاز',
  'إطلاق حزمة الامتثال لـ CBAM؛ واجهة NCAP القطرية قيد التشغيل',
  'دمج التحقق المتقاطع بالأقمار الصناعية (Sentinel-5P)',
  'إصدار وحدة رسم النطاق 3 للمنبع',
  'تتبّع الهيدروجين الأزرق والإتاحة العامة لحزمة IFRS S2 التلقائية',
  'وحدة جدوى DAC + تكامل سجل أرصدة كربون متقدم',
  'لوحة محفظة متعددة المنشآت مع تقديم CBAM موحّد',
]

function localizeLayer(l: typeof SENSING_LAYERS[0], i: number, lang: 'en' | 'ar') {
  if (lang !== 'ar') return l
  const a = SENSING_LAYERS_AR[i]
  return a ? { ...l, title: a.title, emphasis: a.emphasis, desc: a.desc, spec: a.spec } : l
}

function localizeAiCard(c: typeof AI_CARDS[0], i: number, lang: 'en' | 'ar') {
  if (lang !== 'ar') return c
  const a = AI_CARDS_AR[i]
  return a ? { ...c, title: a.title, tag: a.tag, desc: a.desc } : c
}

function localizeCaptureTab(t: typeof CAPTURE_TABS[0], lang: 'en' | 'ar') {
  if (lang !== 'ar') return t
  const a = CAPTURE_TABS_AR[t.id]
  return a ? { ...t, label: a.label, headline: a.headline, points: a.points } : t
}

export default function TechnologyPage() {
  useDocumentMeta(
    'Our Technology | AI-Powered Emissions Sensing & Capture Optimization | Photocarb',
    'Every AI model in Photocarb is trained on real process historian data, validated against physical measurements, and deployed with explainable outputs — from continuous emission monitoring to capture optimization.',
  )

  return (
    <>
      <TechHero />
      <CertMarquee />
      <SensingSection />
      <AIArchSection />
      <CaptureTabsSection />
      <RDTimeline />
      <FinalCTA />
    </>
  )
}

function TechHero() {
  const { t } = useLang()
  return (
    <section className="pt-32 pb-20 bg-[var(--color-bg)] overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 30%, color-mix(in srgb, var(--color-violet) 7%, transparent) 0%, transparent 55%)' }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[820px]">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-violet)] uppercase mb-5 block" style={{ fontFamily: 'var(--font-body)' }}>
            — {t('tech.eyebrow')}
          </span>
          <h1 className="text-[52px] lg:text-[68px] leading-[1.04] text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
            {t('tech.title')}{' '}
            <em className="italic font-normal text-[var(--color-violet)]">{t('tech.titleAccent')}</em>
          </h1>
          <p className="text-[18px] leading-relaxed text-[var(--color-text-secondary)] max-w-[600px]" style={{ fontFamily: 'var(--font-body)' }}>
            {t('tech.subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}

function SensingSection() {
  const { ref, visible } = useInView(0.1)
  const { t, lang } = useLang()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-4">
        <div className={`text-center mb-10 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>{t('tech.measurementArch')}</span>
          <h2 className="text-[40px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('tech.sensingTitle')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('tech.sensingTitleAccent')}</em>
          </h2>
        </div>
      </div>
      {SENSING_LAYERS.map((layer, i) => (
        <SensingBlock key={layer.num} layer={localizeLayer(layer, i, lang)} flip={i % 2 === 1} visible={visible} delay={i * 0.1} />
      ))}
    </section>
  )
}

function SensingBlock({ layer: l, flip, visible, delay }: { layer: typeof SENSING_LAYERS[0]; flip: boolean; visible: boolean; delay: number }) {
  const { t } = useLang()
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
      <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
        <div className={`relative ${flip ? 'lg:order-2' : ''} fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
          <div className="absolute -top-6 -left-4 text-[160px] font-bold leading-none pointer-events-none select-none gradient-numeral opacity-[0.07]" style={{ fontFamily: 'var(--font-display)' }}>
            {l.num}
          </div>
          <div className="relative">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: l.color, fontFamily: 'var(--font-body)' }}>{l.num} — {t('tech.sensingLayer')}</span>
            <h3 className="text-[36px] font-bold leading-tight text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {l.title}{' '}<em className="italic font-normal" style={{ color: l.color }}>{l.emphasis}</em>
            </h3>
            <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)] mb-6" style={{ fontFamily: 'var(--font-body)' }}>{l.desc}</p>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3">
              <span className="text-[12px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{l.spec}</span>
            </div>
          </div>
        </div>
        <div className={`${flip ? 'lg:order-1' : ''} fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay + 0.12}s` }}>
          <div className="bg-[var(--color-surface)] rounded-3xl p-10 border border-[var(--color-border)] text-center">
            <div className="text-[72px] font-bold" style={{ color: l.color, fontFamily: 'var(--font-display)' }}>{l.accuracy}</div>
            <div className="text-[14px] text-[var(--color-text-secondary)] mt-2" style={{ fontFamily: 'var(--font-body)' }}>{t('tech.measurementAccuracy')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AIArchSection() {
  const { ref, visible } = useInView(0.2)
  const { t, lang } = useLang()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-14 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-violet)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>{t('tech.aiArch')}</span>
          <h2 className="text-[40px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('tech.aiTitle')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('tech.aiTitleAccent')}</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AI_CARDS.map((raw, i) => {
            const card = localizeAiCard(raw, i, lang)
            return (
            <div
              key={raw.title}
              className={`fade-up ${visible ? 'visible' : ''} stagger-${Math.min(i + 1, 4)} card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7 group`}
            >
              <div className="mb-5 text-[var(--color-violet)]"><card.icon size={26} strokeWidth={1.5} /></div>
              <h3 className="text-[18px] font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>{card.title}</h3>
              <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-primary)] mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                {card.tag}
              </span>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{card.desc}</p>
            </div>
            )
          })}
          {/* CTA card */}
          <div
            className={`fade-up ${visible ? 'visible' : ''} stagger-4 border rounded-2xl p-7 flex flex-col justify-between`}
            style={{ background: 'linear-gradient(160deg, var(--color-tint-violet), var(--color-surface) 65%)', borderColor: 'color-mix(in srgb, var(--color-violet) 25%, transparent)' }}
          >
            <div>
              <div className="mb-5 text-[var(--color-violet)]"><IconTelescope size={26} strokeWidth={1.5} /></div>
              <h3 className="text-[18px] font-bold text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>{t('tech.seeAiTitle')}</h3>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{t('tech.seeAiDesc')}</p>
            </div>
            <a href="/contact" className="mt-6 inline-flex items-center gap-2 text-[var(--color-violet)] font-semibold text-[14px]" style={{ fontFamily: 'var(--font-body)' }}>
              {t('tech.bookTechDemo')} →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function CaptureTabsSection() {
  const [active, setActive] = useState(0)
  const { ref, visible } = useInView(0.15)
  const { t: translate, lang } = useLang()
  const tab = localizeCaptureTab(CAPTURE_TABS[active], lang)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-12 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>{translate('tech.captureScience')}</span>
          <h2 className="text-[40px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {translate('tech.captureTitle')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{translate('tech.captureTitleAccent')}</em>
          </h2>
        </div>

        {/* Tabs */}
        <div className={`flex gap-2 mb-8 overflow-x-auto pb-1 fade-up ${visible ? 'visible' : ''} stagger-1`}>
          {CAPTURE_TABS.map((rawTab, i) => (
            <button
              key={rawTab.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-[14px] font-semibold whitespace-nowrap shrink-0 transition-all ${
                active === i ? 'bg-[var(--color-primary-deep)] text-white shadow-md' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-bg)]'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {localizeCaptureTab(rawTab, lang).label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div key={active} className={`grid lg:grid-cols-2 gap-10 fade-up ${visible ? 'visible' : ''} stagger-2`}>
          <div className="bg-[var(--color-surface)] rounded-3xl p-9 border border-[var(--color-border)]">
            <h3 className="text-[24px] font-bold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>{tab.headline}</h3>
            <ul className="space-y-3">
              {tab.points.map(p => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-[var(--color-lime)]">◆</span>
                  <span className="text-[14px] text-[var(--color-text-secondary)] leading-snug" style={{ fontFamily: 'var(--font-body)' }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl flex items-center justify-center" style={{ background: `color-mix(in srgb, ${tab.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${tab.color} 25%, transparent)`, minHeight: 220 }}>
            <div className="text-center p-10">
              <div className="mb-3 flex justify-center" style={{ color: tab.color }}><IconFlask size={64} strokeWidth={1.2} /></div>
              <div className="text-[14px] font-semibold" style={{ color: tab.color, fontFamily: 'var(--font-body)' }}>{tab.label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RDTimeline() {
  const { ref, visible } = useInView(0.2)
  const { t, lang } = useLang()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg)] py-16 overflow-x-auto">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-12 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>{t('tech.rdPipeline')}</span>
          <h2 className="text-[40px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('tech.rdTitle')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('tech.rdTitleAccent')}</em>
          </h2>
        </div>
        {/* Mobile / tablet: vertical stepper */}
        <div className={`lg:hidden flex flex-col fade-up ${visible ? 'visible' : ''} stagger-1`}>
          {TIMELINE.map((item, i) => (
            <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
              {i < TIMELINE.length - 1 && (
                <div
                  className={`absolute top-[32px] w-[2px] bottom-0 ${lang === 'ar' ? 'right-[15px]' : 'left-[15px]'} ${
                    item.done ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
                  }`}
                />
              )}
              <div
                className={`w-[32px] h-[32px] rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                  item.done
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)]'
                }`}
              >
                {item.done ? <IconCheck size={13} strokeWidth={2.4} /> : <IconCircleDot size={11} strokeWidth={1.8} />}
              </div>
              <div className="pt-1">
                <div className="text-[11px] font-bold text-[var(--color-primary)] mb-1" style={{ fontFamily: 'var(--font-body)' }}>{item.year} {item.label}</div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-snug" style={{ fontFamily: 'var(--font-body)' }}>{lang === 'ar' ? (TIMELINE_AR[i] ?? item.event) : item.event}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Track line */}
          <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-[var(--color-border)]">
            <div
              className="h-full bg-[var(--color-primary)] transition-all duration-1000"
              style={{ width: visible ? `${(TIMELINE.filter(t => t.done).length / TIMELINE.length) * 100}%` : '0%' }}
            />
          </div>

          <div className={`grid grid-cols-8 gap-4 fade-up ${visible ? 'visible' : ''} stagger-1`}>
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative">
                <div
                  className={`w-[44px] h-[44px] rounded-full border-2 flex items-center justify-center mb-4 mx-auto text-[11px] font-bold ${
                    item.done
                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)]'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {item.done ? <IconCheck size={15} strokeWidth={2.4} /> : <IconCircleDot size={13} strokeWidth={1.8} />}
                </div>
                <div className="text-[10px] font-bold text-[var(--color-primary)] text-center mb-1" style={{ fontFamily: 'var(--font-body)' }}>{item.year} {item.label}</div>
                <p className="text-[11px] text-[var(--color-text-secondary)] text-center leading-tight" style={{ fontFamily: 'var(--font-body)' }}>{lang === 'ar' ? (TIMELINE_AR[i] ?? item.event) : item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

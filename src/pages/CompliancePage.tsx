import CertMarquee from '../components/CertMarquee'
import RegulationExplorer from '../components/RegulationExplorer'
import FinalCTA from '../components/FinalCTA'
import { useInView } from '../hooks/useInView'
import { useLang } from '../i18n/LanguageContext'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { IconCheck, IconCircleDot } from '../components/icons'

const FRAMEWORKS = [
  {
    num: '01', id: 'cbam',
    title: 'CBAM', fullTitle: 'Carbon Border Adjustment Mechanism',
    tagline: 'Europe\'s carbon border tax takes full effect in January 2026.',
    color: 'var(--color-primary)',
    desc: 'The EU CBAM places a carbon price on imports of steel, cement, aluminium, fertilisers, hydrogen, and electricity from non-EU countries. Gulf exporters must submit verified embedded carbon data per shipment or pay default CBAM rates — which assume the worst-case intensity.',
    points: [
      'Phase-in reporting began Q4 2023 — quarterly declarations required',
      'Full financial liability triggers January 2026',
      'Default CBAM intensity rates are ~30–60% above verified actual rates for Gulf producers',
      'Verified data allows use of actual facility intensity — directly reducing CBAM cost',
      'Photocarb generates cargo-level ISO 14064-verified intensity certificates',
    ],
    timeline: [
      { date: 'Oct 2023', label: 'Reporting phase begins — quarterly declarations', done: true },
      { date: 'Jan 2025', label: 'Importers must register in EU CBAM registry', done: true },
      { date: 'Jan 2026', label: 'Full financial liability — CBAM certificates required', done: false },
      { date: 'Jan 2034', label: 'Free allowances fully phased out — full CBAM exposure', done: false },
    ],
  },
  {
    num: '02', id: 'ifrs',
    title: 'IFRS S1/S2', fullTitle: 'International Sustainability Reporting Standards',
    tagline: 'Climate risk is now a financial reporting requirement.',
    color: 'var(--color-violet)',
    desc: 'IFRS S1 (general sustainability disclosures) and S2 (climate-specific disclosures) require companies to report material climate risks, physical risks, transition risks, and climate-related opportunities in their financial statements. Gulf companies with international investors or dual listings are already in scope.',
    points: [
      'Scope 1, 2, and material Scope 3 emissions required',
      'Scenario analysis across 1.5°C and 2°C pathways',
      'Physical risk quantification (heat, water stress, flooding)',
      'Transition risk: carbon pricing, stranded asset risk',
      'Photocarb auto-generates the IFRS S2 quantification tables and scenario analysis packs',
    ],
    timeline: [
      { date: '2024', label: 'Mandatory for listed entities in Australia, UK, EU', done: true },
      { date: '2025', label: 'Voluntary adoption recommended; auditor preparation', done: true },
      { date: '2026', label: 'Mandatory in Singapore, GCC (anticipated)', done: false },
      { date: '2027', label: 'Full global convergence expected', done: false },
    ],
  },
  {
    num: '03', id: 'ncap',
    title: 'Qatar NCAP', fullTitle: 'National Climate Action Plan',
    tagline: 'Qatar\'s commitment — 25% reduction in emission intensity by 2030.',
    color: 'var(--color-lime)',
    desc: "Qatar's NCAP commits the country to a 25% reduction in greenhouse gas emission intensity across industrial sectors by 2030, with a longer-term net-zero pathway to 2050. The Ministry of Environment and Climate Change requires annual verified abatement data from major industrial emitters.",
    points: [
      'Annual GHG inventory submission to MECC mandatory from 2024',
      'Facility-level emission intensity baselines required',
      'Verified abatement credits recognised in national registry',
      'Qatar National Carbon Credit Registry launched 2024',
      'Photocarb generates MECC-format annual abatement reports and registry submissions',
    ],
    timeline: [
      { date: '2024', label: 'Annual MECC abatement reporting mandatory for major emitters', done: true },
      { date: '2025', label: 'Qatar National Carbon Registry operational', done: true },
      { date: '2026', label: 'Emission trading mechanism expected for large facilities', done: false },
      { date: '2030', label: '25% intensity reduction target — national commitment', done: false },
    ],
  },
]

const FRAMEWORKS_AR: Record<string, { fullTitle: string; tagline: string; desc: string; points: string[]; timeline: string[] }> = {
  cbam: {
    fullTitle: 'آلية تعديل الكربون الحدودية',
    tagline: 'ضريبة الكربون الحدودية الأوروبية تدخل حيّز التنفيذ الكامل في يناير 2026.',
    desc: 'تفرض آلية CBAM الأوروبية سعرًا للكربون على واردات الصلب والإسمنت والألمنيوم والأسمدة والهيدروجين والكهرباء من الدول غير الأعضاء في الاتحاد الأوروبي. وعلى المصدّرين الخليجيين تقديم بيانات كربون مُضمَّن موثّقة لكل شحنة أو دفع معدلات CBAM الافتراضية — التي تفترض أسوأ كثافة ممكنة.',
    points: [
      'بدأ الإبلاغ التدريجي في الربع الرابع 2023 — إقرارات فصلية مطلوبة',
      'يبدأ الالتزام المالي الكامل في يناير 2026',
      'معدلات كثافة CBAM الافتراضية أعلى بنحو 30–60% من المعدلات الفعلية الموثّقة لمنتجي الخليج',
      'تتيح البيانات الموثّقة استخدام كثافة المنشأة الفعلية — ما يخفض تكلفة CBAM مباشرة',
      'تنشئ فوتوكارب شهادات كثافة على مستوى الشحنة موثّقة وفق ISO 14064',
    ],
    timeline: [
      'تبدأ مرحلة الإبلاغ — إقرارات فصلية',
      'على المستوردين التسجيل في سجل CBAM الأوروبي',
      'الالتزام المالي الكامل — شهادات CBAM مطلوبة',
      'الإلغاء الكامل للمخصصات المجانية — انكشاف كامل على CBAM',
    ],
  },
  ifrs: {
    fullTitle: 'معايير الإبلاغ الدولية عن الاستدامة',
    tagline: 'أصبحت المخاطر المناخية متطلبًا للإبلاغ المالي.',
    desc: 'يتطلب IFRS S1 (الإفصاحات العامة عن الاستدامة) وS2 (الإفصاحات المناخية) من الشركات الإبلاغ عن المخاطر المناخية الجوهرية، والمخاطر المادية، ومخاطر التحول، والفرص المرتبطة بالمناخ في قوائمها المالية. والشركات الخليجية ذات المستثمرين الدوليين أو الإدراج المزدوج مشمولة بالفعل.',
    points: [
      'مطلوب انبعاثات النطاق 1 و2 والنطاق 3 الجوهري',
      'تحليل سيناريوهات عبر مسارات 1.5°م و2°م',
      'تحديد المخاطر المادية (الحرارة، إجهاد المياه، الفيضانات)',
      'مخاطر التحول: تسعير الكربون، مخاطر الأصول العالقة',
      'تنشئ فوتوكارب تلقائيًا جداول تحديد IFRS S2 وحزم تحليل السيناريوهات',
    ],
    timeline: [
      'إلزامي للكيانات المدرجة في أستراليا والمملكة المتحدة والاتحاد الأوروبي',
      'يُوصى بالتبني الطوعي؛ تحضير المدققين',
      'إلزامي في سنغافورة ودول الخليج (متوقع)',
      'التقارب العالمي الكامل متوقع',
    ],
  },
  ncap: {
    fullTitle: 'خطة العمل المناخي الوطنية',
    tagline: 'التزام قطر — خفض 25% في كثافة الانبعاثات بحلول 2030.',
    desc: 'تلتزم خطة قطر الوطنية للمناخ بخفض كثافة انبعاثات غازات الدفيئة بنسبة 25% عبر القطاعات الصناعية بحلول 2030، مع مسار أطول أمدًا نحو الحياد الكربوني بحلول 2050. وتتطلب وزارة البيئة والتغير المناخي بيانات خفض سنوية موثّقة من كبار المنبعثين الصناعيين.',
    points: [
      'تقديم جرد سنوي لغازات الدفيئة إلى وزارة البيئة إلزامي من 2024',
      'مطلوب خطوط أساس لكثافة الانبعاثات على مستوى المنشأة',
      'أرصدة خفض موثّقة معترف بها في السجل الوطني',
      'أُطلق سجل قطر الوطني لأرصدة الكربون في 2024',
      'تنشئ فوتوكارب تقارير الخفض السنوية بصيغة وزارة البيئة وتقديمات السجل',
    ],
    timeline: [
      'الإبلاغ السنوي للخفض إلى وزارة البيئة إلزامي لكبار المنبعثين',
      'سجل قطر الوطني للكربون قيد التشغيل',
      'آلية تداول انبعاثات متوقعة للمنشآت الكبيرة',
      'هدف خفض الكثافة 25% — التزام وطني',
    ],
  },
}

function localizeFramework(fw: typeof FRAMEWORKS[0], lang: 'en' | 'ar') {
  if (lang !== 'ar') return fw
  const a = FRAMEWORKS_AR[fw.id]
  if (!a) return fw
  return {
    ...fw,
    fullTitle: a.fullTitle,
    tagline: a.tagline,
    desc: a.desc,
    points: a.points,
    timeline: fw.timeline.map((item, i) => ({ ...item, label: a.timeline[i] ?? item.label })),
  }
}

export default function CompliancePage() {
  const { lang } = useLang()
  useDocumentMeta(
    'CBAM, IFRS S2 & Qatar NCAP Compliance | Photocarb',
    "Explore carbon regulations by country — CBAM, carbon tax, ESG requirements, and reporting rules — and see how Photocarb keeps exporters audit-ready across every framework, anywhere in the world.",
  )
  return (
    <>
      <ComplianceHero />
      <CertMarquee />
      {FRAMEWORKS.map((fw, i) => (
        <FrameworkBlock key={fw.id} fw={localizeFramework(fw, lang)} flip={i % 2 === 1} />
      ))}
      <RegulationExplorer />
      <FinalCTA />
    </>
  )
}

function ComplianceHero() {
  const { t } = useLang()
  return (
    <section className="pt-32 pb-20 bg-[var(--color-bg)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--color-primary) 7%, transparent) 0%, transparent 55%)' }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[820px]">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-5 block" style={{ fontFamily: 'var(--font-body)' }}>
            — {t('compliancePage.eyebrow')}
          </span>
          <h1 className="text-[52px] lg:text-[68px] leading-[1.04] text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
            {t('compliancePage.title')}{' '}
            <em className="italic font-normal text-[var(--color-primary)]">{t('compliancePage.titleAccent')}</em>
          </h1>
          <p className="text-[18px] leading-relaxed text-[var(--color-text-secondary)] max-w-[600px]" style={{ fontFamily: 'var(--font-body)' }}>
            {t('compliancePage.subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}

function FrameworkBlock({ fw, flip }: { fw: typeof FRAMEWORKS[0]; flip: boolean }) {
  const { ref, visible } = useInView(0.12)
  const { t } = useLang()
  return (
    <section
      id={fw.id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-16 ${flip ? 'bg-[var(--color-bg-secondary)]' : 'bg-[var(--color-bg)]'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`grid lg:grid-cols-2 gap-14 items-start`}>
          {/* Left — content */}
          <div className={`relative ${flip ? 'lg:order-2' : ''} fade-up ${visible ? 'visible' : ''}`}>
            <div
              className="absolute -top-6 -left-4 text-[160px] font-bold leading-none pointer-events-none select-none gradient-numeral opacity-[0.07]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {fw.num}
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[28px] font-bold"
                  style={{ color: fw.color, fontFamily: 'var(--font-display)' }}
                >
                  {fw.title}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.15em] text-[var(--color-text-secondary)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                  {fw.fullTitle}
                </span>
              </div>
              <h2 className="text-[32px] font-bold leading-tight text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                <em className="italic font-normal" style={{ color: fw.color }}>{fw.tagline}</em>
              </h2>
              <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)] mb-7" style={{ fontFamily: 'var(--font-body)' }}>{fw.desc}</p>
              <ul className="space-y-3 mb-8">
                {fw.points.map(p => (
                  <li key={p} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: fw.color }} />
                    <span className="text-[14px] text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-[14px] font-semibold"
                style={{ color: fw.color, fontFamily: 'var(--font-body)' }}
              >
                {t('compliancePage.getAssessment').replace('{title}', fw.title)} →
              </a>
            </div>
          </div>

          {/* Right — timeline */}
          <div className={`${flip ? 'lg:order-1' : ''} fade-up ${visible ? 'visible' : ''} stagger-2`}>
            <div className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-5" style={{ fontFamily: 'var(--font-body)' }}>
              {t('compliancePage.keyDeadlines')}
            </div>
            <div className="space-y-4">
              {fw.timeline.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      item.done
                        ? 'text-white border-current'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)]'
                    }`}
                    style={{
                      background: item.done ? fw.color : undefined,
                      borderColor: item.done ? fw.color : undefined,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {item.done ? <IconCheck size={16} strokeWidth={2.4} /> : <IconCircleDot size={14} strokeWidth={1.8} />}
                  </div>
                  <div className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3">
                    <div className="text-[11px] font-bold mb-0.5" style={{ color: fw.color, fontFamily: 'var(--font-body)' }}>{item.date}</div>
                    <div className="text-[13px] text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

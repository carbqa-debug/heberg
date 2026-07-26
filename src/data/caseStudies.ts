export interface CaseStudyMetric {
  value: string
  label: string
  sub?: string
}

export interface CaseStudy {
  id: string
  org: string
  industry: string
  location: string
  color: string
  img: string
  imgAlt: string
  challenge: string
  solution: string
  chips: string[]
  metrics: CaseStudyMetric[]
  quote: string
  author: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'mesaieed',
    org: 'Mesaieed Petrochemical Complex',
    industry: 'Petrochemicals',
    location: 'Mesaieed Industrial City, Qatar',
    color: 'var(--color-primary)',
    img: 'https://images.unsplash.com/photo-1754112180893-9d22b4275074?w=1000&h=650&fit=crop&auto=format',
    imgAlt: 'Gas flare stack at a desert petrochemical facility at dusk',
    challenge:
      'Large-scale petrochemical facility with 14 production units and ~3.2M tonnes CO₂e annually. Zero integrated carbon visibility across units, no reliable Scope 1 data for CBAM declaration, and an estimated CBAM exposure of QAR 8.1M annually. The 14-month manual reporting cycle consumed 3.2 full-time staff.',
    solution:
      'Photocarb deployed CO₂ Collectors across all 14 units with 87 sensor nodes, plus Bilan Carbone and CBAM Compliance reporting — full implementation in 6 weeks with zero production disruption.',
    chips: ['CO₂ Collectors', 'Bilan Carbone', 'CBAM Compliance'],
    metrics: [
      { value: '94%', label: 'Scope 1 data accuracy', sub: 'vs ~65% estimated' },
      { value: '-42%', label: 'Emissions intensity', sub: 'vs baseline' },
      { value: 'QAR 6.2M', label: 'CBAM savings', sub: 'year one projected' },
      { value: '11 days', label: 'Reporting cycle', sub: 'vs 14 months' },
    ],
    quote:
      'We thought carbon compliance was going to be a permanent line item on our cost structure. Photocarb turned it into a competitive differentiator. Our CBAM savings in year one more than covered the platform cost by a factor of four.',
    author: 'VP Operations, Mesaieed Petrochemical Complex',
  },
  {
    id: 'ras-laffan',
    org: 'Ras Laffan LNG Operations',
    industry: 'LNG',
    location: 'Ras Laffan Industrial City, Qatar',
    color: 'var(--color-violet)',
    img: 'https://images.unsplash.com/photo-1768128834406-f5b1b962af9d?w=1000&h=650&fit=crop&auto=format',
    imgAlt: 'LNG processing plant illuminated at night',
    challenge:
      'LNG production facility with a post-combustion CCS unit operating at 71% of rated capture efficiency. High energy penalty at 3.8 GJ/tonne CO₂ — 18% above design — with unplanned downtime averaging 340 hours/year and no real-time capture visibility.',
    solution:
      'Photocarb deployed CO₂ Collectors across the CCS unit for real-time capture monitoring, combined with Simulation Lab to model and continuously tune amine scrubber setpoints — implementation completed in 3 weeks with no process interruption.',
    chips: ['CO₂ Collectors', 'Simulation Lab', 'Bilan Carbone'],
    metrics: [
      { value: '89%', label: 'Capture efficiency', sub: 'vs 71% baseline' },
      { value: '-21%', label: 'Energy penalty', sub: '3.8 → 3.0 GJ/tonne' },
      { value: '+180K t', label: 'Additional CO₂ captured', sub: 'annually' },
      { value: '$5.5M', label: 'Annual OPEX saved', sub: 'verified' },
    ],
    quote:
      "We had accepted 71% capture efficiency as our operational ceiling. Three months after deploying Photocarb's optimization loop, we haven't seen it drop below 87%. The ROI calculation took less than 10 minutes.",
    author: 'Plant Director, Ras Laffan LNG Operations',
  },
  {
    id: 'qse-group',
    org: 'QSE-Listed Industrial Conglomerate',
    industry: 'Multi-sector',
    location: 'Doha, Qatar + UAE + Saudi Arabia',
    color: 'var(--color-info)',
    img: 'https://images.unsplash.com/photo-1647850601157-acf84a40ca96?w=1000&h=650&fit=crop&auto=format',
    imgAlt: 'West Bay skyline, Doha, Qatar',
    challenge:
      '12-subsidiary industrial conglomerate headquartered in Qatar with UAE and Saudi operations. Inconsistent carbon accounting across subsidiaries, a failed first IFRS S2 readiness assessment, a 9-month manual reporting cycle, and QAR 1.1M in annual consultant spend.',
    solution:
      'Photocarb deployed Bilan Carbone group-wide across all 12 subsidiaries, plus ESG & Sustainability reporting with IFRS S2 disclosure and Supply Chain Carbon integration for the top 15 suppliers.',
    chips: ['Bilan Carbone', 'ESG & Sustainability', 'Supply Chain Carbon'],
    metrics: [
      { value: '48 hrs', label: 'Reporting cycle', sub: 'vs 9 months' },
      { value: 'Investment-grade', label: 'IFRS S2 readiness', sub: 'vs fail rating' },
      { value: 'QAR 1.1M', label: 'Consultant spend saved', sub: 'annually' },
      { value: 'QAR 2.3B', label: 'Green bond eligible', sub: 'financing unlocked' },
    ],
    quote:
      'The ESG rating improvement unlocked green financing terms that would have been unavailable to us 18 months ago. Photocarb\'s platform paid for five years of its subscription cost in the first bond issuance alone.',
    author: 'Group CFO, Doha',
  },
  {
    id: 'ipp-mesaieed',
    org: 'Independent Power Producer — Mesaieed',
    industry: 'Power Generation',
    location: 'Mesaieed, Qatar',
    color: 'var(--color-lime)',
    img: 'https://images.unsplash.com/photo-1759384395680-c16405aee554?w=1000&h=650&fit=crop&auto=format',
    imgAlt: 'Power plant cooling tower emitting steam under a dramatic sky',
    challenge:
      '2,400 MW combined-cycle power generation facility with annual Scope 1 emissions of ~4.2M tonnes CO₂e. Carbon-intensity reporting was required for an offtake agreement with a European utility customer, but there was no real-time generation-level emissions tracking — manual quarterly reports were failing contractual accuracy requirements.',
    solution:
      'Photocarb deployed CO₂ Collectors with generation unit-level monitoring across 8 gas turbines and 4 steam turbines, plus Bilan Carbone with customized Scope 2 calculation reports for the offtaker contract.',
    chips: ['CO₂ Collectors', 'Bilan Carbone', 'AI Reports'],
    metrics: [
      { value: 'Real-time', label: 'Emissions data frequency', sub: 'vs quarterly' },
      { value: '±2.8%', label: 'Carbon intensity accuracy', sub: 'vs ±22% estimated' },
      { value: 'Renewed', label: 'Offtaker contract', sub: 'with premium terms' },
      { value: 'T+1 day', label: 'Scope 2 reports', sub: 'vs 6-week manual lag' },
    ],
    quote:
      'Our European offtaker was weeks away from activating contract review clauses over our emissions reporting quality. Photocarb\'s platform not only resolved that situation — it gave us a documented carbon intensity advantage over competing suppliers.',
    author: 'Director of Commercial, IPP Operator',
  },
]

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find(c => c.id === id)
}

/* ---- Arabic localization ---- */
interface CaseStudyAr {
  org: string
  industry: string
  location: string
  challenge: string
  solution: string
  chips: string[]
  metrics: { value?: string; label: string; sub?: string }[]
  quote: string
  author: string
}

const CASE_STUDIES_AR: Record<string, CaseStudyAr> = {
  mesaieed: {
    org: 'مجمّع مسيعيد للبتروكيماويات',
    industry: 'البتروكيماويات',
    location: 'مدينة مسيعيد الصناعية، قطر',
    challenge:
      'منشأة بتروكيماوية واسعة النطاق تضم 14 وحدة إنتاج وتُصدِر نحو 3.2 مليون طن من مكافئ ثاني أكسيد الكربون سنويًا. غياب تام للرؤية الكربونية المتكاملة عبر الوحدات، ولا بيانات موثوقة للنطاق 1 لإقرار CBAM، مع انكشاف مقدَّر على CBAM بنحو 8.1 مليون ريال قطري سنويًا. واستهلكت دورة الإبلاغ اليدوية الممتدة 14 شهرًا جهد 3.2 موظف بدوام كامل.',
    solution:
      'نشرت فوتوكارب مجمّعات CO₂ عبر الوحدات الـ14 بـ87 عقدة استشعار، إضافةً إلى تقارير البصمة الكربونية والامتثال لـ CBAM — بتطبيق كامل خلال 6 أسابيع دون أي تعطيل للإنتاج.',
    chips: ['مجمّعات CO₂', 'البصمة الكربونية', 'الامتثال لـ CBAM'],
    metrics: [
      { label: 'دقة بيانات النطاق 1', sub: 'مقابل ~65% تقديري' },
      { label: 'كثافة الانبعاثات', sub: 'مقابل خط الأساس' },
      { label: 'وفورات CBAM', sub: 'متوقعة للسنة الأولى' },
      { label: 'دورة الإبلاغ', sub: 'مقابل 14 شهرًا' },
    ],
    quote:
      'ظننّا أن الامتثال الكربوني سيظل بندًا دائمًا في هيكل تكاليفنا. حوّلته فوتوكارب إلى ميزة تنافسية. وفوراتنا من CBAM في السنة الأولى غطّت تكلفة المنصة أربع مرات.',
    author: 'نائب رئيس العمليات، مجمّع مسيعيد للبتروكيماويات',
  },
  'ras-laffan': {
    org: 'عمليات الغاز المسال في راس لفان',
    industry: 'الغاز المسال',
    location: 'مدينة راس لفان الصناعية، قطر',
    challenge:
      'منشأة لإنتاج الغاز المسال مزوّدة بوحدة احتجاز كربون بعد الاحتراق تعمل بـ71% من كفاءة الاحتجاز المقدَّرة. عقوبة طاقة مرتفعة عند 3.8 غيغاجول/طن CO₂ — أعلى بنسبة 18% من التصميم — مع توقفات غير مخطّطة بمتوسط 340 ساعة سنويًا وغياب الرؤية اللحظية للاحتجاز.',
    solution:
      'نشرت فوتوكارب مجمّعات CO₂ عبر وحدة احتجاز الكربون للمراقبة اللحظية، مع مختبر المحاكاة لنمذجة نقاط ضبط أجهزة غسل الأمين وضبطها باستمرار — اكتمل التطبيق خلال 3 أسابيع دون انقطاع العملية.',
    chips: ['مجمّعات CO₂', 'مختبر المحاكاة', 'البصمة الكربونية'],
    metrics: [
      { label: 'كفاءة الاحتجاز', sub: 'مقابل 71% خط الأساس' },
      { label: 'عقوبة الطاقة', sub: '3.8 ← 3.0 غيغاجول/طن' },
      { label: 'كربون إضافي محتجَز', sub: 'سنويًا' },
      { label: 'وفورات تشغيلية سنوية', sub: 'موثّقة' },
    ],
    quote:
      'كنّا قد قبِلنا كفاءة احتجاز 71% كسقف تشغيلي لنا. وبعد ثلاثة أشهر من تفعيل حلقة تحسين فوتوكارب، لم نرها تنخفض دون 87%. واستغرق حساب العائد أقل من 10 دقائق.',
    author: 'مدير المنشأة، عمليات الغاز المسال في راس لفان',
  },
  'qse-group': {
    org: 'تكتل صناعي مدرج في بورصة قطر',
    industry: 'متعدد القطاعات',
    location: 'الدوحة، قطر + الإمارات + السعودية',
    challenge:
      'تكتل صناعي يضم 12 شركة تابعة ومقره قطر مع عمليات في الإمارات والسعودية. محاسبة كربونية غير متسقة عبر الشركات التابعة، وفشل في أول تقييم لجاهزية IFRS S2، ودورة إبلاغ يدوية تمتد 9 أشهر، وإنفاق استشاري سنوي بقيمة 1.1 مليون ريال قطري.',
    solution:
      'نشرت فوتوكارب البصمة الكربونية على مستوى المجموعة عبر جميع الشركات الـ12، إضافةً إلى تقارير ESG والاستدامة مع إفصاح IFRS S2 وتكامل كربون سلسلة التوريد لأكبر 15 موردًا.',
    chips: ['البصمة الكربونية', 'ESG والاستدامة', 'كربون سلسلة التوريد'],
    metrics: [
      { label: 'دورة الإبلاغ', sub: 'مقابل 9 أشهر' },
      { value: 'درجة استثمارية', label: 'جاهزية IFRS S2', sub: 'مقابل تقدير راسب' },
      { label: 'إنفاق استشاري موفَّر', sub: 'سنويًا' },
      { label: 'مؤهّل لسندات خضراء', sub: 'تمويل مُتاح' },
    ],
    quote:
      'فتح تحسّن تصنيف ESG شروط تمويل أخضر لم تكن متاحة لنا قبل 18 شهرًا. وقد غطّت منصة فوتوكارب تكلفة اشتراك خمس سنوات في أول إصدار سندات وحده.',
    author: 'المدير المالي للمجموعة، الدوحة',
  },
  'ipp-mesaieed': {
    org: 'منتج طاقة مستقل — مسيعيد',
    industry: 'توليد الطاقة',
    location: 'مسيعيد، قطر',
    challenge:
      'منشأة توليد طاقة بدورة مركّبة قدرتها 2400 ميغاواط بانبعاثات نطاق 1 سنوية تبلغ نحو 4.2 مليون طن CO₂e. كان الإبلاغ عن كثافة الكربون مطلوبًا لاتفاقية شراء مع عميل مرافق أوروبي، لكن لم يكن هناك تتبّع لحظي للانبعاثات على مستوى التوليد — وكانت التقارير الفصلية اليدوية تفشل في تلبية متطلبات الدقة التعاقدية.',
    solution:
      'نشرت فوتوكارب مجمّعات CO₂ مع مراقبة على مستوى وحدة التوليد عبر 8 توربينات غازية و4 توربينات بخارية، إضافةً إلى البصمة الكربونية مع تقارير حساب النطاق 2 المخصّصة لعقد المشتري.',
    chips: ['مجمّعات CO₂', 'البصمة الكربونية', 'تقارير الذكاء الاصطناعي'],
    metrics: [
      { value: 'لحظي', label: 'تواتر بيانات الانبعاثات', sub: 'مقابل فصلي' },
      { label: 'دقة كثافة الكربون', sub: 'مقابل ±22% تقديري' },
      { value: 'مُجدَّد', label: 'عقد المشتري', sub: 'بشروط تفضيلية' },
      { value: 'اليوم التالي', label: 'تقارير النطاق 2', sub: 'مقابل تأخر يدوي 6 أسابيع' },
    ],
    quote:
      'كان مشترينا الأوروبي على بُعد أسابيع من تفعيل بنود مراجعة العقد بسبب جودة إبلاغنا عن الانبعاثات. لم تحل منصة فوتوكارب ذلك الموقف فحسب — بل منحتنا ميزة موثّقة في كثافة الكربون على الموردين المنافسين.',
    author: 'مدير الشؤون التجارية، مشغّل منتج طاقة مستقل',
  },
}

export function localizeCaseStudy(cs: CaseStudy, lang: 'en' | 'ar'): CaseStudy {
  if (lang !== 'ar') return cs
  const a = CASE_STUDIES_AR[cs.id]
  if (!a) return cs
  return {
    ...cs,
    org: a.org,
    industry: a.industry,
    location: a.location,
    challenge: a.challenge,
    solution: a.solution,
    chips: a.chips,
    metrics: cs.metrics.map((m, i) => ({
      value: a.metrics[i]?.value ?? m.value,
      label: a.metrics[i]?.label ?? m.label,
      sub: a.metrics[i]?.sub ?? m.sub,
    })),
    quote: a.quote,
    author: a.author,
  }
}

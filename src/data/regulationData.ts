export type Level = 'red' | 'orange' | 'green'
export interface Bi { en: string; ar: string }
export interface Reg { level: Level; name: Bi; cbam: Bi; tax: Bi; esg: Bi; reporting: Bi }

const LEVEL_LABEL: Record<Level, Bi> = {
  red: { en: 'Carbon pricing & border measures in force', ar: 'تسعير كربون وتدابير حدودية سارية' },
  orange: { en: 'Regulation phasing in', ar: 'تنظيم قيد التطبيق التدريجي' },
  green: { en: 'National framework developing', ar: 'إطار وطني قيد التطوير' },
}
export function levelLabel(l: Level, lang: 'en' | 'ar') { return LEVEL_LABEL[l][lang] }

/* Shared generic profiles ------------------------------------------------- */

const GEN_GREEN = {
  cbam: { en: 'No domestic border mechanism. Exporters of CBAM goods (steel, cement, aluminium, fertilizers, hydrogen) to the EU face CBAM from Jan 2026 — verified facility data avoids punitive default rates.', ar: 'لا آلية حدودية محلية. يواجه مصدّرو سلع CBAM (الصلب، الإسمنت، الألمنيوم، الأسمدة، الهيدروجين) إلى الاتحاد الأوروبي آلية CBAM من يناير 2026 — البيانات الموثّقة تتجنّب المعدلات الافتراضية العقابية.' },
  tax: { en: 'No carbon tax or ETS in force; climate policy and carbon-market frameworks under development.', ar: 'لا ضريبة كربون ولا نظام تداول ساري؛ سياسات المناخ وأطر سوق الكربون قيد التطوير.' },
  esg: { en: 'Corporate sustainability disclosure largely voluntary; stock-exchange ESG guidance emerging.', ar: 'إفصاح استدامة الشركات طوعي إلى حد كبير؛ إرشادات ESG للبورصات في طور الظهور.' },
  reporting: { en: 'National GHG inventory reported to the UNFCCC under NDC commitments; no mandatory corporate GHG reporting yet.', ar: 'جرد وطني لغازات الدفيئة يُرفع لاتفاقية المناخ ضمن المساهمات المحددة وطنيًا؛ لا إبلاغ إلزامي للشركات بعد.' },
}

const GEN_ORANGE = {
  cbam: GEN_GREEN.cbam,
  tax: { en: 'Carbon-market or carbon-pricing legislation adopted and phasing in.', ar: 'تشريعات لسوق الكربون أو تسعيره معتمدة وقيد التطبيق التدريجي.' },
  esg: { en: 'Sustainability disclosure guidance issued for listed companies; moving toward mandatory.', ar: 'صدرت إرشادات إفصاح استدامة للشركات المدرجة؛ تتجه نحو الإلزام.' },
  reporting: { en: 'MRV systems being established; sectoral emission reporting emerging.', ar: 'أنظمة قياس وتحقق قيد الإنشاء؛ إبلاغ قطاعي عن الانبعاثات في طور الظهور.' },
}

const EU_PROFILE = {
  cbam: { en: 'CBAM definitive regime live since Jan 2026: importers buy CBAM certificates on steel, cement, aluminium, fertilizers, hydrogen & electricity.', ar: 'النظام النهائي لـ CBAM سارٍ منذ يناير 2026: يشتري المستوردون شهادات CBAM على الصلب والإسمنت والألمنيوم والأسمدة والهيدروجين والكهرباء.' },
  tax: { en: 'EU ETS ≈ €70–90/tCO₂ (2025–26). ETS2 for buildings & road transport from 2027.', ar: 'نظام التداول الأوروبي ≈ 70–90 يورو/طن (2025–26). ETS2 للمباني والنقل البري من 2027.' },
  esg: { en: 'CSRD in force — double-materiality reporting under ESRS, phased 2024–2028; EU Taxonomy alignment.', ar: 'توجيه CSRD سارٍ — إبلاغ الأهمية المزدوجة وفق ESRS على مراحل 2024–2028؛ توافق مع التصنيف الأوروبي.' },
  reporting: { en: 'Quarterly CBAM declarations; annual verified ETS emission reports; assured CSRD statements.', ar: 'إقرارات CBAM فصلية؛ تقارير انبعاثات سنوية موثّقة لنظام التداول؛ بيانات CSRD مع توكيد.' },
}

/* Country names (EN/AR) --------------------------------------------------- */

const NAMES: Record<string, Bi> = {
  // Gulf & MENA focus
  qa: { en: 'Qatar', ar: 'قطر' }, ae: { en: 'United Arab Emirates', ar: 'الإمارات' }, sa: { en: 'Saudi Arabia', ar: 'السعودية' },
  kw: { en: 'Kuwait', ar: 'الكويت' }, bh: { en: 'Bahrain', ar: 'البحرين' }, om: { en: 'Oman', ar: 'عُمان' },
  // Global
  gb: { en: 'United Kingdom', ar: 'المملكة المتحدة' }, tr: { en: 'Türkiye', ar: 'تركيا' }, us: { en: 'United States', ar: 'الولايات المتحدة' },
  ca: { en: 'Canada', ar: 'كندا' }, cn: { en: 'China', ar: 'الصين' }, in: { en: 'India', ar: 'الهند' }, jp: { en: 'Japan', ar: 'اليابان' },
  kr: { en: 'South Korea', ar: 'كوريا الجنوبية' }, au: { en: 'Australia', ar: 'أستراليا' }, ru: { en: 'Russia', ar: 'روسيا' }, br: { en: 'Brazil', ar: 'البرازيل' },
  // EU members
  de: { en: 'Germany', ar: 'ألمانيا' }, fr: { en: 'France', ar: 'فرنسا' }, it: { en: 'Italy', ar: 'إيطاليا' }, es: { en: 'Spain', ar: 'إسبانيا' },
  pt: { en: 'Portugal', ar: 'البرتغال' }, nl: { en: 'Netherlands', ar: 'هولندا' }, be: { en: 'Belgium', ar: 'بلجيكا' }, at: { en: 'Austria', ar: 'النمسا' },
  pl: { en: 'Poland', ar: 'بولندا' }, se: { en: 'Sweden', ar: 'السويد' }, fi: { en: 'Finland', ar: 'فنلندا' }, dk: { en: 'Denmark', ar: 'الدنمارك' },
  ie: { en: 'Ireland', ar: 'أيرلندا' }, gr: { en: 'Greece', ar: 'اليونان' }, cz: { en: 'Czechia', ar: 'التشيك' }, ro: { en: 'Romania', ar: 'رومانيا' },
  hu: { en: 'Hungary', ar: 'المجر' }, bg: { en: 'Bulgaria', ar: 'بلغاريا' }, sk: { en: 'Slovakia', ar: 'سلوفاكيا' }, hr: { en: 'Croatia', ar: 'كرواتيا' },
  si: { en: 'Slovenia', ar: 'سلوفينيا' }, lt: { en: 'Lithuania', ar: 'ليتوانيا' }, lv: { en: 'Latvia', ar: 'لاتفيا' }, ee: { en: 'Estonia', ar: 'إستونيا' },
  lu: { en: 'Luxembourg', ar: 'لوكسمبورغ' }, cy: { en: 'Cyprus', ar: 'قبرص' }, mt: { en: 'Malta', ar: 'مالطا' },
  // Africa (all)
  dz: { en: 'Algeria', ar: 'الجزائر' }, ao: { en: 'Angola', ar: 'أنغولا' }, bj: { en: 'Benin', ar: 'بنين' }, bw: { en: 'Botswana', ar: 'بوتسوانا' },
  bf: { en: 'Burkina Faso', ar: 'بوركينا فاسو' }, bi: { en: 'Burundi', ar: 'بوروندي' }, cm: { en: 'Cameroon', ar: 'الكاميرون' }, cv: { en: 'Cape Verde', ar: 'الرأس الأخضر' },
  cf: { en: 'Central African Republic', ar: 'أفريقيا الوسطى' }, td: { en: 'Chad', ar: 'تشاد' }, km: { en: 'Comoros', ar: 'جزر القمر' }, cg: { en: 'Congo', ar: 'الكونغو' },
  cd: { en: 'DR Congo', ar: 'الكونغو الديمقراطية' }, dj: { en: 'Djibouti', ar: 'جيبوتي' }, eg: { en: 'Egypt', ar: 'مصر' }, gq: { en: 'Equatorial Guinea', ar: 'غينيا الاستوائية' },
  er: { en: 'Eritrea', ar: 'إريتريا' }, sz: { en: 'Eswatini', ar: 'إسواتيني' }, et: { en: 'Ethiopia', ar: 'إثيوبيا' }, ga: { en: 'Gabon', ar: 'الغابون' },
  gm: { en: 'Gambia', ar: 'غامبيا' }, gh: { en: 'Ghana', ar: 'غانا' }, gn: { en: 'Guinea', ar: 'غينيا' }, gw: { en: 'Guinea-Bissau', ar: 'غينيا بيساو' },
  ci: { en: "Côte d'Ivoire", ar: 'ساحل العاج' }, ke: { en: 'Kenya', ar: 'كينيا' }, ls: { en: 'Lesotho', ar: 'ليسوتو' }, lr: { en: 'Liberia', ar: 'ليبيريا' },
  ly: { en: 'Libya', ar: 'ليبيا' }, mg: { en: 'Madagascar', ar: 'مدغشقر' }, mw: { en: 'Malawi', ar: 'مالاوي' }, ml: { en: 'Mali', ar: 'مالي' },
  mr: { en: 'Mauritania', ar: 'موريتانيا' }, mu: { en: 'Mauritius', ar: 'موريشيوس' }, ma: { en: 'Morocco', ar: 'المغرب' }, mz: { en: 'Mozambique', ar: 'موزمبيق' },
  na: { en: 'Namibia', ar: 'ناميبيا' }, ne: { en: 'Niger', ar: 'النيجر' }, ng: { en: 'Nigeria', ar: 'نيجيريا' }, rw: { en: 'Rwanda', ar: 'رواندا' },
  st: { en: 'São Tomé & Príncipe', ar: 'ساو تومي وبرينسيبي' }, sn: { en: 'Senegal', ar: 'السنغال' }, sc: { en: 'Seychelles', ar: 'سيشل' }, sl: { en: 'Sierra Leone', ar: 'سيراليون' },
  so: { en: 'Somalia', ar: 'الصومال' }, somaliland: { en: 'Somaliland', ar: 'أرض الصومال' }, za: { en: 'South Africa', ar: 'جنوب أفريقيا' }, ss: { en: 'South Sudan', ar: 'جنوب السودان' },
  sd: { en: 'Sudan', ar: 'السودان' }, tz: { en: 'Tanzania', ar: 'تنزانيا' }, tg: { en: 'Togo', ar: 'توغو' }, tn: { en: 'Tunisia', ar: 'تونس' },
  ug: { en: 'Uganda', ar: 'أوغندا' }, zm: { en: 'Zambia', ar: 'زامبيا' }, zw: { en: 'Zimbabwe', ar: 'زيمبابوي' },
}

/* Specific detailed profiles --------------------------------------------- */

type Detail = Omit<Reg, 'name'>

const SPECIFIC: Record<string, Detail> = {
  qa: {
    level: 'green',
    cbam: { en: 'No border mechanism. Exporters to the EU face full CBAM liability from Jan 2026 — verified facility data cuts default rates by 30–60%.', ar: 'لا آلية حدودية. يواجه المصدّرون إلى الاتحاد الأوروبي التزام CBAM الكامل من يناير 2026 — البيانات الموثّقة تخفض المعدلات الافتراضية 30–60%.' },
    tax: { en: 'No carbon tax or ETS. National carbon registry launched 2024; pricing mechanisms under study.', ar: 'لا ضريبة كربون ولا نظام تداول. أُطلق السجل الوطني للكربون 2024؛ آليات التسعير قيد الدراسة.' },
    esg: { en: 'QSE ESG guidance for listed companies (voluntary, moving toward mandatory). Qatar Vision 2030 sustainability pillars.', ar: 'إرشادات ESG لبورصة قطر للشركات المدرجة (طوعية وتتجه نحو الإلزام). ركائز الاستدامة في رؤية قطر 2030.' },
    reporting: { en: 'Annual GHG inventory to MECC mandatory for major industrial emitters since 2024 (NCAP: −25% intensity by 2030).', ar: 'جرد سنوي إلزامي لغازات الدفيئة إلى وزارة البيئة لكبار المنبعثين منذ 2024 (الخطة الوطنية: −25% كثافة بحلول 2030).' },
  },
  ae: {
    level: 'orange',
    cbam: { en: 'No border mechanism. EU-bound aluminium and steel exports fully exposed to EU CBAM.', ar: 'لا آلية حدودية. صادرات الألمنيوم والصلب إلى أوروبا معرّضة بالكامل لـ CBAM الأوروبية.' },
    tax: { en: 'No carbon tax yet; national carbon credit scheme and pricing policy under development toward Net Zero 2050.', ar: 'لا ضريبة كربون بعد؛ نظام وطني لأرصدة الكربون وسياسة تسعير قيد التطوير نحو الحياد 2050.' },
    esg: { en: 'Federal Climate Law (Decree-Law 11/2024) — first in the Gulf to mandate corporate emissions management.', ar: 'قانون التغير المناخي الاتحادي (11/2024) — الأول خليجيًا في إلزام الشركات بإدارة الانبعاثات.' },
    reporting: { en: 'Mandatory MRV for large emitters from May 2025; SCA sustainability disclosure for listed companies.', ar: 'قياس وإبلاغ وتحقق إلزامي لكبار المنبعثين من مايو 2025؛ إفصاح استدامة لهيئة الأوراق المالية للشركات المدرجة.' },
  },
  sa: {
    level: 'green',
    cbam: { en: 'No border mechanism. Petrochemical and fertilizer exports to the EU in CBAM scope.', ar: 'لا آلية حدودية. صادرات البتروكيماويات والأسمدة إلى أوروبا ضمن نطاق CBAM.' },
    tax: { en: 'No carbon tax. Regional Voluntary Carbon Market (RVCMC) operating; Circular Carbon Economy framework.', ar: 'لا ضريبة كربون. سوق الكربون الطوعي الإقليمي يعمل؛ إطار الاقتصاد الكربوني الدائري.' },
    esg: { en: 'Tadawul ESG disclosure guidelines (voluntary). Net Zero 2060 with sector pathways.', ar: 'إرشادات إفصاح ESG لتداول (طوعية). حياد كربوني 2060 بمسارات قطاعية.' },
    reporting: { en: 'No mandatory corporate GHG reporting yet; national inventory via UNFCCC commitments.', ar: 'لا إبلاغ إلزامي للشركات بعد؛ جرد وطني عبر التزامات اتفاقية المناخ.' },
  },
  tn: {
    level: 'green',
    cbam: { en: 'No border mechanism — but cement, fertilizer and steel exporters to the EU are among the most CBAM-exposed in MENA.', ar: 'لا آلية حدودية — لكن مصدّري الإسمنت والأسمدة والصلب إلى أوروبا من الأكثر انكشافًا على CBAM في المنطقة.' },
    tax: { en: 'Energy taxation with a carbon component; no ETS. Updated NDC targets −45% carbon intensity by 2030.', ar: 'ضرائب طاقة بمكوّن كربوني؛ لا نظام تداول. المساهمة الوطنية المحدّثة تستهدف −45% كثافة بحلول 2030.' },
    esg: { en: 'CSR law (2018) for large companies; central-bank sustainability guidance for the financial sector.', ar: 'قانون المسؤولية المجتمعية (2018) للشركات الكبرى؛ إرشادات استدامة للبنك المركزي للقطاع المالي.' },
    reporting: { en: 'No mandatory GHG reporting; MRV system being built under Article 6 readiness programs.', ar: 'لا إبلاغ إلزامي؛ نظام قياس وتحقق قيد البناء ضمن برامج جاهزية المادة 6.' },
  },
  gb: {
    level: 'red',
    cbam: { en: 'UK CBAM confirmed for Jan 2027 — aluminium, cement, fertilizers, hydrogen, iron & steel.', ar: 'CBAM البريطانية مؤكّدة ليناير 2027 — الألمنيوم والإسمنت والأسمدة والهيدروجين والحديد والصلب.' },
    tax: { en: 'UK ETS ≈ £35–50/tCO₂; linking discussions with EU ETS ongoing.', ar: 'نظام التداول البريطاني ≈ 35–50 جنيهًا/طن؛ محادثات ربط مع النظام الأوروبي جارية.' },
    esg: { en: 'ISSB-based UK Sustainability Reporting Standards; TCFD already mandatory for large companies.', ar: 'معايير استدامة بريطانية مبنية على ISSB؛ TCFD إلزامي أصلًا للشركات الكبرى.' },
    reporting: { en: 'SECR energy & carbon reporting; verified ETS reports; transition plans expected for listed firms.', ar: 'إبلاغ SECR للطاقة والكربون؛ تقارير موثّقة لنظام التداول؛ خطط تحوّل متوقعة للشركات المدرجة.' },
  },
  tr: {
    level: 'orange',
    cbam: { en: 'Aligning with EU CBAM to protect export competitiveness; national ETS designed as a CBAM response.', ar: 'مواءمة مع CBAM الأوروبية لحماية تنافسية الصادرات؛ نظام تداول وطني صُمِّم كاستجابة لها.' },
    tax: { en: 'National ETS legislated 2024 — pilot phase 2025–26, full compliance to follow.', ar: 'نظام تداول وطني شُرِّع 2024 — مرحلة تجريبية 2025–26 ثم الامتثال الكامل.' },
    esg: { en: 'TSRS (ISSB-aligned) sustainability standards mandatory for large companies from FY2024.', ar: 'معايير TSRS (متوافقة مع ISSB) إلزامية للشركات الكبرى من السنة المالية 2024.' },
    reporting: { en: 'MRV regulation in force since 2015; verified facility-level emission reports annually.', ar: 'لائحة القياس والتحقق سارية منذ 2015؛ تقارير انبعاثات سنوية موثّقة على مستوى المنشأة.' },
  },
  us: {
    level: 'orange',
    cbam: { en: 'No federal border mechanism; carbon-based import fee bills (e.g. FPFA) recurring in Congress.', ar: 'لا آلية حدودية فدرالية؛ مشاريع قوانين رسوم استيراد كربونية تتكرر في الكونغرس.' },
    tax: { en: 'No federal carbon price. California cap-and-trade ≈ $40/t; RGGI in northeastern states.', ar: 'لا سعر كربون فدرالي. نظام كاليفورنيا ≈ 40 دولارًا/طن؛ RGGI في الولايات الشمالية الشرقية.' },
    esg: { en: 'SEC climate rule stayed; California SB 253/261 mandate climate disclosure for large firms operating in-state.', ar: 'قاعدة SEC المناخية موقوفة؛ قانونا كاليفورنيا SB 253/261 يلزمان الشركات الكبرى العاملة في الولاية بالإفصاح المناخي.' },
    reporting: { en: 'EPA GHGRP: mandatory reporting for facilities >25k tCO₂e/yr since 2010.', ar: 'برنامج EPA: إبلاغ إلزامي للمنشآت فوق 25 ألف طن سنويًا منذ 2010.' },
  },
  ca: {
    level: 'red',
    cbam: { en: 'Border carbon adjustment under formal consultation, aligned with the EU approach.', ar: 'تعديل كربوني حدودي قيد التشاور الرسمي بما يتماشى مع النهج الأوروبي.' },
    tax: { en: 'Industrial carbon price (OBPS) ≈ CAD 95/t in 2026, rising to CAD 170/t by 2030.', ar: 'سعر كربون صناعي ≈ 95 دولارًا كنديًا/طن في 2026، يرتفع إلى 170 بحلول 2030.' },
    esg: { en: 'CSDS (ISSB-aligned) climate disclosure phasing in from 2025 for large issuers.', ar: 'إفصاح مناخي CSDS (متوافق مع ISSB) يُطبَّق تدريجيًا من 2025 لكبار المُصدِرين.' },
    reporting: { en: 'Federal GHGRP for facilities >10k tCO₂e/yr; provincial verified reports under OBPS.', ar: 'برنامج فدرالي للمنشآت فوق 10 آلاف طن سنويًا؛ تقارير موثّقة على مستوى المقاطعات.' },
  },
  cn: {
    level: 'orange',
    cbam: { en: 'No border mechanism; steel and aluminium exporters actively preparing verified data for EU CBAM.', ar: 'لا آلية حدودية؛ مصدّرو الصلب والألمنيوم يجهّزون بيانات موثّقة لـ CBAM الأوروبية.' },
    tax: { en: 'National ETS ≈ ¥90–100/t — expanded 2024–25 to steel, cement & aluminium (world’s largest by volume).', ar: 'نظام التداول الوطني ≈ 90–100 يوان/طن — توسّع 2024–25 ليشمل الصلب والإسمنت والألمنيوم (الأكبر عالميًا حجمًا).' },
    esg: { en: 'Mandatory sustainability disclosure for major listed companies by 2026 (SSE/SZSE/BSE guidelines).', ar: 'إفصاح استدامة إلزامي لكبرى الشركات المدرجة بحلول 2026 (إرشادات البورصات الثلاث).' },
    reporting: { en: 'Verified annual emission reports for ETS-covered enterprises; provincial MRV infrastructure.', ar: 'تقارير انبعاثات سنوية موثّقة للمنشآت المشمولة بنظام التداول؛ بنية قياس وتحقق على مستوى المقاطعات.' },
  },
  in: {
    level: 'orange',
    cbam: { en: 'No border mechanism; negotiating CBAM treatment with the EU — steel exporters highly exposed.', ar: 'لا آلية حدودية؛ تفاوض مع الاتحاد الأوروبي حول معاملة CBAM — مصدّرو الصلب معرّضون بشدة.' },
    tax: { en: 'Carbon Credit Trading Scheme (CCTS): compliance phase for heavy industry from 2026.', ar: 'نظام تداول أرصدة الكربون: مرحلة الامتثال للصناعات الثقيلة من 2026.' },
    esg: { en: 'BRSR mandatory for top-1000 listed companies; BRSR Core assurance phasing in for the largest.', ar: 'تقرير BRSR إلزامي لأكبر 1000 شركة مدرجة؛ توكيد BRSR الأساسي يُطبَّق تدريجيًا للأكبر.' },
    reporting: { en: 'PAT energy-efficiency scheme reporting; CCTS verified emission-intensity reports from 2026.', ar: 'إبلاغ ضمن نظام كفاءة الطاقة PAT؛ تقارير كثافة موثّقة ضمن نظام التداول من 2026.' },
  },
  jp: {
    level: 'orange',
    cbam: { en: 'No border mechanism; participating in international carbon-club discussions.', ar: 'لا آلية حدودية؛ تشارك في نقاشات نادي الكربون الدولي.' },
    tax: { en: 'GX-ETS mandatory for large emitters from FY2026; carbon levy on fossil-fuel importers from 2028.', ar: 'نظام GX-ETS إلزامي لكبار المنبعثين من السنة المالية 2026؛ رسم كربوني على مستوردي الوقود من 2028.' },
    esg: { en: 'SSBJ standards (ISSB-based) applying to Prime Market listed companies, phased from FY2027.', ar: 'معايير SSBJ (مبنية على ISSB) تُطبَّق على شركات السوق الرئيسي تدريجيًا من 2027.' },
    reporting: { en: 'Mandatory GHG accounting & reporting under the Energy Conservation Act for large emitters.', ar: 'محاسبة وإبلاغ إلزاميان لغازات الدفيئة بموجب قانون ترشيد الطاقة لكبار المنبعثين.' },
  },
  kr: {
    level: 'red',
    cbam: { en: 'No border mechanism; K-ETS reform designed to keep exporters CBAM-compatible.', ar: 'لا آلية حدودية؛ إصلاح K-ETS مصمَّم لإبقاء المصدّرين متوافقين مع CBAM.' },
    tax: { en: 'K-ETS since 2015 — covers ~73% of national emissions; tightening benchmarks phase 4 (2026–30).', ar: 'نظام K-ETS منذ 2015 — يغطي نحو 73% من الانبعاثات الوطنية؛ معايير أشد في المرحلة الرابعة (2026–30).' },
    esg: { en: 'KSSB sustainability disclosure for large listed companies phasing in from 2026.', ar: 'إفصاح استدامة KSSB لكبرى الشركات المدرجة تدريجيًا من 2026.' },
    reporting: { en: 'Verified annual emission reports mandatory for all K-ETS entities.', ar: 'تقارير انبعاثات سنوية موثّقة إلزامية لجميع منشآت K-ETS.' },
  },
  au: {
    level: 'orange',
    cbam: { en: 'Carbon-leakage review recommending a CBAM for cement and clinker imports.', ar: 'مراجعة تسرّب الكربون توصي بآلية حدودية لواردات الإسمنت والكلنكر.' },
    tax: { en: 'Safeguard Mechanism: declining baselines for 200+ largest facilities; ACCU price ≈ AUD 35–75.', ar: 'آلية الضمان: خطوط أساس متناقصة لأكبر 200+ منشأة؛ سعر ACCU ≈ 35–75 دولارًا أستراليًا.' },
    esg: { en: 'Mandatory climate reporting (AASB S2) from Jan 2025, phasing across company sizes to 2027.', ar: 'إبلاغ مناخي إلزامي (AASB S2) من يناير 2025، يتوسع حسب حجم الشركات حتى 2027.' },
    reporting: { en: 'NGER scheme: audited energy & emissions reporting since 2007 for large facilities.', ar: 'نظام NGER: إبلاغ مُدقَّق للطاقة والانبعاثات منذ 2007 للمنشآت الكبيرة.' },
  },
  // ── Key African economies ─────────────────────────────────────
  za: {
    level: 'orange',
    cbam: { en: 'No border mechanism; steel, aluminium and ferroalloy exporters among Africa’s most CBAM-exposed.', ar: 'لا آلية حدودية؛ مصدّرو الصلب والألمنيوم والسبائك الحديدية من الأكثر انكشافًا على CBAM في أفريقيا.' },
    tax: { en: 'Carbon Tax Act since 2019 — ≈ R190/tCO₂ (~$10); Phase 2 with rising rates and narrowing allowances from 2026.', ar: 'قانون ضريبة الكربون منذ 2019 — ≈ 190 راندًا/طن (~10 دولارات)؛ المرحلة الثانية بمعدلات مرتفعة ومخصصات أضيق من 2026.' },
    esg: { en: 'JSE Sustainability & Climate Disclosure Guidance; King IV governance code.', ar: 'إرشادات الإفصاح عن الاستدامة والمناخ لبورصة جوهانسبرغ؛ مدونة الحوكمة King IV.' },
    reporting: { en: 'Mandatory GHG reporting (NGERs) for large emitters; carbon-budget system being legislated.', ar: 'إبلاغ إلزامي لغازات الدفيئة (NGERs) لكبار المنبعثين؛ نظام موازنة كربونية قيد التشريع.' },
  },
  eg: {
    level: 'orange',
    cbam: { en: 'No border mechanism; fertilizer, steel and aluminium exporters exposed to EU CBAM.', ar: 'لا آلية حدودية؛ مصدّرو الأسمدة والصلب والألمنيوم معرّضون لـ CBAM الأوروبية.' },
    tax: { en: 'No carbon tax; Africa’s first regulated voluntary carbon market (EGX) launched 2024.', ar: 'لا ضريبة كربون؛ أُطلقت أول سوق كربون طوعي منظّم في أفريقيا (بورصة مصر) عام 2024.' },
    esg: { en: 'FRA mandatory ESG & TCFD disclosure for large listed and non-banking financial firms.', ar: 'إفصاح ESG وTCFD إلزامي من الهيئة العامة للرقابة المالية للشركات المدرجة الكبرى والمالية غير المصرفية.' },
    reporting: { en: 'National MRV under development; NDC updated to 2030 sector targets.', ar: 'نظام قياس وتحقق قيد التطوير؛ المساهمة الوطنية محدّثة بأهداف قطاعية حتى 2030.' },
  },
  ma: {
    level: 'orange',
    cbam: { en: 'Highly CBAM-exposed via phosphates, fertilizers and electricity exports to the EU; domestic carbon-pricing under study as a response.', ar: 'انكشاف عالٍ على CBAM عبر صادرات الفوسفات والأسمدة والكهرباء إلى أوروبا؛ تسعير كربون محلي قيد الدراسة كاستجابة.' },
    tax: { en: 'No carbon tax yet; strong renewables program (Noor); carbon-pricing roadmap in preparation.', ar: 'لا ضريبة كربون بعد؛ برنامج طاقة متجددة قوي (نور)؛ خارطة طريق لتسعير الكربون قيد الإعداد.' },
    esg: { en: 'AMMC ESG reporting guidance for listed companies; low-carbon strategy 2050.', ar: 'إرشادات إفصاح ESG من هيئة السوق للشركات المدرجة؛ استراتيجية منخفضة الكربون 2050.' },
    reporting: { en: 'MRV framework under construction; NDC targets −45.5% by 2030 (conditional).', ar: 'إطار قياس وتحقق قيد الإنشاء؛ المساهمة الوطنية تستهدف −45.5% بحلول 2030 (مشروط).' },
  },
  ng: {
    level: 'orange',
    cbam: { en: 'No border mechanism; growing steel and cement sectors monitoring EU CBAM exposure.', ar: 'لا آلية حدودية؛ قطاعا الصلب والإسمنت المتناميان يراقبان الانكشاف على CBAM الأوروبية.' },
    tax: { en: 'No carbon tax; Climate Change Act 2021 sets a national carbon budget and Net-Zero 2060; carbon-market framework developing.', ar: 'لا ضريبة كربون؛ قانون التغير المناخي 2021 يحدد موازنة كربونية وطنية وحيادًا 2060؛ إطار سوق كربون قيد التطوير.' },
    esg: { en: 'SEC/NGX sustainability disclosure guidelines for listed companies.', ar: 'إرشادات إفصاح استدامة من هيئة الأوراق المالية وبورصة نيجيريا للشركات المدرجة.' },
    reporting: { en: 'National carbon registry and MRV being established under the Climate Change Act.', ar: 'سجل كربون وطني ونظام قياس وتحقق قيد الإنشاء بموجب قانون التغير المناخي.' },
  },
  ke: {
    level: 'orange',
    cbam: { en: 'No border mechanism; horticulture and manufacturing exporters tracking EU requirements.', ar: 'لا آلية حدودية؛ مصدّرو البستنة والتصنيع يتابعون المتطلبات الأوروبية.' },
    tax: { en: 'No carbon tax; Climate Change (Amendment) Act 2023 regulates carbon markets — a continental leader in voluntary credits.', ar: 'لا ضريبة كربون؛ قانون تعديل التغير المناخي 2023 ينظّم أسواق الكربون — رائدة قاريًا في الأرصدة الطوعية.' },
    esg: { en: 'NSE ESG disclosure guidance manual for listed companies (2021).', ar: 'دليل إرشادات إفصاح ESG لبورصة نيروبي للشركات المدرجة (2021).' },
    reporting: { en: 'National GHG inventory and registry under the Climate Change Directorate.', ar: 'جرد وطني لغازات الدفيئة وسجل تحت مديرية التغير المناخي.' },
  },
  ci: {
    level: 'orange',
    cbam: { en: 'No border mechanism; cocoa, agri and emerging industry exporters watching EU rules (EUDR & CBAM).', ar: 'لا آلية حدودية؛ مصدّرو الكاكاو والزراعة والصناعة الناشئة يراقبون القواعد الأوروبية (EUDR وCBAM).' },
    tax: { en: 'No carbon tax; Article 6 carbon-market cooperation and national framework being piloted.', ar: 'لا ضريبة كربون؛ تعاون سوق الكربون بموجب المادة 6 وإطار وطني قيد التجربة.' },
    esg: { en: 'Regional BRVM sustainability guidance emerging for listed companies.', ar: 'إرشادات استدامة إقليمية من بورصة BRVM في طور الظهور للشركات المدرجة.' },
    reporting: { en: 'MRV and registry under development within NDC implementation.', ar: 'نظام قياس وتحقق وسجل قيد التطوير ضمن تنفيذ المساهمة الوطنية.' },
  },
  dz: {
    level: 'green',
    cbam: { en: 'No border mechanism; fertilizer, steel and cement exporters to the EU exposed to CBAM.', ar: 'لا آلية حدودية؛ مصدّرو الأسمدة والصلب والإسمنت إلى أوروبا معرّضون لـ CBAM.' },
    tax: { en: 'No carbon price; hydrocarbon-based economy; NDC and national climate plan under implementation.', ar: 'لا سعر كربون؛ اقتصاد قائم على المحروقات؛ المساهمة الوطنية والخطة المناخية قيد التنفيذ.' },
    esg: { en: 'Sustainability disclosure voluntary; early-stage ESG framework.', ar: 'إفصاح الاستدامة طوعي؛ إطار ESG في مرحلة مبكرة.' },
    reporting: { en: 'National GHG inventory via UNFCCC; no mandatory corporate reporting.', ar: 'جرد وطني لغازات الدفيئة عبر اتفاقية المناخ؛ لا إبلاغ إلزامي للشركات.' },
  },
  gh: {
    level: 'green',
    cbam: { en: 'No border mechanism; aluminium and cocoa-derived exports monitoring EU rules.', ar: 'لا آلية حدودية؛ صادرات الألمنيوم ومشتقات الكاكاو تراقب القواعد الأوروبية.' },
    tax: { en: 'No carbon tax; pioneer of Article 6.2 cooperation (first authorized transfer with Switzerland); carbon registry live.', ar: 'لا ضريبة كربون؛ رائدة في تعاون المادة 6.2 (أول تحويل مُرخَّص مع سويسرا)؛ سجل كربون قيد التشغيل.' },
    esg: { en: 'GSE sustainability disclosure guidance emerging.', ar: 'إرشادات إفصاح استدامة من بورصة غانا في طور الظهور.' },
    reporting: { en: 'Advanced national MRV and carbon registry supporting Article 6 transfers.', ar: 'نظام قياس وتحقق وطني متقدم وسجل كربون يدعم تحويلات المادة 6.' },
  },
  et: {
    level: 'green',
    cbam: { en: 'No border mechanism; limited EU industrial exports, low direct CBAM exposure.', ar: 'لا آلية حدودية؛ صادرات صناعية محدودة إلى أوروبا وانكشاف مباشر منخفض على CBAM.' },
    tax: { en: 'No carbon price; Climate-Resilient Green Economy (CRGE) strategy toward 2050.', ar: 'لا سعر كربون؛ استراتيجية الاقتصاد الأخضر المقاوم للمناخ (CRGE) حتى 2050.' },
    esg: { en: 'Sustainability disclosure voluntary; nascent capital-market framework.', ar: 'إفصاح الاستدامة طوعي؛ إطار سوق مالي ناشئ.' },
    reporting: { en: 'National GHG inventory via UNFCCC; MRV capacity building underway.', ar: 'جرد وطني لغازات الدفيئة عبر اتفاقية المناخ؛ بناء قدرات القياس والتحقق جارٍ.' },
  },
  sn: {
    level: 'green',
    cbam: { en: 'No border mechanism; phosphates and emerging gas sector monitoring EU rules.', ar: 'لا آلية حدودية؛ الفوسفات وقطاع الغاز الناشئ يراقبان القواعد الأوروبية.' },
    tax: { en: 'No carbon price; Article 6 cooperation and NDC implementation under way.', ar: 'لا سعر كربون؛ تعاون المادة 6 وتنفيذ المساهمة الوطنية جاريان.' },
    esg: { en: 'Regional BRVM sustainability guidance emerging.', ar: 'إرشادات استدامة إقليمية من بورصة BRVM في طور الظهور.' },
    reporting: { en: 'National GHG inventory via UNFCCC; MRV under development.', ar: 'جرد وطني لغازات الدفيئة عبر اتفاقية المناخ؛ نظام قياس وتحقق قيد التطوير.' },
  },
}

/* African countries — assign level (default green) ------------------------ */

const AFRICA_ISO = [
  'dz', 'ao', 'bj', 'bw', 'bf', 'bi', 'cm', 'cv', 'cf', 'td', 'km', 'cg', 'cd', 'dj', 'eg', 'gq',
  'er', 'sz', 'et', 'ga', 'gm', 'gh', 'gn', 'gw', 'ci', 'ke', 'ls', 'lr', 'ly', 'mg', 'mw', 'ml',
  'mr', 'mu', 'ma', 'mz', 'na', 'ne', 'ng', 'rw', 'st', 'sn', 'sc', 'sl', 'so', 'somaliland', 'za',
  'ss', 'sd', 'tz', 'tg', 'tn', 'ug', 'zm', 'zw',
]

const AFRICA_ORANGE = new Set(['za', 'eg', 'ma', 'ng', 'ke', 'ci'])

const EU_MEMBERS = [
  'de', 'fr', 'it', 'es', 'pt', 'nl', 'be', 'at', 'pl', 'se', 'fi', 'dk', 'ie', 'gr', 'cz', 'ro',
  'hu', 'bg', 'sk', 'hr', 'si', 'lt', 'lv', 'ee', 'lu', 'cy', 'mt',
]

/* Assemble the full registry --------------------------------------------- */

function build(): Record<string, Reg> {
  const reg: Record<string, Reg> = {}

  // Specific detailed entries
  for (const [iso, d] of Object.entries(SPECIFIC)) {
    if (NAMES[iso]) reg[iso] = { name: NAMES[iso], ...d }
  }

  // EU members share the EU profile (red)
  for (const iso of EU_MEMBERS) {
    if (!reg[iso] && NAMES[iso]) reg[iso] = { level: 'red', name: NAMES[iso], ...EU_PROFILE }
  }

  // Every African country gets a color + clickable detail
  for (const iso of AFRICA_ISO) {
    if (reg[iso]) continue
    const level: Level = AFRICA_ORANGE.has(iso) ? 'orange' : 'green'
    const gen = level === 'orange' ? GEN_ORANGE : GEN_GREEN
    reg[iso] = { level, name: NAMES[iso] ?? { en: iso.toUpperCase(), ar: iso.toUpperCase() }, ...gen }
  }

  return reg
}

export const REG: Record<string, Reg> = build()

/** Land countries with no regulatory entry render as neutral, non-clickable. */
export const HAS_REG = (iso: string) => iso in REG

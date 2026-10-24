// Vercel Edge Middleware: serves a lightweight, fully-tagged HTML snapshot to
// social/search crawlers that don't execute JavaScript (Facebook, Twitter/X,
// LinkedIn, WhatsApp, Slack, Telegram, Discord, plus classic search bots).
// Real visitors are untouched — they always get the normal React SPA.
//
// Why this exists: this site is a client-side-only SPA. Per-page title/
// description/OG tags are set by React after mount (see useDocumentMeta).
// Crawlers that don't run JS only ever see whatever is in the raw HTML,
// which is identical for every route. This middleware fixes that for the
// crawlers that matter for link-preview cards and non-JS indexing, without
// requiring a full server-rendering rewrite of the app.

export const config = {
  matcher: '/((?!api/|assets/|images/|favicon|robots.txt|sitemap.xml).*)',
}

const SITE_URL = 'https://www.photocarb.qa'
const OG_IMAGE = `${SITE_URL}/images/logo.png`
// Spellings people type when searching for the brand, Arabic included
const BRAND_ALT_NAMES = ['فوتوكارب', 'فوتو كارب', 'PhotoCarb', 'Photo Carb']

const BOT_UA = /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Slackbot|Discordbot|SkypeUriPreview|redditbot|Pinterest|vkShare|W3C_Validator|Googlebot|bingbot|DuckDuckBot|Applebot|Bytespider|Baiduspider|YandexBot/i

interface PageMeta {
  title: string
  description: string
}

const SERVICES: Record<string, PageMeta> = {
  'co2-collectors': {
    title: 'CO₂ Collectors | Photocarb',
    description: "Clip-on CO₂ collector hardware for existing infrastructure — ATEX-certified, no production downtime. Live emissions data from your facility in 48 hours.",
  },
  'bilan-carbone': {
    title: 'Bilan Carbone | Photocarb',
    description: 'Your complete Scope 1, 2, and 3 carbon balance sheet, calculated from real operational data and aligned to the GHG Protocol.',
  },
  'esg-reports': {
    title: 'ESG & Sustainability Reports | Photocarb',
    description: 'Auto-generated, board-ready ESG and sustainability reports — IFRS S2 climate disclosure, audit-proof, delivered in 48 hours.',
  },
  cbam: {
    title: 'CBAM Compliance | Photocarb',
    description: 'Full CBAM declaration automation for exporters. Photocarb calculates actual embedded carbon and generates EU-format declarations automatically.',
  },
  'supply-chain': {
    title: 'Supply Chain Carbon | Photocarb',
    description: 'Map your full supply chain carbon footprint across all 15 Scope 3 categories, with supplier-level data collection and hotspot identification.',
  },
  'simulation-lab': {
    title: 'Simulation Lab | Photocarb',
    description: 'Simulate process changes, fuel switches, and carbon capture upgrades before you invest — instant cost and emissions modeling.',
  },
  lca: {
    title: 'LCA | Photocarb',
    description: 'Certified product carbon footprint analysis, from raw material extraction to factory gate or full cradle-to-grave.',
  },
  'ai-reports': {
    title: 'AI Reports | Photocarb',
    description: 'Automated regulatory reports — CBAM declarations, IFRS S2 disclosures, ISO 14064 inventories — generated on schedule or on demand.',
  },
}

const LEGAL: Record<string, PageMeta> = {
  'privacy-policy': {
    title: 'Privacy Policy | Photocarb',
    description: 'How Photocarb collects, uses, and protects personal and operational data.',
  },
  'terms-of-service': {
    title: 'Terms of Service | Photocarb',
    description: 'The terms governing your use of the Photocarb website and platform.',
  },
  'data-processing-agreement': {
    title: 'Data Processing Agreement | Photocarb',
    description: 'How Photocarb processes personal data on behalf of its customers.',
  },
  'cookie-policy': {
    title: 'Cookie Policy | Photocarb',
    description: 'How Photocarb uses cookies and similar technologies on its website.',
  },
}

const STATIC_PAGES: Record<string, PageMeta> = {
  '/': {
    title: 'Photocarb | AI-Powered Carbon Intelligence Platform',
    description: 'Photocarb unifies CO₂ hardware sensing, carbon accounting, ESG reporting, and CBAM compliance in one platform — built for industrial and commercial operators anywhere in the world.',
  },
  '/services': {
    title: 'Carbon Management Services | Photocarb',
    description: 'Eight integrated capabilities — CO₂ hardware sensing, bilan carbone, ESG reporting, CBAM compliance, supply chain carbon, LCA, and AI-generated regulatory reports, delivered in 48 hours.',
  },
  '/about': {
    title: 'About Photocarb | Our Story, Mission & Leadership',
    description: 'Founded by industrial engineers and AI researchers, Photocarb is headquartered in Doha, Qatar, with an engineering and R&D center in Sousse, Tunisia — building the next generation of ClimateTech for industry everywhere.',
  },
  '/technology': {
    title: 'Our Technology | AI-Powered Emissions Sensing & Capture Optimization | Photocarb',
    description: 'Every AI model in Photocarb is trained on real process historian data, validated against physical measurements, and deployed with explainable outputs.',
  },
  '/compliance': {
    title: 'CBAM, IFRS S2 & Qatar NCAP Compliance | Photocarb',
    description: 'Explore carbon regulations by country — CBAM, carbon tax, ESG requirements, and reporting rules — and see how Photocarb keeps exporters audit-ready, anywhere in the world.',
  },
  '/case-studies': {
    title: 'Case Studies | Real Results from Industrial Operators | Photocarb',
    description: 'Proof from the field — see how industrial and commercial sites cut emissions, passed CBAM audits, and turned carbon data into measurable savings with Photocarb.',
  },
  '/contact': {
    title: 'Contact Photocarb | Book a Demo | AI Carbon Intelligence Platform',
    description: "Book a free 45-minute discovery session with Photocarb's team. Get a preliminary CBAM exposure assessment and live platform walkthrough for your sector.",
  },
}

// Arabic metadata, served for ?lang=ar so searches for "فوتوكارب" land on an Arabic page
const SERVICES_AR: Record<string, PageMeta> = {
  'co2-collectors': {
    title: 'مجمّعات ثاني أكسيد الكربون | فوتوكارب Photocarb',
    description: 'أجهزة تجميع ثاني أكسيد الكربون تُركَّب على البنية التحتية القائمة، معتمدة ATEX ودون توقف الإنتاج. بيانات انبعاثات حيّة من منشأتك خلال 48 ساعة.',
  },
  'bilan-carbone': {
    title: 'الميزانية الكربونية (Bilan Carbone) | فوتوكارب Photocarb',
    description: 'ميزانيتك الكربونية الكاملة للنطاقات 1 و2 و3، محسوبة من بيانات تشغيلية حقيقية ومتوافقة مع بروتوكول غازات الدفيئة.',
  },
  'esg-reports': {
    title: 'تقارير ESG والاستدامة | فوتوكارب Photocarb',
    description: 'تقارير ESG واستدامة جاهزة لمجالس الإدارة تُولَّد تلقائياً، متوافقة مع IFRS S2 وقابلة للتدقيق، تُسلَّم خلال 48 ساعة.',
  },
  cbam: {
    title: 'الامتثال لآلية تعديل حدود الكربون CBAM | فوتوكارب Photocarb',
    description: 'أتمتة كاملة لإقرارات CBAM للمصدّرين. تحسب فوتوكارب الكربون المضمَّن الفعلي وتُعدّ الإقرارات بصيغة الاتحاد الأوروبي تلقائياً.',
  },
  'supply-chain': {
    title: 'كربون سلسلة الإمداد | فوتوكارب Photocarb',
    description: 'ارسم البصمة الكربونية لسلسلة إمدادك عبر فئات النطاق 3 الخمس عشرة، مع جمع بيانات الموردين وتحديد أبرز مصادر الانبعاثات.',
  },
  'simulation-lab': {
    title: 'مختبر المحاكاة | فوتوكارب Photocarb',
    description: 'حاكِ تغييرات العمليات وتبديل الوقود وترقيات احتجاز الكربون قبل الاستثمار، مع نمذجة فورية للتكلفة والانبعاثات.',
  },
  lca: {
    title: 'تقييم دورة الحياة LCA | فوتوكارب Photocarb',
    description: 'تحليل معتمد للبصمة الكربونية للمنتج، من استخراج المواد الخام حتى بوابة المصنع أو طوال دورة الحياة الكاملة.',
  },
  'ai-reports': {
    title: 'تقارير الذكاء الاصطناعي | فوتوكارب Photocarb',
    description: 'تقارير تنظيمية مؤتمتة: إقرارات CBAM وإفصاحات IFRS S2 وجرد ISO 14064، تُولَّد وفق جدول أو عند الطلب.',
  },
}

const LEGAL_AR: Record<string, PageMeta> = {
  'privacy-policy': {
    title: 'سياسة الخصوصية | فوتوكارب Photocarb',
    description: 'كيف تجمع فوتوكارب البيانات الشخصية والتشغيلية وتستخدمها وتحميها.',
  },
  'terms-of-service': {
    title: 'شروط الخدمة | فوتوكارب Photocarb',
    description: 'الشروط التي تحكم استخدامك لموقع ومنصة فوتوكارب.',
  },
  'data-processing-agreement': {
    title: 'اتفاقية معالجة البيانات | فوتوكارب Photocarb',
    description: 'كيف تعالج فوتوكارب البيانات الشخصية نيابةً عن عملائها.',
  },
  'cookie-policy': {
    title: 'سياسة ملفات تعريف الارتباط | فوتوكارب Photocarb',
    description: 'كيف تستخدم فوتوكارب ملفات تعريف الارتباط والتقنيات المشابهة على موقعها.',
  },
}

const STATIC_PAGES_AR: Record<string, PageMeta> = {
  '/': {
    title: 'فوتوكارب Photocarb | منصة الذكاء الكربوني المدعومة بالذكاء الاصطناعي',
    description: 'فوتوكارب تجمع استشعار ثاني أكسيد الكربون بالأجهزة، والمحاسبة الكربونية، وتقارير ESG، والامتثال لآلية CBAM في منصة واحدة للمشغّلين الصناعيين والتجاريين. الدوحة، قطر وسوسة، تونس.',
  },
  '/services': {
    title: 'خدمات إدارة الكربون | فوتوكارب Photocarb',
    description: 'ثماني قدرات متكاملة: استشعار ثاني أكسيد الكربون، الميزانية الكربونية، تقارير ESG، الامتثال لـ CBAM، كربون سلسلة الإمداد، تقييم دورة الحياة، وتقارير تنظيمية بالذكاء الاصطناعي خلال 48 ساعة.',
  },
  '/about': {
    title: 'عن فوتوكارب | قصتنا ورسالتنا وقيادتنا',
    description: 'أسّسها مهندسون صناعيون وباحثون في الذكاء الاصطناعي. يقع مقر فوتوكارب في الدوحة، قطر، مع مركز للهندسة والبحث والتطوير في سوسة، تونس، لبناء الجيل القادم من تقنيات المناخ للصناعة.',
  },
  '/technology': {
    title: 'تقنيتنا | استشعار الانبعاثات بالذكاء الاصطناعي | فوتوكارب Photocarb',
    description: 'كل نموذج ذكاء اصطناعي في فوتوكارب مدرَّب على بيانات تشغيلية حقيقية، ومُتحقَّق منه مقابل قياسات فعلية، ويقدّم مخرجات قابلة للتفسير.',
  },
  '/compliance': {
    title: 'الامتثال لـ CBAM و IFRS S2 | فوتوكارب Photocarb',
    description: 'استكشف لوائح الكربون حسب الدولة: CBAM وضريبة الكربون ومتطلبات ESG وقواعد الإفصاح، واعرف كيف تُبقي فوتوكارب المصدّرين جاهزين للتدقيق.',
  },
  '/case-studies': {
    title: 'دراسات الحالة | نتائج حقيقية | فوتوكارب Photocarb',
    description: 'أدلة من الميدان: كيف خفّضت منشآت صناعية وتجارية انبعاثاتها واجتازت تدقيق CBAM وحوّلت بيانات الكربون إلى وفورات ملموسة مع فوتوكارب.',
  },
  '/contact': {
    title: 'اتصل بفوتوكارب | احجز عرضاً توضيحياً',
    description: 'احجز جلسة استكشافية مجانية مدتها 45 دقيقة مع فريق فوتوكارب، واحصل على تقييم أولي لتعرّضك لآلية CBAM وجولة حيّة على المنصة.',
  },
}

type Lang = 'en' | 'ar'

function resolveMeta(pathname: string, lang: Lang): PageMeta {
  const pages = lang === 'ar' ? STATIC_PAGES_AR : STATIC_PAGES
  const services = lang === 'ar' ? SERVICES_AR : SERVICES
  const legal = lang === 'ar' ? LEGAL_AR : LEGAL

  if (pages[pathname]) return pages[pathname]

  const serviceMatch = pathname.match(/^\/services\/([^/]+)\/?$/)
  if (serviceMatch && services[serviceMatch[1]]) return services[serviceMatch[1]]

  const legalMatch = pathname.match(/^\/legal\/([^/]+)\/?$/)
  if (legalMatch && legal[legalMatch[1]]) return legal[legalMatch[1]]

  return pages['/']
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderSnapshot(pathname: string, lang: Lang): string {
  const meta = resolveMeta(pathname, lang)
  const enUrl = `${SITE_URL}${pathname}`
  const arUrl = `${enUrl}?lang=ar`
  const canonical = lang === 'ar' ? arUrl : enUrl
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const altNames = JSON.stringify(BRAND_ALT_NAMES)

  return `<!doctype html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" type="image/png" href="/images/logo.png" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${canonical}" />
<link rel="alternate" hreflang="en" href="${enUrl}" />
<link rel="alternate" hreflang="ar" href="${arUrl}" />
<link rel="alternate" hreflang="x-default" href="${enUrl}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${lang === 'ar' ? 'فوتوكارب Photocarb' : 'Photocarb'}" />
<meta property="og:locale" content="${lang === 'ar' ? 'ar_QA' : 'en_US'}" />
<meta property="og:locale:alternate" content="${lang === 'ar' ? 'en_US' : 'ar_QA'}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${OG_IMAGE}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${OG_IMAGE}" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Organization","name":"Photocarb","alternateName":${altNames},"legalName":"Photocarb Technologies LLC","url":"${SITE_URL}","logo":"${OG_IMAGE}"}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebSite","name":"Photocarb","alternateName":${altNames},"url":"${SITE_URL}/","inLanguage":["en","ar"]}
</script>
</head>
<body>
<h1>${title}</h1>
<p>${description}</p>
<p>Photocarb · فوتوكارب</p>
<p><a href="${canonical}">${lang === 'ar' ? 'الانتقال إلى موقع فوتوكارب' : 'Continue to Photocarb'}</a> · <a href="${lang === 'ar' ? enUrl : arUrl}">${lang === 'ar' ? 'English' : 'العربية'}</a></p>
</body>
</html>`
}

export default function middleware(request: Request) {
  const ua = request.headers.get('user-agent') || ''
  if (!BOT_UA.test(ua)) return // real visitors: pass through untouched

  const { pathname, searchParams } = new URL(request.url)
  const lang: Lang = searchParams.get('lang') === 'ar' ? 'ar' : 'en'
  return new Response(renderSnapshot(pathname, lang), {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

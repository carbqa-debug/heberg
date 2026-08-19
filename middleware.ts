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

function resolveMeta(pathname: string): PageMeta {
  if (STATIC_PAGES[pathname]) return STATIC_PAGES[pathname]

  const serviceMatch = pathname.match(/^\/services\/([^/]+)\/?$/)
  if (serviceMatch && SERVICES[serviceMatch[1]]) return SERVICES[serviceMatch[1]]

  const legalMatch = pathname.match(/^\/legal\/([^/]+)\/?$/)
  if (legalMatch && LEGAL[legalMatch[1]]) return LEGAL[legalMatch[1]]

  return STATIC_PAGES['/']
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderSnapshot(pathname: string): string {
  const meta = resolveMeta(pathname)
  const canonical = `${SITE_URL}${pathname}`
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" type="image/png" href="/images/logo.png" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Photocarb" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${OG_IMAGE}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${OG_IMAGE}" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Organization","name":"Photocarb","legalName":"Photocarb Technologies LLC","url":"${SITE_URL}","logo":"${OG_IMAGE}"}
</script>
</head>
<body>
<h1>${title}</h1>
<p>${description}</p>
<p><a href="${canonical}">Continue to Photocarb</a></p>
</body>
</html>`
}

export default function middleware(request: Request) {
  const ua = request.headers.get('user-agent') || ''
  if (!BOT_UA.test(ua)) return // real visitors: pass through untouched

  const { pathname } = new URL(request.url)
  return new Response(renderSnapshot(pathname), {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

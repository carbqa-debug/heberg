import type { VercelRequest, VercelResponse } from '@vercel/node'
import { detailRow, escapeHtml, renderBrandedEmail, sendResendEmail } from './_lib/email'

interface ContactPayload {
  firstName?: string
  lastName?: string
  company?: string
  jobTitle?: string
  email?: string
  phone?: string
  sector?: string
  companySize?: string
  interests?: string[]
  language?: string
  callTime?: string
  referral?: string
  context?: string
}

const CONFIRMATION_COPY = {
  en: {
    subject: 'Your Photocarb discovery call request',
    heading: 'Session request received.',
    intro: (firstName: string) => `Hi ${escapeHtml(firstName)},`,
    body: 'Thanks for reaching out to Photocarb. A Doha-based solutions engineer will confirm your slot within 4 business hours. In the meantime, here’s what your discovery call will cover:',
    items: [
      'A 60-minute technical walkthrough with a carbon engineer',
      'A preliminary CBAM exposure estimate for your facility',
      'A data integration feasibility assessment (SCADA, ERP)',
    ],
    cta: 'Visit Photocarb',
    dir: 'ltr' as const,
  },
  ar: {
    subject: 'طلبك لجلسة استكشافية مع فوتوكارب',
    heading: 'تم استلام طلب الجلسة.',
    intro: (firstName: string) => `مرحبًا ${escapeHtml(firstName)}،`,
    body: 'شكرًا لتواصلك مع فوتوكارب. سيؤكّد أحد مهندسي الحلول لدينا في الدوحة موعدك خلال 4 ساعات عمل. في هذه الأثناء، إليك ما ستتضمّنه جلستك الاستكشافية:',
    items: [
      'جلسة تقنية مدتها 60 دقيقة مع مهندس كربون',
      'تقدير أولي لتعرّضك لآلية CBAM',
      'تقييم لجاهزية تكامل البيانات (SCADA وERP)',
    ],
    cta: 'زيارة موقع فوتوكارب',
    dir: 'rtl' as const,
  },
}

function isConfirmationLang(v: string | undefined): v is 'en' | 'ar' {
  return v === 'ar' || v === 'en'
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@photocarb.qa'
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Photocarb Website <onboarding@resend.dev>'
  const siteUrl = process.env.SITE_URL || 'https://www.photocarb.qa'

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return res.status(500).json({ error: 'Contact form is not configured yet.' })
  }

  const body = req.body as ContactPayload
  if (!body || !body.firstName || !body.lastName || !body.company || !body.jobTitle) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  // Honeypot: silently accept but drop obvious bots.
  if ((body as Record<string, unknown>).website) {
    return res.status(200).json({ ok: true })
  }

  const interests = Array.isArray(body.interests) ? body.interests.join(', ') : ''

  // Internal notification — sent to the Photocarb team.
  const internalBodyHtml = `
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      ${detailRow('Name', `${body.firstName} ${body.lastName}`)}
      ${detailRow('Company', body.company)}
      ${detailRow('Job title', body.jobTitle)}
      ${detailRow('Email', body.email)}
      ${detailRow('Phone', body.phone)}
      ${detailRow('Sector', body.sector)}
      ${detailRow('Company size', body.companySize)}
      ${detailRow('Interested in', interests)}
      ${detailRow('Preferred language', body.language)}
      ${detailRow('Requested call time', body.callTime)}
      ${detailRow('Referral source', body.referral)}
    </table>
    ${body.context ? `<p style="margin:16px 0 0;font-size:13px;color:#57685F;">Notes</p><p style="margin:4px 0 0;font-size:14px;color:#161F1B;white-space:pre-wrap;">${escapeHtml(body.context)}</p>` : ''}
  `

  const internalHtml = renderBrandedEmail({
    heading: 'New Discovery Call Request',
    bodyHtml: internalBodyHtml,
    ctaLabel: body.email ? 'Reply to lead' : undefined,
    ctaHref: body.email ? `mailto:${body.email}` : undefined,
  })

  const sends: Promise<boolean>[] = [
    sendResendEmail({
      apiKey,
      from: fromEmail,
      to: [toEmail],
      subject: `New discovery call request — ${body.company}`,
      html: internalHtml,
      replyTo: body.email,
    }),
  ]

  // Confirmation — sent back to the person who submitted the form, localized to their preference.
  if (body.email) {
    const lang = body.language === 'العربية' ? 'ar' : 'en'
    const copy = CONFIRMATION_COPY[isConfirmationLang(lang) ? lang : 'en']
    const confirmationBodyHtml = `
      <p style="margin:0 0 12px;font-size:14px;color:#161F1B;">${copy.intro(body.firstName!)}</p>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#161F1B;">${copy.body}</p>
      <ul style="margin:0;padding:0 0 0 18px;font-size:13.5px;line-height:1.9;color:#57685F;">
        ${copy.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    `
    const confirmationHtml = renderBrandedEmail({
      heading: copy.heading,
      bodyHtml: confirmationBodyHtml,
      ctaLabel: copy.cta,
      ctaHref: siteUrl,
      dir: copy.dir,
    })
    sends.push(
      sendResendEmail({
        apiKey,
        from: fromEmail,
        to: [body.email],
        subject: copy.subject,
        html: confirmationHtml,
      })
    )
  }

  const [internalOk] = await Promise.all(sends)

  if (!internalOk) {
    return res.status(502).json({ error: 'Failed to send your request. Please try again or email us directly.' })
  }

  return res.status(200).json({ ok: true })
}

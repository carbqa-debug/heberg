import type { VercelRequest, VercelResponse } from '@vercel/node'
import { renderBrandedEmail, sendResendEmail } from './_lib/email'

interface NewsletterPayload {
  email?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
    return res.status(500).json({ error: 'Newsletter signup is not configured yet.' })
  }

  const body = req.body as NewsletterPayload
  if (!body?.email || !isValidEmail(body.email)) {
    return res.status(400).json({ error: 'A valid email address is required.' })
  }

  const internalHtml = renderBrandedEmail({
    heading: 'New Newsletter Subscriber',
    bodyHtml: `<p style="margin:0;font-size:14px;color:#161F1B;">A new visitor subscribed to regulatory updates:</p>
      <p style="margin:8px 0 0;font-size:15px;font-weight:600;color:#158A76;">${body.email.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p>`,
  })

  const welcomeHtml = renderBrandedEmail({
    heading: "You're subscribed.",
    bodyHtml: `<p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#161F1B;">Thanks for subscribing to Photocarb's regulatory updates. We'll only email you when it matters — new CBAM guidance, IFRS S2 developments, and Gulf carbon policy changes that affect your industry.</p>
      <p style="margin:0;font-size:13.5px;color:#57685F;">No spam, ever. You can unsubscribe at any time.</p>`,
    ctaLabel: 'Explore the platform',
    ctaHref: siteUrl,
  })

  const [internalOk] = await Promise.all([
    sendResendEmail({
      apiKey,
      from: fromEmail,
      to: [toEmail],
      subject: 'New newsletter subscriber',
      html: internalHtml,
      replyTo: body.email,
    }),
    sendResendEmail({
      apiKey,
      from: fromEmail,
      to: [body.email],
      subject: "You're subscribed to Photocarb updates",
      html: welcomeHtml,
    }),
  ])

  if (!internalOk) {
    return res.status(502).json({ error: 'Failed to subscribe. Please try again.' })
  }

  return res.status(200).json({ ok: true })
}

import type { VercelRequest, VercelResponse } from '@vercel/node'

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

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return res.status(500).json({ error: 'Newsletter signup is not configured yet.' })
  }

  const body = req.body as NewsletterPayload
  if (!body?.email || !isValidEmail(body.email)) {
    return res.status(400).json({ error: 'A valid email address is required.' })
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: body.email,
        subject: 'New newsletter subscriber',
        html: `<p style="font-family:system-ui,sans-serif;font-size:14px;color:#111827;">New newsletter signup: <strong>${body.email}</strong></p>`,
      }),
    })

    if (!resendRes.ok) {
      const detail = await resendRes.text()
      console.error('Resend API error:', resendRes.status, detail)
      return res.status(502).json({ error: 'Failed to subscribe. Please try again.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Newsletter signup failed:', err)
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' })
  }
}

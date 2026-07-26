import type { VercelRequest, VercelResponse } from '@vercel/node'

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

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function row(label: string, value: string | undefined) {
  if (!value) return ''
  return `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:4px 0;font-size:13px;color:#111827;">${escapeHtml(value)}</td></tr>`
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
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;">
      <h2 style="margin:0 0 16px;font-size:18px;color:#111827;">New Discovery Call Request</h2>
      <table cellpadding="0" cellspacing="0">
        ${row('Name', `${body.firstName} ${body.lastName}`)}
        ${row('Company', body.company)}
        ${row('Job title', body.jobTitle)}
        ${row('Email', body.email)}
        ${row('Phone', body.phone)}
        ${row('Sector', body.sector)}
        ${row('Company size', body.companySize)}
        ${row('Interested in', interests)}
        ${row('Preferred language', body.language)}
        ${row('Requested call time', body.callTime)}
        ${row('Referral source', body.referral)}
      </table>
      ${body.context ? `<p style="margin:16px 0 0;font-size:13px;color:#6b7280;">Notes</p><p style="margin:4px 0 0;font-size:14px;color:#111827;white-space:pre-wrap;">${escapeHtml(body.context)}</p>` : ''}
    </div>
  `.trim()

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
        reply_to: body.email || undefined,
        subject: `New discovery call request — ${body.company}`,
        html,
      }),
    })

    if (!resendRes.ok) {
      const detail = await resendRes.text()
      console.error('Resend API error:', resendRes.status, detail)
      return res.status(502).json({ error: 'Failed to send your request. Please try again or email us directly.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form send failed:', err)
    return res.status(500).json({ error: 'Failed to send your request. Please try again or email us directly.' })
  }
}

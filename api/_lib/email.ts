const SITE_URL = process.env.SITE_URL || 'https://www.photocarb.qa'
const LOGO_URL = `${SITE_URL}/images/logo.png`

const BRAND = {
  primary: '#158A76',
  primaryDeep: '#0E6B5B',
  textPrimary: '#161F1B',
  textSecondary: '#57685F',
  bg: '#F6F9F8',
  bgSecondary: '#EBF2EE',
  border: '#DCE6E0',
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function detailRow(label: string, value: string | undefined): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:${BRAND.textSecondary};font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;font-size:13px;color:${BRAND.textPrimary};">${escapeHtml(value)}</td>
  </tr>`
}

interface BrandedEmailOptions {
  preheader?: string
  heading: string
  bodyHtml: string
  ctaLabel?: string
  ctaHref?: string
  dir?: 'ltr' | 'rtl'
}

/** Wraps content in Photocarb's branded email shell — logo header, teal accent, footer. */
export function renderBrandedEmail({ preheader, heading, bodyHtml, ctaLabel, ctaHref, dir = 'ltr' }: BrandedEmailOptions): string {
  const align = dir === 'rtl' ? 'right' : 'left'
  return `<!doctype html>
<html dir="${dir}" lang="${dir === 'rtl' ? 'ar' : 'en'}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>` : ''}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BRAND.border};">
            <tr>
              <td style="background:linear-gradient(135deg,${BRAND.primary},${BRAND.primaryDeep});padding:24px 32px;" align="${align}">
                <img src="${LOGO_URL}" alt="Photocarb" width="34" height="34" style="display:inline-block;vertical-align:middle;border-radius:8px;" />
                <span style="display:inline-block;vertical-align:middle;margin-${dir === 'rtl' ? 'right' : 'left'}:10px;color:#ffffff;font-size:17px;font-weight:700;letter-spacing:-0.01em;">Photocarb</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;" align="${align}">
                <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:${BRAND.textPrimary};">${escapeHtml(heading)}</h1>
                ${bodyHtml}
                ${ctaLabel && ctaHref ? `<div style="margin-top:24px;"><a href="${ctaHref}" style="display:inline-block;background:${BRAND.primary};color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:999px;font-weight:600;font-size:14px;">${escapeHtml(ctaLabel)}</a></div>` : ''}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background:${BRAND.bgSecondary};border-top:1px solid ${BRAND.border};" align="${align}">
                <p style="margin:0;font-size:11.5px;color:${BRAND.textSecondary};">Photocarb Technologies LLC &middot; Doha, Qatar &middot; Sousse, Tunisia</p>
                <p style="margin:4px 0 0;font-size:11.5px;"><a href="${SITE_URL}" style="color:${BRAND.primary};text-decoration:none;">www.photocarb.qa</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

interface SendEmailArgs {
  apiKey: string
  from: string
  to: string[]
  subject: string
  html: string
  replyTo?: string
}

/** Sends via Resend's HTTP API. Returns true on success; logs and returns false on failure (never throws). */
export async function sendResendEmail({ apiKey, from, to, subject, html, replyTo }: SendEmailArgs): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html, reply_to: replyTo || undefined }),
    })
    if (!res.ok) {
      const detail = await res.text()
      console.error('Resend API error:', res.status, detail)
      return false
    }
    return true
  } catch (err) {
    console.error('Resend send failed:', err)
    return false
  }
}

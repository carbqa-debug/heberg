import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://www.photocarb.qa'
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo.png`

function setMeta(selector: string, attr: string, attrValue: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null
  const prev = el?.getAttribute(el.tagName === 'LINK' ? 'href' : 'content') ?? null
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta') as HTMLMetaElement | HTMLLinkElement
    el.setAttribute(attr, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', content)
  return { el, prev }
}

/** Sets the document title, meta description, canonical URL, and Open Graph / Twitter
 * Card tags for the current page (client-side SPA meta — reverts on unmount). */
export function useDocumentMeta(title: string, description?: string, ogImage?: string) {
  const location = useLocation()

  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const canonicalUrl = `${SITE_URL}${location.pathname}`
    const image = ogImage || DEFAULT_OG_IMAGE

    const entries: { el: HTMLMetaElement | HTMLLinkElement; prev: string | null }[] = []
    entries.push(setMeta('meta[name="description"]', 'name', 'description', description || ''))
    entries.push(setMeta('link[rel="canonical"]', 'rel', 'canonical', canonicalUrl))
    entries.push(setMeta('meta[property="og:title"]', 'property', 'og:title', title))
    entries.push(setMeta('meta[property="og:description"]', 'property', 'og:description', description || ''))
    entries.push(setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl))
    entries.push(setMeta('meta[property="og:image"]', 'property', 'og:image', image))
    entries.push(setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image'))
    entries.push(setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title))
    entries.push(setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description || ''))
    entries.push(setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image))

    return () => {
      document.title = prevTitle
      for (const { el, prev } of entries) {
        if (prev !== null) el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', prev)
      }
    }
  }, [title, description, ogImage, location.pathname])
}

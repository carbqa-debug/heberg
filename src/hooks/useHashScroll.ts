import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Smooth-scrolls to the element matching the current URL hash, e.g. after
 * navigating from another page via a Link like `/#global-recognition`. */
export function useHashScroll() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => clearTimeout(t)
  }, [location.pathname, location.hash])
}

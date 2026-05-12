/**
 * useSEO.js
 * Hook React pour gérer dynamiquement les balises SEO (<title>, <meta>)
 * Utile si votre SPA a plusieurs sections/routes
 *
 * Usage :
 *   import { useSEO } from './hooks/useSEO'
 *   useSEO({ title: 'Mes Projets', description: '...' })
 */

import { useEffect } from 'react'

const SITE_NAME = 'Portfolio MHR'
const BASE_URL = 'https://randriatsarafara-miandrisoa-hoby.vercel.app'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

/**
 * @param {Object} options
 * @param {string} [options.title]        - Titre de la page (sans le nom du site)
 * @param {string} [options.description]  - Meta description (150-160 chars)
 * @param {string} [options.image]        - URL absolue de l'image OG
 * @param {string} [options.url]          - URL canonique de la page
 * @param {string} [options.type]         - Type OG (website, article…)
 */
export function useSEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
} = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    // ── <title>
    document.title = fullTitle

    // ── Helper pour créer/mettre à jour une balise meta
    const setMeta = (selector, content) => {
      if (!content) return
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attr, val] = selector.replace(/[\[\]]/g, '').split('=')
        el.setAttribute(attr.trim(), val?.replace(/['"]/g, '') || '')
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // ── Meta standard
    setMeta('meta[name="description"]', description)

    // ── Open Graph
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:image"]', image)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[property="og:type"]', type)

    // ── Twitter Card
    setMeta('meta[name="twitter:title"]', fullTitle)
    setMeta('meta[name="twitter:description"]', description)
    setMeta('meta[name="twitter:image"]', image)

    // ── Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, image, url, type])
}

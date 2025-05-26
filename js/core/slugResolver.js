// ./core/slugResolver.js
// Detecta el slug desde la URL: ?slug=..., ?id=..., o pathname

import { appConfig } from '../config/appConfig.js';

export async function resolveSlugFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  const id = urlParams.get('id');

  if (slug) return slug;

  if (id) {
    try {
      const res = await fetch(`/api/resolve-slug?id=${id}`);
      const data = await res.json();
      return data?.slug || null;
    } catch {
      return null;
    }
  }

  const path = window.location.pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/');
  const lastSegment = path[path.length - 1];

  if (
    !lastSegment ||
    lastSegment.endsWith('.html') ||
    appConfig.excludedSlugs.includes(lastSegment)
  ) {
    return null;
  }

  return lastSegment;
}
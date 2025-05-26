// ./helpers/mergeInlineStyles.js
// Fusión inteligente de estilos inline, con prioridad a override

import { logDebug } from './debugLogger.js';

/**
 * Fusiona dos cadenas de estilo inline, eliminando conflictos.
 * Si una propiedad existe en ambos, se toma la de override.
 *
 * @param {string} base - Estilos heredados desde theme
 * @param {string} override - Estilos definidos en page.json
 * @returns {string} - Estilos fusionados
 */
export function mergeInlineStyles(base, override) {
  const safeBase = typeof base === 'string' ? base : '';
  const safeOverride = typeof override === 'string' ? override : '';

  const toObj = str =>
    Object.fromEntries(
      str
        .split(';')
        .map(s => s.trim())
        .filter(Boolean)
        .map(rule => {
          const [prop, val] = rule.split(':').map(s => s.trim());
          return [prop, val];
        })
    );

  const baseObj = toObj(safeBase);
  const overrideObj = toObj(safeOverride);

  for (const key of Object.keys(overrideObj)) {
    delete baseObj[key];
  }

  const merged = { ...baseObj, ...overrideObj };
  const result = Object.entries(merged)
    .map(([k, v]) => `${k}:${v}`)
    .join(';');

  logDebug('inheritance', 'mergeInlineStyles', `🎨 Fusión de estilos:\n  ⬅ base:     ${safeBase}\n  ➡ override: ${safeOverride}\n  ✅ result:   ${result}`);

  return result;
}
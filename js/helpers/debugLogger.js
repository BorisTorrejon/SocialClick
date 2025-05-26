// ./helpers/debugLogger.js
// Función central de logging con control por área y módulo

import { logConfig } from '../config/logConfig.js';

/**
 * Muestra logs según configuración.
 * @param {string} area - Ej: 'system', 'modules'
 * @param {string} source - Archivo/módulo: 'index', 'icons', etc.
 * @param {string} message - Texto a mostrar
 * @param {string} level - 'info' (default), 'warn', 'error'
 */
export function logDebug(area, source, message, level = 'info') {
  if (!logConfig.enabled) return;
  if (!logConfig.areas[area]) return;
  if (!logConfig.levels.includes(level)) return;

  if (area === 'modules' && !logConfig.modules?.[source]) return;

  const prefix = `${logConfig.prefix}/${source}`;

  switch (level) {
    case 'warn':
      console.warn(`${prefix} ⚠️ ${message}`);
      break;
    case 'error':
      console.error(`${prefix} ❌ ${message}`);
      break;
    default:
      console.log(`${prefix} 🔹 ${message}`);
  }
}
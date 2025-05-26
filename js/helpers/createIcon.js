// ./helpers/createIcon.js
import { logDebug } from './debugLogger.js';

/**
 * Crea un <i> con ícono Bootstrap y atributos opcionales
 * @param {string} name  - Nombre del ícono (sin "bi-")
 * @param {string} cls   - Clases ya mergeadas
 * @param {string} style - Estilo inline ya mergeado
 * @returns {HTMLElement|null}
 */
export function createIcon(name = '', cls = '', style = '') {
  if (!name) {
    logDebug('helpers', 'createIcon', '⛔ No se creó ícono (name vacío)', 'warn');
    return null;
  }

  const i = document.createElement('i');
  i.classList.add('bi', `bi-${name}`);

  if (cls.trim()) {
    i.classList.add(...cls.trim().split(/\s+/));
  }

  if (style.trim()) {
    i.setAttribute('style', style);
  }

  logDebug('helpers', 'createIcon', `✅ <i> creado: bi-${name}`, 'info');
  return i;
}

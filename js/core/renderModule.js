// ./core/renderModule.js
// Renderiza un módulo dentro de #content según su definición individual

import { logDebug } from '../helpers/debugLogger.js';

/**
 * Renderiza un módulo visual directamente en el contenedor destino
 * @param {string} name - Nombre del módulo (ej: 'header')
 * @param {object} config - Configuración fusionada del módulo
 * @param {HTMLElement} targetEl - Elemento donde se insertará
 */
export async function renderModule(name, config, targetEl) {
  try {
    if (!targetEl) {
      logDebug('system', 'renderModule', `❌ Contenedor destino no recibido para "${name}"`, 'error');
      return;
    }

    const moduleFn = await config.registry[name]();
    if (typeof moduleFn !== 'function') {
      throw new Error(`El módulo "${name}" no exporta una función render válida.`);
    }

    // Se delega completamente la estructura al render.js del módulo
    await moduleFn(targetEl, config);

    logDebug('modules', name, `✅ Módulo "${name}" renderizado`);
  } catch (err) {
    logDebug('modules', name, `❌ Error al renderizar "${name}": ${err.message}`, 'error');
  }
}
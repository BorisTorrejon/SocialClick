// ./core/init.js
// Orquestador principal: aplica layout y renderiza secciones dinámicas

import { initLayout } from './initLayout.js';
import { initSections } from './initSections.js';
import { logDebug } from '../helpers/debugLogger.js';

/**
 * Inicializa la página aplicando layout y renderizando secciones
 * @param {object} themeData - Datos visuales base (desde theme.json)
 * @param {object} pageData - Datos de contenido del cliente (desde page.json)
 */
export function init(themeData, pageData) {
  logDebug('system', 'init', '🧱 Iniciando layout...');

  // 👉 Se envían body, main y content SIN fusionar
  // El merge ocurre dentro de initLayout
  initLayout({
    body: {
      theme: themeData?.body || {},
      page: pageData?.body || {}
    },
    main: {
      theme: themeData?.main || {},
      page: pageData?.main || {}
    },
    content: {
      theme: themeData?.content || {},
      page: pageData?.content || {}
    }
  });

  logDebug('system', 'init', '📦 Iniciando render de secciones...');

  // 👉 Secciones se renderizan sin merge
  // Cada render.js hace su propio merge individual
  initSections({
    sections: pageData.sections || [],
    content: pageData?.content || {},
    themeSections: themeData?.sections || {}
  });

  logDebug('system', 'init', '✅ Init completo');
}

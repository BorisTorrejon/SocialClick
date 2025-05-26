// ./core/initLayout.js
// Aplica clases y estilos fusionados a <body>, <main> y #content

import { logDebug } from '../helpers/debugLogger.js';
import { mergeFunctionalClasses } from '../helpers/mergeFunctionalClasses.js';
import { mergeInlineStyles } from '../helpers/mergeInlineStyles.js';

/**
 * Aplica layout visual al DOM fusionando theme y page
 * @param {object} config - Contiene body, main y content separados por theme y page
 */
export function initLayout(config) {
  // 👉 Función auxiliar para aplicar clases y estilos
  const applyMerged = (element, themeConf, pageConf, name) => {
    const mergedClass = mergeFunctionalClasses(themeConf.class, pageConf.class);
    if (mergedClass !== '') {
      element.className = mergedClass;
      logDebug('system', 'initLayout', `📌 ${name}: merged class = "${mergedClass}"`);
    }

    const mergedStyle = mergeInlineStyles(themeConf.style, pageConf.style);
    if (mergedStyle !== '') {
      element.setAttribute('style', mergedStyle);
      logDebug('system', 'initLayout', `🎨 ${name}: merged style = "${mergedStyle}"`);
    }
  };

  // 👉 Aplicar a <body>
  if (config.body) {
    applyMerged(document.body, config.body.theme || {}, config.body.page || {}, 'body');
  }

  // 👉 Aplicar a <main>
  const mainEl = document.querySelector('main');
  if (mainEl && config.main) {
    applyMerged(mainEl, config.main.theme || {}, config.main.page || {}, 'main');
  }

  // 👉 Aplicar a #content
  const contentEl = document.querySelector('#content');
  if (contentEl && config.content) {
    applyMerged(contentEl, config.content.theme || {}, config.content.page || {}, 'content');
  }

  logDebug('system', 'initLayout', '✅ Layout aplicado correctamente');
}
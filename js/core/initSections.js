// ./core/initSections.js
// Renderiza secciones dentro de #content, validando módulos habilitados y existentes

import { appConfig } from '../config/appConfig.js';
import { logDebug } from '../helpers/debugLogger.js';
import { modules as registry } from './modulesRegistry.js';
import { renderModule } from './renderModule.js';
import { mergeFunctionalClasses } from '../helpers/mergeFunctionalClasses.js';
import { mergeInlineStyles } from '../helpers/mergeInlineStyles.js';

/**
 * Renderiza las secciones de contenido dentro de #content
 * @param {object} config - Contiene sections[], content, themeSections
 */
export async function initSections(config) {
  const { sections = [], content, themeSections = {} } = config;
  const contentEl = document.querySelector('#content');

  if (!contentEl) {
    logDebug('system', 'initSections', '❌ No se encontró el contenedor #content', 'error');
    return;
  }

  // 👉 Aplicar clases y estilos fusionados a #content
  const mergedClass = mergeFunctionalClasses(contentEl.className, content?.class);
  if (mergedClass !== '') contentEl.className = mergedClass;

  if (content?.style) {
    const finalStyle = mergeInlineStyles(contentEl.getAttribute('style'), content.style);
    contentEl.setAttribute('style', finalStyle);
  }

  // Listas para log final
  const rendered = [];
  const disabled = [];
  const notFound = [];

  // 👉 Procesar cada sección
  for (const section of sections) {
    const name = section.name;

    // ⛔ Si está deshabilitado por config, registrar y saltear
    if (appConfig.modules?.[name] === false) {
      disabled.push(name);
      continue;
    }

    // ❌ Si no existe el módulo, registrar y saltear
    if (!registry[name]) {
      notFound.push(name);
      continue;
    }

    // ✅ Renderizar módulo con su page + theme config
    await renderModule(name, {
      page: section,
      theme: themeSections[name] || {},
      registry
    }, contentEl);

    rendered.push(name);
  }

  // 📦 Log agrupado final
  if (rendered.length) {
    logDebug('system', 'initSections', `📦 Módulos renderizados: ${rendered.join(', ')}`);
  }

  if (disabled.length) {
    logDebug('system', 'initSections', `⛔ Módulos deshabilitados: ${disabled.join(', ')}`);
  }

  if (notFound.length) {
    logDebug('system', 'initSections', `❌ Módulos no encontrados: ${notFound.join(', ')}`);
  }
}
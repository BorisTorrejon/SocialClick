// ./modules/footer/render.js
// Renderiza el footer con contenedor y contenido separados, soporte para onClick y herencia visual

import { logDebug } from '../../helpers/debugLogger.js';
import { mergeFunctionalClasses } from '../../helpers/mergeFunctionalClasses.js';
import { mergeInlineStyles } from '../../helpers/mergeInlineStyles.js';
import { handleOnClick } from '../../helpers/handleClick.js';

/**
 * Renderiza la sección footer
 * @param {HTMLElement} container - Nodo contenedor principal
 * @param {object} config - Contiene { page, theme }
 */
export async function render(container, config) {
  const { page = {}, theme = {} } = config;
  const themeSection = theme || {};
  const themeContent = themeSection.content || {};
  const content = page.content || {};

  // 🔹 Wrapper general del footer
  const wrapper = document.createElement('div');
  const wrapperClass = mergeFunctionalClasses(themeSection.content_class, page.content_class);
  const wrapperStyle = mergeInlineStyles(themeSection.content_style, page.content_style);
  if (wrapperClass) wrapper.className = wrapperClass;
  if (wrapperStyle) wrapper.setAttribute('style', wrapperStyle);

  // 🔹 Verificar si hay texto
  const finalText = content.text?.trim();
  if (!finalText) {
    logDebug('modules', 'footer', '⚠️ Footer ignorado: sin contenido');
    return;
  }

  // 🔹 Crear etiqueta de contenido (span, p, etc.)
  const tag = content.tag || themeContent.tag || 'span';
  const contentEl = document.createElement(tag);

  const contentClass = mergeFunctionalClasses(themeContent.class, content.class);
  const contentStyle = mergeInlineStyles(themeContent.style, content.style);
  if (contentClass) contentEl.className = contentClass;
  if (contentStyle) contentEl.setAttribute('style', contentStyle);

  const onClick = content.onClick?.trim();

  if (onClick) {
    const link = document.createElement('a');
    link.textContent = finalText;
    link.setAttribute('href', onClick);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    handleOnClick(link, onClick, 'footer');
    contentEl.appendChild(link);
  } else {
    contentEl.textContent = finalText;
  }

  wrapper.appendChild(contentEl);
  container.appendChild(wrapper);
  logDebug('modules', 'footer', '✅ Footer renderizado correctamente');
}